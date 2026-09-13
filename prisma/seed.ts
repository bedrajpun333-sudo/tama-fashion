import { PrismaClient } from '@prisma/client';
import { hash } from 'bcryptjs';
import slugify from 'slugify';

const prisma = new PrismaClient();

async function main() {
  // Clear existing data
  console.log('🗑️  Clearing existing data...');
  await prisma.cartItem.deleteMany();
  await prisma.wishlistItem.deleteMany();
  await prisma.orderItem.deleteMany();
  await prisma.orderStatusHistory.deleteMany();
  await prisma.order.deleteMany();
  await prisma.review.deleteMany();
  await prisma.productVariant.deleteMany();
  await prisma.productImage.deleteMany();
  await prisma.product.deleteMany();
  await prisma.address.deleteMany();
  await prisma.user.deleteMany();
  await prisma.category.deleteMany();
  await prisma.size.deleteMany();
  await prisma.color.deleteMany();
  await prisma.discount.deleteMany();
  await prisma.deliveryZone.deleteMany();
  await prisma.homepageContent.deleteMany();
  await prisma.storeSetting.deleteMany();

  console.log('📚 Seeding database...');

  // Create sizes
  console.log('📏 Creating sizes...');
  const sizes = await Promise.all([
    prisma.size.create({ data: { name: 'XS', label: 'Extra Small', sortOrder: 1 } }),
    prisma.size.create({ data: { name: 'S', label: 'Small', sortOrder: 2 } }),
    prisma.size.create({ data: { name: 'M', label: 'Medium', sortOrder: 3 } }),
    prisma.size.create({ data: { name: 'L', label: 'Large', sortOrder: 4 } }),
    prisma.size.create({ data: { name: 'XL', label: 'Extra Large', sortOrder: 5 } }),
    prisma.size.create({ data: { name: 'XXL', label: 'Extra Extra Large', sortOrder: 6 } }),
  ]);

  // Create colors
  console.log('🎨 Creating colors...');
  const colors = await Promise.all([
    prisma.color.create({ data: { name: 'Black', hex: '#000000', sortOrder: 1 } }),
    prisma.color.create({ data: { name: 'White', hex: '#FFFFFF', sortOrder: 2 } }),
    prisma.color.create({ data: { name: 'Navy', hex: '#001F3F', sortOrder: 3 } }),
    prisma.color.create({ data: { name: 'Gray', hex: '#808080', sortOrder: 4 } }),
    prisma.color.create({ data: { name: 'Red', hex: '#FF4136', sortOrder: 5 } }),
    prisma.color.create({ data: { name: 'Blue', hex: '#0074D9', sortOrder: 6 } }),
    prisma.color.create({ data: { name: 'Green', hex: '#2ECC40', sortOrder: 7 } }),
    prisma.color.create({ data: { name: 'Brown', hex: '#8B4513', sortOrder: 8 } }),
  ]);

  // Create categories
  console.log('📂 Creating categories...');
  const categories = await Promise.all([
    prisma.category.create({
      data: {
        name: 'New Arrivals',
        slug: 'new-arrivals',
        description: 'Latest additions to our collection',
        imageUrl: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=400&h=400&fit=crop',
        sortOrder: 1,
      },
    }),
    prisma.category.create({
      data: {
        name: 'Men',
        slug: 'men',
        description: 'Fashionable clothing for men',
        imageUrl: 'https://images.unsplash.com/photo-1552062407-c33ff11dbf38?w=400&h=400&fit=crop',
        sortOrder: 2,
      },
    }),
    prisma.category.create({
      data: {
        name: 'Women',
        slug: 'women',
        description: 'Stylish clothing for women',
        imageUrl: 'https://images.unsplash.com/photo-1595777712802-dccb774a0da3?w=400&h=400&fit=crop',
        sortOrder: 3,
      },
    }),
    prisma.category.create({
      data: {
        name: 'Jackets',
        slug: 'jackets',
        description: 'Trendy jackets and outerwear',
        imageUrl: 'https://images.unsplash.com/photo-1551028719-00167b16ebc5?w=400&h=400&fit=crop',
        sortOrder: 4,
      },
    }),
    prisma.category.create({
      data: {
        name: 'Shirts',
        slug: 'shirts',
        description: 'Premium shirts for all occasions',
        imageUrl: 'https://images.unsplash.com/photo-1591047990979-ef9e12d07120?w=400&h=400&fit=crop',
        sortOrder: 5,
      },
    }),
    prisma.category.create({
      data: {
        name: 'T-Shirts',
        slug: 't-shirts',
        description: 'Comfortable t-shirts',
        imageUrl: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop',
        sortOrder: 6,
      },
    }),
    prisma.category.create({
      data: {
        name: 'Hoodies',
        slug: 'hoodies',
        description: 'Cozy hoodies and sweatshirts',
        imageUrl: 'https://images.unsplash.com/photo-1556821552-5f6af9c0c5b5?w=400&h=400&fit=crop',
        sortOrder: 7,
      },
    }),
    prisma.category.create({
      data: {
        name: 'Pants',
        slug: 'pants',
        description: 'Quality pants and trousers',
        imageUrl: 'https://images.unsplash.com/photo-1542272604-787c62d465d1?w=400&h=400&fit=crop',
        sortOrder: 8,
      },
    }),
  ]);

  // Create products
  console.log('👕 Creating products...');
  const menCategory = categories.find(c => c.slug === 'men')!;
  const jacketsCategory = categories.find(c => c.slug === 'jackets')!;
  const tshirtsCategory = categories.find(c => c.slug === 't-shirts')!;

  const product1 = await prisma.product.create({
    data: {
      name: 'Premium Black Puffer Jacket',
      slug: 'premium-black-puffer-jacket',
      description: 'Stay warm with our premium black puffer jacket. Made with high-quality materials and perfect for Nepali winters.',
      shortDescription: 'Warm and stylish puffer jacket',
      basePrice: new Decimal(3999),
      compareAtPrice: new Decimal(4999),
      categoryId: jacketsCategory.id,
      brand: 'TAMA',
      metaTitle: 'Premium Black Puffer Jacket | TAMA Fashion Wear',
      metaDescription: 'Buy premium black puffer jacket online at TAMA Fashion Wear. Warm, stylish, and affordable.',
      isFeatured: true,
      isNew: true,
      images: {
        create: [
          {
            imageUrl: 'https://images.unsplash.com/photo-1551028719-00167b16ebc5?w=800&h=800&fit=crop',
            altText: 'Premium Black Puffer Jacket',
            sortOrder: 1,
          },
          {
            imageUrl: 'https://images.unsplash.com/photo-1539533057629-0f6734fdd60e?w=800&h=800&fit=crop',
            altText: 'Premium Black Puffer Jacket Side View',
            sortOrder: 2,
          },
        ],
      },
    },
  });

  const product2 = await prisma.product.create({
    data: {
      name: 'Classic White Cotton T-Shirt',
      slug: 'classic-white-cotton-tshirt',
      description: 'Essential white cotton t-shirt that goes with everything. Perfect for casual wear and layering.',
      shortDescription: 'Versatile white t-shirt',
      basePrice: new Decimal(499),
      categoryId: tshirtsCategory.id,
      brand: 'TAMA',
      metaTitle: 'Classic White Cotton T-Shirt | TAMA Fashion Wear',
      metaDescription: 'Get the perfect white t-shirt from TAMA Fashion Wear. Comfortable, affordable, and high-quality.',
      isFeatured: true,
      isNew: true,
      images: {
        create: [
          {
            imageUrl: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&h=800&fit=crop',
            altText: 'Classic White T-Shirt',
            sortOrder: 1,
          },
        ],
      },
    },
  });

  const product3 = await prisma.product.create({
    data: {
      name: 'Navy Blue Formal Shirt',
      slug: 'navy-blue-formal-shirt',
      description: 'Professional navy blue formal shirt suitable for office and formal occasions.',
      shortDescription: 'Formal navy shirt',
      basePrice: new Decimal(1299),
      categoryId: menCategory.id,
      brand: 'TAMA',
      metaTitle: 'Navy Blue Formal Shirt | TAMA Fashion Wear',
      metaDescription: 'Professional navy formal shirt for men. Premium quality at affordable prices.',
      isFeatured: true,
      images: {
        create: [
          {
            imageUrl: 'https://images.unsplash.com/photo-1591047990979-ef9e12d07120?w=800&h=800&fit=crop',
            altText: 'Navy Formal Shirt',
            sortOrder: 1,
          },
        ],
      },
    },
  });

  // Create variants for product 1 (Black Puffer Jacket)
  console.log('🔧 Creating product variants...');
  const blackColor = colors.find(c => c.name === 'Black')!;
  const sizeM = sizes.find(s => s.name === 'M')!;
  const sizeL = sizes.find(s => s.name === 'L')!;
  const sizeXL = sizes.find(s => s.name === 'XL')!;

  await prisma.productVariant.create({
    data: {
      productId: product1.id,
      sizeId: sizeM.id,
      colorId: blackColor.id,
      sku: 'BPJ-BLK-M-001',
      priceAdjustment: new Decimal(0),
      stockQuantity: 25,
    },
  });

  await prisma.productVariant.create({
    data: {
      productId: product1.id,
      sizeId: sizeL.id,
      colorId: blackColor.id,
      sku: 'BPJ-BLK-L-001',
      priceAdjustment: new Decimal(0),
      stockQuantity: 30,
    },
  });

  await prisma.productVariant.create({
    data: {
      productId: product1.id,
      sizeId: sizeXL.id,
      colorId: blackColor.id,
      sku: 'BPJ-BLK-XL-001',
      priceAdjustment: new Decimal(200),
      stockQuantity: 20,
    },
  });

  // Create variants for product 2 (White T-Shirt)
  const whiteColor = colors.find(c => c.name === 'White')!;
  const sizeS = sizes.find(s => s.name === 'S')!;

  await prisma.productVariant.create({
    data: {
      productId: product2.id,
      sizeId: sizeS.id,
      colorId: whiteColor.id,
      sku: 'WT-WHI-S-001',
      priceAdjustment: new Decimal(0),
      stockQuantity: 50,
    },
  });

  await prisma.productVariant.create({
    data: {
      productId: product2.id,
      sizeId: sizeM.id,
      colorId: whiteColor.id,
      sku: 'WT-WHI-M-001',
      priceAdjustment: new Decimal(0),
      stockQuantity: 60,
    },
  });

  // Create variants for product 3 (Navy Formal Shirt)
  const navyColor = colors.find(c => c.name === 'Navy')!;

  await prisma.productVariant.create({
    data: {
      productId: product3.id,
      sizeId: sizeM.id,
      colorId: navyColor.id,
      sku: 'NFS-NAV-M-001',
      priceAdjustment: new Decimal(0),
      stockQuantity: 35,
    },
  });

  await prisma.productVariant.create({
    data: {
      productId: product3.id,
      sizeId: sizeL.id,
      colorId: navyColor.id,
      sku: 'NFS-NAV-L-001',
      priceAdjustment: new Decimal(0),
      stockQuantity: 40,
    },
  });

  // Create delivery zones
  console.log('🚚 Creating delivery zones...');
  await prisma.deliveryZone.create({
    data: {
      name: 'Kathmandu Valley',
      slug: 'kathmandu-valley',
      description: 'Kathmandu, Bhaktapur, Lalitpur',
      deliveryCharge: new Decimal(100),
      freeDeliveryThreshold: new Decimal(3000),
      estimatedDays: 1,
    },
  });

  await prisma.deliveryZone.create({
    data: {
      name: 'Outside Kathmandu',
      slug: 'outside-kathmandu',
      description: 'All locations outside Kathmandu Valley',
      deliveryCharge: new Decimal(300),
      freeDeliveryThreshold: new Decimal(5000),
      estimatedDays: 3,
    },
  });

  // Create discounts
  console.log('🎉 Creating discounts...');
  const now = new Date();
  const futureDate = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000); // 30 days from now

  await prisma.discount.create({
    data: {
      code: 'WELCOME10',
      description: '10% off for new customers',
      type: 'PERCENTAGE',
      value: new Decimal(10),
      minOrderAmount: new Decimal(500),
      validFrom: now,
      validUntil: futureDate,
      usageLimit: 100,
      perUserLimit: 1,
    },
  });

  await prisma.discount.create({
    data: {
      code: 'FLAT500',
      description: 'Flat 500 NPR off on orders above 3000',
      type: 'FIXED_AMOUNT',
      value: new Decimal(500),
      minOrderAmount: new Decimal(3000),
      validFrom: now,
      validUntil: futureDate,
      usageLimit: 200,
    },
  });

  // Create store settings
  console.log('⚙️  Creating store settings...');
  await prisma.storeSetting.create({ data: { key: 'store_name', value: 'TAMA FASHION WEAR' } });
  await prisma.storeSetting.create({ data: { key: 'store_email', value: 'info@tamafashion.com' } });
  await prisma.storeSetting.create({ data: { key: 'store_phone', value: '+977-1-4123456' } });
  await prisma.storeSetting.create({ data: { key: 'store_address', value: 'Thamel, Kathmandu, Nepal' } });
  await prisma.storeSetting.create({ data: { key: 'tax_rate', value: '13', valueType: 'number' } });

  // Create admin user
  console.log('👤 Creating admin user...');
  const adminPassword = await hash('admin@123', 10);
  await prisma.user.create({
    data: {
      email: 'admin@tamafashion.com',
      name: 'Admin',
      password: adminPassword,
      role: 'ADMIN',
      emailVerified: new Date(),
    },
  });

  // Create sample customer
  console.log('👤 Creating sample customer...');
  const customerPassword = await hash('customer@123', 10);
  await prisma.user.create({
    data: {
      email: 'customer@example.com',
      name: 'John Doe',
      phone: '9841234567',
      password: customerPassword,
      role: 'CUSTOMER',
      emailVerified: new Date(),
      addresses: {
        create: {
          fullName: 'John Doe',
          phone: '9841234567',
          email: 'john@example.com',
          province: 'Bagmati',
          district: 'Kathmandu',
          municipality: 'Kathmandu Metropolitan City',
          area: 'Thamel',
          detailedAddress: 'Opposite Fire Station, Thamel',
          isDefault: true,
        },
      },
    },
  });

  console.log('✅ Database seeding completed successfully!');
}

main()
  .catch(e => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

// Helper type import
import { Decimal } from '@prisma/client/runtime/library';
