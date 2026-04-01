import type { Product } from "@/shared/types";
import { formatKr, formatStarRating } from "@/shared/format";
import {
  productEffectiveUnitPrice,
  productHasDiscount,
} from "@/shared/productPricing";

type Variant = "card" | "detail";

const priceClass: Record<Variant, string> = {
  card: "text-lg font-bold text-[var(--accent)]",
  detail: "text-2xl font-bold text-[var(--accent)]",
};

const listClass: Record<Variant, string> = {
  card: "text-sm text-[var(--text-muted)] line-through",
  detail: "text-lg text-[var(--text-muted)] line-through",
};

const ratingClass: Record<Variant, string> = {
  card: "text-sm text-[var(--text-muted)]",
  detail: "text-[var(--text-muted)]",
};

export default function ProductPriceRow({
  product,
  variant,
  className = "",
}: {
  product: Product;
  variant: Variant;
  className?: string;
}) {
  const unitPrice = productEffectiveUnitPrice(product);
  const hasDiscount = productHasDiscount(product);

  return (
    <div className={`flex flex-wrap items-center gap-2 ${className}`}>
      <span className={priceClass[variant]}>{formatKr(unitPrice)}</span>
      {hasDiscount && (
        <span className={listClass[variant]}>{formatKr(product.price)}</span>
      )}
      {product.rating != null && (
        <span className={ratingClass[variant]}>
          {formatStarRating(product.rating)}
        </span>
      )}
    </div>
  );
}
