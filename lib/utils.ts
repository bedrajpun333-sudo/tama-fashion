import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format price in NPR currency
 */
export function formatPrice(price: number | string): string {
  const numPrice = typeof price === 'string' ? parseFloat(price) : price;
  return new Intl.NumberFormat('en-NP', {
    style: 'currency',
    currency: 'NPR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(numPrice);
}

/**
 * Format date to readable format
 */
export function formatDate(date: Date | string, format: 'short' | 'long' = 'long'): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return new Intl.DateTimeFormat('en-NP', {
    year: 'numeric',
    month: format === 'short' ? '2-digit' : 'long',
    day: '2-digit',
  }).format(dateObj);
}

/**
 * Generate order number in format TAMA-YYYY-XXXXXX
 */
export function generateOrderNumber(sequence: number): string {
  const year = new Date().getFullYear();
  const paddedSequence = String(sequence).padStart(6, '0');
  return `TAMA-${year}-${paddedSequence}`;
}

/**
 * Calculate delivery charge based on zone and order amount
 */
export function calculateDeliveryCharge(
  zone: { deliveryCharge: number; freeDeliveryThreshold: number | null },
  orderAmount: number
): number {
  if (zone.freeDeliveryThreshold && orderAmount >= zone.freeDeliveryThreshold) {
    return 0;
  }
  return zone.deliveryCharge;
}

/**
 * Calculate discount amount
 */
export function calculateDiscount(
  discount: { type: 'PERCENTAGE' | 'FIXED_AMOUNT'; value: number },
  amount: number
): number {
  if (discount.type === 'PERCENTAGE') {
    return (amount * discount.value) / 100;
  }
  return discount.value;
}

/**
 * Validate Nepal phone number
 */
export function isValidNepalPhone(phone: string): boolean {
  const nepaliPhoneRegex = /^\+?977[0-9]{10}$|^[0-9]{10}$/;
  const cleanPhone = phone.replace(/\D/g, '');
  return nepaliPhoneRegex.test(cleanPhone) || nepaliPhoneRegex.test('+977' + cleanPhone);
}

/**
 * Format Nepal phone number
 */
export function formatNepalPhone(phone: string): string {
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.startsWith('977')) {
    return `+${cleaned}`;
  }
  if (cleaned.length === 10) {
    return `+977${cleaned}`;
  }
  return phone;
}

/**
 * Validate email
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Get initials from name
 */
export function getInitials(name: string): string {
  return name
    .split(' ')
    .map(part => part[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

/**
 * Truncate text
 */
export function truncate(text: string, length: number): string {
  if (text.length <= length) return text;
  return text.slice(0, length) + '...';
}

/**
 * Calculate reading time
 */
export function calculateReadingTime(text: string): number {
  const wordsPerMinute = 200;
  const words = text.split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
}

/**
 * Delay function for async operations
 */
export function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}
