import type { Product } from "@/app/components/shared/types";
import { formatKr, formatStarRating } from "@/app/components/shared/format";
import {
  productEffectiveUnitPrice,
  productHasDiscount,
} from "@/app/components/shared/productPricing";

type Variant = "card" | "detail";

const priceClass: Record<Variant, string> = {
  card: "text-lg font-bold text-(--accent)",
  detail: "text-2xl font-bold text-(--accent)",
};

const listClass: Record<Variant, string> = {
  card: "text-sm text-(--text-muted) line-through",
  detail: "text-lg text-(--text-muted) line-through",
};

const ratingClass: Record<Variant, string> = {
  card: "text-sm text-(--text-muted)",
  detail: "text-(--text-muted)",
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

  const prices = (
    <>
      <span className={priceClass[variant]}>{formatKr(unitPrice)}</span>
      {hasDiscount && (
        <span className={listClass[variant]}>{formatKr(product.price)}</span>
      )}
    </>
  );

  const rating =
    product.rating != null ? (
      <span className={ratingClass[variant]}>Buyer rating: 
        {formatStarRating(product.rating)}
      </span>
    ) : null;

  if (variant === "detail") {
    return (
      <div className={`flex flex-col items-start gap-1 ${className}`}>
        <div className="flex flex-wrap items-center gap-2">{prices}</div>
        {rating}
      </div>
    );
  }

  return (
    <div className={`flex flex-wrap items-center gap-2 ${className}`}>
      {prices}
      {rating}
    </div>
  );
}
