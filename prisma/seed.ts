import { PrismaClient } from '../src/generated/prisma/client';

import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('Starting database seeding...');

  console.log('Clearing old data...');
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.review.deleteMany();
  await prisma.favorite.deleteMany();
  await prisma.address.deleteMany();
  await prisma.productVariant.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
  await prisma.brand.deleteMany();
  await prisma.user.deleteMany();

  console.log('Seeding users...');
  const admin = await prisma.user.create({
    data: {
      email: 'admin@cyberstore.com',
      password: 'secure_admin_password_hash', // Use bcrypt or argon2 in production
      name: 'Alex Admin',
      role: 'ADMIN',
    },
  });

  const customer1 = await prisma.user.create({
    data: {
      email: 'customer.john@gmail.com',
      password: 'secure_customer_password_hash',
      name: 'John Doe',
      role: 'CUSTOMER',
      avatar:
        'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150',
      addresses: {
        create: [
          {
            title: 'Home',
            recipientName: 'John Doe',
            phone: '+380501234567',
            city: 'Kyiv',
            deliveryBranch: 'Nova Post Department #25 (Khreshchatyk St)',
            isDefault: true,
          },
          {
            title: 'Office',
            recipientName: 'John Doe',
            phone: '+380501234567',
            city: 'Kyiv',
            street: '10 Tarasa Shevchenka Blvd, Apt 4',
          },
        ],
      },
    },
  });

  console.log('Seeding brands...');
  const apple = await prisma.brand.create({ data: { name: 'Apple' } });
  const samsung = await prisma.brand.create({ data: { name: 'Samsung' } });
  const sony = await prisma.brand.create({ data: { name: 'Sony' } });
  const asus = await prisma.brand.create({ data: { name: 'ASUS' } });

  console.log('Seeding categories...');
  const electronics = await prisma.category.create({
    data: { name: 'Electronics' },
  });

  const phones = await prisma.category.create({
    data: { name: 'Smartphones', parentId: electronics.id },
  });
  const computers = await prisma.category.create({
    data: { name: 'Computers & Laptops', parentId: electronics.id },
  });
  const watches = await prisma.category.create({
    data: { name: 'Smart Watches', parentId: electronics.id },
  });
  const audio = await prisma.category.create({
    data: { name: 'Headphones', parentId: electronics.id },
  });
  const cameras = await prisma.category.create({
    data: { name: 'Cameras', parentId: electronics.id },
  });

  console.log('Seeding products and variants...');

  const iphone = await prisma.product.create({
    data: {
      name: 'Apple iPhone 14 Pro Max',
      description:
        'The definitive premium smartphone experience with a 48MP camera, Dynamic Island, and the powerful A16 Bionic processor.',
      categoryId: phones.id,
      brandId: apple.id,
      baseSpecs: {
        screenDiagonal: '6.7 inches',
        screenType: 'Super Retina XDR OLED',
        protectionClass: 'IP68',
        processor: 'A16 Bionic',
      },
      variants: {
        create: [
          {
            sku: 'APP-IP14PM-PUR-256',
            price: 43999.0,
            stock: 14,
            attributes: { color: 'Deep Purple', storage: '256GB' },
            images: [
              'https://images.unsplash.com/photo-1678685888221-cda773a3dcdb?w=500',
            ],
            allowedShipping: [
              'NOVA_POST',
              'NOVA_POST_POSTOMAT',
              'NOVA_POST_COURIER',
              'MEEST',
              'STORE_PICKUP',
            ],
          },
          {
            sku: 'APP-IP14PM-BLK-1TB',
            price: 58999.0,
            stock: 3,
            attributes: { color: 'Space Black', storage: '1TB' },
            images: [
              'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=500',
            ],
            allowedShipping: [
              'NOVA_POST',
              'NOVA_POST_POSTOMAT',
              'NOVA_POST_COURIER',
              'STORE_PICKUP',
            ],
          },
        ],
      },
    },
  });

  const laptop = await prisma.product.create({
    data: {
      name: 'ASUS ROG Zephyrus G14',
      description:
        'Powerful and portable high-performance gaming laptop with AMD Ryzen 9 and NVIDIA RTX 4060 graphics.',
      categoryId: computers.id,
      brandId: asus.id,
      baseSpecs: {
        screenDiagonal: '14.0 inches',
        screenType: 'ROG Nebula Display QHD+ 165Hz',
        batteryCapacity: '76WHrs',
        ramType: 'DDR5 32GB',
      },
      variants: {
        create: [
          {
            sku: 'ASU-ZEPH-G14-01',
            price: 69999.0,
            stock: 5,
            attributes: { color: 'Eclipse Gray', ssd: '1TB' },
            images: [
              'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=500',
            ],
            allowedShipping: [
              'NOVA_POST',
              'NOVA_POST_COURIER',
              'MEEST',
              'STORE_PICKUP',
            ],
          },
        ],
      },
    },
  });

  const headphones = await prisma.product.create({
    data: {
      name: 'Sony WH-1000XM5',
      description:
        'Industry-leading noise-canceling wireless over-ear headphones with exceptional audio purity.',
      categoryId: audio.id,
      brandId: sony.id,
      baseSpecs: {
        connectionType: 'Wireless / Bluetooth 5.2',
        batteryLife: 'Up to 30 hours',
        chargingPort: 'USB Type-C',
      },
      variants: {
        create: [
          {
            sku: 'SNY-WH1000XM5-B',
            price: 15499.0,
            stock: 22,
            attributes: { color: 'Black' },
            images: [
              'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500',
            ],
            allowedShipping: [
              'NOVA_POST',
              'NOVA_POST_POSTOMAT',
              'NOVA_POST_COURIER',
              'MEEST',
              'UKRPOSHTA',
              'STORE_PICKUP',
            ],
          },
          {
            sku: 'SNY-WH1000XM5-S',
            price: 15499.0,
            stock: 8,
            attributes: { color: 'Silver' },
            images: [
              'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=500',
            ],
            allowedShipping: [
              'NOVA_POST',
              'NOVA_POST_POSTOMAT',
              'NOVA_POST_COURIER',
              'MEEST',
              'UKRPOSHTA',
              'STORE_PICKUP',
            ],
          },
        ],
      },
    },
  });

  console.log('Seeding reviews...');

  await prisma.review.create({
    data: {
      rating: 5,
      comment:
        'Incredible screen and battery life! The Dynamic Island turned out to be much more useful than I initially expected.',
      userId: customer1.id,
      productId: iphone.id,
    },
  });

  await prisma.product.update({
    where: { id: iphone.id },
    data: {
      averageRating: 5.0,
      reviewCount: 1,
    },
  });

  console.log('Seeding sample checkout records...');

  const targetVariant = await prisma.productVariant.findUnique({
    where: { sku: 'SNY-WH1000XM5-B' },
  });

  if (targetVariant) {
    await prisma.order.create({
      data: {
        totalAmount: 15499.0,
        status: 'DELIVERED',
        userId: customer1.id,
        shippingMethod: 'NOVA_POST',
        paymentMethod: 'CREDIT_CARD',
        transactionId: 'ch_stripe_mock_12345abcdef',
        shippingDetails: {
          recipientName: 'John Doe',
          phone: '+380501234567',
          city: 'Kyiv',
          deliveryType: 'BRANCH',
          carrier: 'NOVA_POST',
          pointDescription: 'Department #25, Khreshchatyk St',
        },
        items: {
          create: [
            {
              quantity: 1,
              priceAtPurchase: 15499.0,
              productVariantId: targetVariant.id,
            },
          ],
        },
      },
    });
  }

  console.log('Seeding process completely finished!');
}

main()
  .catch((e) => {
    console.error('Error executing the database seed script:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
