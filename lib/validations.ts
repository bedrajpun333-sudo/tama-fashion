import { z } from 'zod';

/**
 * Validation schemas for forms and API requests
 */

export const phoneRegex = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;

// Auth schemas
export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export const registerSchema = z
  .object({
    email: z.string().email('Invalid email address'),
    name: z.string().min(2, 'Name must be at least 2 characters'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
    confirmPassword: z.string(),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export const forgotPasswordSchema = z.object({
  email: z.string().email('Invalid email address'),
});

export const resetPasswordSchema = z
  .object({
    password: z.string().min(8, 'Password must be at least 8 characters'),
    confirmPassword: z.string(),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

// Address schemas
export const addressSchema = z.object({
  fullName: z.string().min(2, 'Full name is required'),
  phone: z.string().refine(
    value => /^[0-9]{10}$|^\+?977[0-9]{10}$/.test(value.replace(/\D/g, '')),
    'Invalid Nepal phone number'
  ),
  email: z.string().email('Invalid email').optional(),
  province: z.string().min(1, 'Province is required'),
  district: z.string().min(1, 'District is required'),
  municipality: z.string().min(1, 'Municipality is required'),
  area: z.string().optional(),
  detailedAddress: z.string().min(5, 'Detailed address is required'),
  isDefault: z.boolean().default(false),
});

// Product schemas
export const productSchema = z.object({
  name: z.string().min(3, 'Product name must be at least 3 characters'),
  description: z.string().optional(),
  shortDescription: z.string().optional(),
  basePrice: z.coerce.number().positive('Price must be positive'),
  compareAtPrice: z.coerce.number().positive().optional(),
  categoryId: z.string().min(1, 'Category is required'),
  brand: z.string().optional(),
  isFeatured: z.boolean().default(false),
  status: z.enum(['ACTIVE', 'INACTIVE', 'ARCHIVED', 'DISCONTINUED']).default('ACTIVE'),
});

// Cart schemas
export const addToCartSchema = z.object({
  variantId: z.string().min(1, 'Variant is required'),
  quantity: z.coerce.number().int().positive('Quantity must be at least 1'),
});

export const updateCartItemSchema = z.object({
  quantity: z.coerce.number().int().min(1, 'Quantity must be at least 1'),
});

// Checkout schemas
export const checkoutSchema = z.object({
  fullName: z.string().min(2, 'Full name is required'),
  phone: z.string().refine(
    value => /^[0-9]{10}$|^\+?977[0-9]{10}$/.test(value.replace(/\D/g, '')),
    'Invalid Nepal phone number'
  ),
  email: z.string().email('Invalid email'),
  province: z.string().min(1, 'Province is required'),
  district: z.string().min(1, 'District is required'),
  municipality: z.string().min(1, 'Municipality is required'),
  area: z.string().optional(),
  detailedAddress: z.string().min(5, 'Detailed address is required'),
  paymentMethod: z.enum(['CASH_ON_DELIVERY', 'ESEWA', 'KHALTI', 'IME_PAY', 'FONEPAY']),
  discountCode: z.string().optional(),
  customerNotes: z.string().optional(),
});

// Review schema
export const reviewSchema = z.object({
  rating: z.number().int().min(1, 'Rating must be between 1 and 5').max(5),
  title: z.string().min(3, 'Title is required').optional(),
  comment: z.string().min(10, 'Comment must be at least 10 characters').optional(),
});

// Discount schema
export const discountSchema = z.object({
  code: z.string().min(3, 'Code is required'),
  type: z.enum(['PERCENTAGE', 'FIXED_AMOUNT']),
  value: z.coerce.number().positive('Value must be positive'),
  minOrderAmount: z.coerce.number().default(0),
  validFrom: z.coerce.date(),
  validUntil: z.coerce.date(),
  usageLimit: z.coerce.number().optional(),
});

// Profile update schema
export const profileUpdateSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').optional(),
  phone: z.string().optional(),
  dateOfBirth: z.coerce.date().optional(),
  gender: z.enum(['male', 'female', 'other']).optional(),
});

// Type exports
export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
export type AddressInput = z.infer<typeof addressSchema>;
export type ProductInput = z.infer<typeof productSchema>;
export type AddToCartInput = z.infer<typeof addToCartSchema>;
export type CheckoutInput = z.infer<typeof checkoutSchema>;
export type ReviewInput = z.infer<typeof reviewSchema>;
export type DiscountInput = z.infer<typeof discountSchema>;
export type ProfileUpdateInput = z.infer<typeof profileUpdateSchema>;
