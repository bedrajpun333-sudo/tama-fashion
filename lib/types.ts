// Type definitions for the application

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  shortDescription: string | null;
  basePrice: number;
  compareAtPrice: number | null;
  categoryId: string;
  brand: string | null;
  status: 'ACTIVE' | 'INACTIVE' | 'ARCHIVED' | 'DISCONTINUED';
  isFeatured: boolean;
  isNew: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProductVariant {
  id: string;
  productId: string;
  sizeId: string;
  colorId: string;
  sku: string;
  priceAdjustment: number;
  stockQuantity: number;
  reservedQuantity: number;
  imageUrl: string | null;
}

export interface CartItem {
  id: string;
  userId: string;
  productId: string;
  variantId: string;
  quantity: number;
  priceAtTime: number;
  product?: Product;
  variant?: ProductVariant;
}

export interface Order {
  id: string;
  orderNumber: string;
  userId: string;
  status: OrderStatus;
  totalAmount: number;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  createdAt: Date;
}

export type OrderStatus =
  | 'PENDING'
  | 'CONFIRMED'
  | 'PROCESSING'
  | 'PACKED'
  | 'SHIPPED'
  | 'DELIVERED'
  | 'CANCELLED'
  | 'RETURNED';

export type PaymentMethod =
  | 'CASH_ON_DELIVERY'
  | 'ESEWA'
  | 'KHALTI'
  | 'IME_PAY'
  | 'FONEPAY';

export type PaymentStatus =
  | 'PENDING'
  | 'COMPLETED'
  | 'FAILED'
  | 'CANCELLED'
  | 'REFUNDED';

export interface User {
  id: string;
  email: string;
  name: string | null;
  phone: string | null;
  role: 'CUSTOMER' | 'ADMIN' | 'VENDOR';
  emailVerified: Date | null;
}

export interface Address {
  id: string;
  userId: string;
  fullName: string;
  phone: string;
  province: string;
  district: string;
  municipality: string;
  area: string | null;
  detailedAddress: string;
  isDefault: boolean;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  imageUrl: string | null;
  sortOrder: number;
  isActive: boolean;
}

export interface Discount {
  id: string;
  code: string;
  type: 'PERCENTAGE' | 'FIXED_AMOUNT';
  value: number;
  minOrderAmount: number;
  validFrom: Date;
  validUntil: Date;
  isActive: boolean;
  usageCount: number;
  usageLimit: number | null;
}
