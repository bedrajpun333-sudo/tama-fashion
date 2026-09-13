import { Decimal } from '@prisma/client/runtime/library';

/**
 * Calculate cart totals
 */
export function calculateCartTotals(
  items: Array<{ quantity: number; priceAtTime: number | Decimal }>,
  deliveryCharge: number = 0,
  discountAmount: number = 0
) {
  const subtotal = items.reduce((sum, item) => {
    const price = typeof item.priceAtTime === 'string'
      ? parseFloat(item.priceAtTime)
      : item.priceAtTime instanceof Decimal
      ? item.priceAtTime.toNumber()
      : item.priceAtTime;
    return sum + price * item.quantity;
  }, 0);

  const taxRate = 0.13; // 13% VAT in Nepal
  const taxAmount = subtotal * taxRate;
  const total = subtotal + taxAmount + deliveryCharge - discountAmount;

  return {
    subtotal,
    taxAmount,
    deliveryCharge,
    discountAmount,
    total,
  };
}

/**
 * Verify discount validity
 */
export function isDiscountValid(discount: {
  validFrom: Date;
  validUntil: Date;
  isActive: boolean;
  usageCount: number;
  usageLimit: number | null;
}) {
  const now = new Date();
  const isNotExpired = discount.validFrom <= now && now <= discount.validUntil;
  const isNotMaxedOut = !discount.usageLimit || discount.usageCount < discount.usageLimit;
  return discount.isActive && isNotExpired && isNotMaxedOut;
}

/**
 * Check inventory availability
 */
export function hasInventory(variant: { stockQuantity: number; reservedQuantity: number }, quantity: number) {
  return variant.stockQuantity - variant.reservedQuantity >= quantity;
}

/**
 * Generate unique SKU
 */
export function generateSKU(productId: string, sizeId: string, colorId: string) {
  const timestamp = Date.now().toString(36).toUpperCase();
  return `${productId.slice(0, 3)}-${sizeId.slice(0, 3)}-${colorId.slice(0, 3)}-${timestamp}`;
}
