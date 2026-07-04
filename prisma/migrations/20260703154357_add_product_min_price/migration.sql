-- AlterTable
ALTER TABLE "Product" ADD COLUMN "minPrice" DECIMAL(65,30) NOT NULL DEFAULT 0;

UPDATE "Product" p
SET "minPrice" = COALESCE(
  (SELECT MIN(pv.price) FROM "ProductVariant" pv WHERE pv."productId" = p.id),
  0
);