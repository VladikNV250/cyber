/*
  Warnings:

  - Added the required column `customerEmail` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `customerName` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `customerPhone` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_userId_fkey";

-- AlterTable: add columns as nullable first
ALTER TABLE "Order" ADD COLUMN "customerEmail" TEXT,
ADD COLUMN "customerName" TEXT,
ADD COLUMN "customerPhone" TEXT,
ALTER COLUMN "userId" DROP NOT NULL;

-- Backfill data for existing orders from User and shippingDetails using verified historical data
UPDATE "Order" o
SET "customerEmail" = COALESCE(u."email", o."shippingDetails"->>'email'),
    "customerName" = COALESCE(u."name", o."shippingDetails"->>'recipientName'),
    "customerPhone" = o."shippingDetails"->>'phone'
FROM "User" u
WHERE o."userId" = u."id";

-- Remediation: Delete orders lacking reliable required customer information before enforcing NOT NULL
DELETE FROM "OrderItem"
WHERE "orderId" IN (
    SELECT "id" FROM "Order"
    WHERE "customerEmail" IS NULL OR "customerName" IS NULL OR "customerPhone" IS NULL
);

DELETE FROM "Order"
WHERE "customerEmail" IS NULL OR "customerName" IS NULL OR "customerPhone" IS NULL;

-- Enforce NOT NULL constraints
ALTER TABLE "Order" ALTER COLUMN "customerEmail" SET NOT NULL,
ALTER COLUMN "customerName" SET NOT NULL,
ALTER COLUMN "customerPhone" SET NOT NULL;

-- CreateIndex
CREATE INDEX "Order_customerEmail_idx" ON "Order"("customerEmail");

-- CreateIndex
CREATE INDEX "Order_customerPhone_idx" ON "Order"("customerPhone");

-- CreateIndex
CREATE INDEX "Order_userId_idx" ON "Order"("userId");

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
