import type { Product } from "@/shared/types";
import Image from "next/image";

interface ProductCardProps {
  product: Product;
  featured?: boolean;
}

export default function ProductCard({
  product,
  featured = false,
}: ProductCardProps) {
  const hasDiscount =
    product.discountedPrice != null && product.discountedPrice < product.price;
  const imgUrl = product.image?.url;
  const imgAlt = product.image?.alt ?? product.title;

  return (
    <article
      className={`
        bg-[var(--bg-card)] border-2 border-[var(--border)] overflow-hidden
        ${featured ? "md:col-span-2 md:row-span-2" : ""}
      `}
    >
      <div
        className={`relative bg-[var(--border)] ${featured ? "aspect-[4/3]" : "aspect-square"}`}
      >
        {imgUrl ? (
          <Image
            src={imgUrl}
            alt={imgAlt}
            fill
            className="object-cover"
            sizes={featured ? "(min-width: 768px) 66vw, 100vw" : "50vw"}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-[var(--text-muted)] text-sm">
            No image
          </div>
        )}
        {hasDiscount && (
          <span className="absolute top-2 left-2 bg-[var(--sale)] text-white text-xs font-bold uppercase tracking-wide px-2 py-1">
            On sale
          </span>
        )}
      </div>
      <div className="p-4">
        <h3
          className={`font-bold text-[var(--text)] ${featured ? "text-xl" : "text-base"}`}
          style={{ fontFamily: "var(--font-bitter), serif" }}
        >
          {product.title}
        </h3>
        {product.description && (
          <p className="text-[var(--text-muted)] text-sm mt-1 line-clamp-2">
            {product.description}
          </p>
        )}
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <span className="text-lg font-bold text-[var(--accent)]">
            {hasDiscount ? product.discountedPrice : product.price} kr
          </span>
          {hasDiscount && (
            <span className="text-sm text-[var(--text-muted)] line-through">
              {product.price} kr
            </span>
          )}
          {product.rating != null && (
            <span className="text-sm text-[var(--text-muted)]">
              ★ {product.rating.toFixed(1)}
            </span>
          )}
        </div>
        {product.tags && product.tags.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1">
            {product.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="text-xs bg-[var(--border)] text-[var(--text-muted)] px-2 py-0.5"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}
