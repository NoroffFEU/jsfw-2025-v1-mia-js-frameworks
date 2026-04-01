"use client";
import Link from "next/link";
import type { Product } from "@/shared/types";
import Image from "next/image";
import { formatKr } from "@/shared/format";
import AddToCartButton from "@/app/components/AddToCartButton";
import {
  productDiscountPercent,
  productEffectiveUnitPrice,
  productHasDiscount,
} from "@/shared/productPricing";

interface ProductCardProps {
  product: Product;
  featured?: boolean;
}

export default function ProductCard({
  product,
  featured = false,
}: ProductCardProps) {
  const hasDiscount = productHasDiscount(product);
  const discountPercent = productDiscountPercent(product);
  const unitPrice = productEffectiveUnitPrice(product);
  const imgUrl = product.image?.url;
  const imgAlt = product.image?.alt?.trim() || product.title || "Product image";
  const productHref = `/product/${product.id}`;

  return (
    <article
      className={`
        bg-[var(--bg-card)] border-2 border-[var(--border)] overflow-hidden
        ${featured ? "md:col-span-2 md:row-span-1" : ""}
      `}
    >
      <Link
        href={productHref}
        className={`relative block bg-[var(--border)] ${featured ? "group aspect-[4/3]" : "aspect-square"} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2`}
      >
        {imgUrl ? (
          <Image
            src={imgUrl}
            alt={imgAlt}
            fill
            className={
              featured
                ? "object-cover transition-[object-fit] duration-300 ease-out group-hover:object-contain"
                : "object-cover"
            }
            sizes={featured ? "(min-width: 768px) 66vw, 100vw" : "50vw"}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-[var(--text-muted)] text-sm">
            No image
          </div>
        )}
        {discountPercent != null && (
          <span className="absolute top-2 left-2 bg-[var(--sale)] text-white text-xs font-bold uppercase tracking-wide px-2 py-1">
            −{discountPercent}%
          </span>
        )}
      </Link>
      <div className="p-4">
        <Link
          href={productHref}
          className="block text-inherit no-underline hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 rounded-sm"
        >
          <h3
            className={`font-bold text-[var(--text)] ${featured ? "text-xl" : "text-base"}`}
            style={{ fontFamily: "var(--font-bitter), serif" }}
          >
            {product.title}
          </h3>
        </Link>
        {product.description?.trim() && (
          <p className="mt-6 text-[var(--text-muted)] leading-relaxed whitespace-pre-wrap">
            {product.description.trim()}
          </p>
        )}
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <span className="text-lg font-bold text-[var(--accent)]">
            {formatKr(unitPrice)}
          </span>
          {hasDiscount && (
            <span className="text-sm text-[var(--text-muted)] line-through">
              {formatKr(product.price)}
            </span>
          )}
          {product.rating != null && (
            <span className="text-sm text-[var(--text-muted)]">
              ★ {product.rating.toFixed(1)}
            </span>
          )}
        </div>

        <div className="mt-2 flex items-start justify-between gap-2">
          <div className="flex min-w-0 flex-1 flex-wrap gap-1">
            {product.tags &&
              product.tags.length > 0 &&
              product.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="text-sm bg-[var(--border)] text-[var(--text)] px-2 py-0.5"
                >
                  {tag}
                </span>
              ))}
          </div>
          <AddToCartButton product={product} />
        </div>
      </div>
    </article>
  );
}
