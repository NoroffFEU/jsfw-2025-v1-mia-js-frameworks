import type { Product } from "./types";

/**
 * Shows is there are discount
 */
function activeDiscountedUnitPrice(product: Product): number | undefined {
  const d = product.discountedPrice;
  if (d == null || d >= product.price) return undefined;
  return d;
}

export function productHasDiscount(product: Product): boolean {
  return activeDiscountedUnitPrice(product) !== undefined;
}

export function productEffectiveUnitPrice(product: Product): number {
  return activeDiscountedUnitPrice(product) ?? product.price;
}

/** Number of percentage off the price */
export function productDiscountPercent(product: Product): number | null {
  const sale = activeDiscountedUnitPrice(product);
  if (sale === undefined || product.price <= 0) return null;
  return Math.round((1 - sale / product.price) * 100);
}
