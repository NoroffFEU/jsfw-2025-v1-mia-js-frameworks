import Link from "next/link";
import { notFound } from "next/navigation";
import Image from "next/image";
import { fetchProductById } from "@/shared/api";
import { ApiError, type Product } from "@/shared/types";
import { formatStarRating } from "@/shared/format";
import { productDiscountPercent } from "@/shared/productPricing";
import { SITE_DESCRIPTION } from "@/shared/site";
import { primaryButtonClass, primaryLinkButtonClass } from "@/shared/uiClasses";
import AddToCartButton from "@/app/components/AddToCartButton";
import DiscountBadge from "@/app/components/DiscountBadge";
import ProductImagePlaceholder from "@/app/components/ProductImagePlaceholder";
import ProductPriceRow from "@/app/components/ProductPriceRow";

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props) {
  const { id } = await params;
  try {
    const product = await fetchProductById(id);
    const desc = product.description?.trim();
    return {
      title: product.title,
      description: desc || `${product.title} — Loot Locker`,
      openGraph: {
        title: product.title,
        description: desc || `${product.title} — Loot Locker`,
        ...(product.image?.url && { images: [{ url: product.image.url }] }),
      },
    };
  } catch {
    return {
      title: "Product",
      description: SITE_DESCRIPTION,
    };
  }
}

export default async function ProductPage({ params }: Props) {
  const { id } = await params;
  let product: Product;
  try {
    product = await fetchProductById(id);
  } catch (e) {
    if (e instanceof ApiError && e.status === 404) notFound();
    return (
      <div className="max-w-6xl mx-auto px-4 py-12">
        <p className="text-(--text-muted)">
          We couldn&apos;t load this product. Please try again later.
        </p>
        <Link
          href="/"
          className="mt-4 inline-block text-(--accent) underline"
        >
          Back to shop
        </Link>
      </div>
    );
  }

  const discountPercent = productDiscountPercent(product);

  return (
    <article className="max-w-6xl mx-auto px-4 py-12">
      <div className="grid gap-8 md:grid-cols-2 md:gap-12">
        <div className="relative aspect-square w-full max-w-xl bg-(--border)">
          {product.image?.url ? (
            <Image
              src={product.image.url}
              alt={
                product.image.alt?.trim() || product.title || "Product image"
              }
              fill
              className="object-cover"
              sizes="(min-width: 768px) 50vw, 100vw"
              priority
            />
          ) : (
            <ProductImagePlaceholder />
          )}
          {discountPercent != null && (
            <DiscountBadge percent={discountPercent} />
          )}
        </div>

        <div>
          <h1
            className="text-3xl font-bold text-(--text) md:text-4xl"
            style={{ fontFamily: "var(--font-bitter), serif" }}
          >
            {product.title}
          </h1>

          <ProductPriceRow product={product} variant="detail" className="mt-4" />

          {product.description?.trim() && (
            <p className="mt-6 text-(--text-muted) leading-relaxed whitespace-pre-wrap">
              {product.description.trim()}
            </p>
          )}

          {product.tags && product.tags.length > 0 && (
            <ul className="mt-6 flex flex-wrap gap-2" role="list">
              {product.tags.map((tag) => (
                <li
                  key={tag}
                  className="text-sm bg-(--border) text-(--text) px-2 py-1"
                >
                  {tag}
                </li>
              ))}
            </ul>
          )}

          <div className="mt-6">
            <AddToCartButton product={product} className={primaryButtonClass} />
          </div>
        </div>
      </div>

      {product.reviews && product.reviews.length > 0 && (
        <section className="mt-12 border-t border-(--border) pt-10">
          <h2
            className="text-xl font-bold text-(--text)"
            style={{ fontFamily: "var(--font-bitter), serif" }}
          >
            Reviews
          </h2>
          <ul className="mt-4 space-y-4" role="list">
            {product.reviews.map((review) => (
              <li
                key={review.id}
                className="border border-(--border) bg-(--bg-card) p-4"
              >
                <p className="font-semibold text-(--text)">
                  {review.username}{" "}
                  <span className="font-normal text-(--text-muted)">
                    {formatStarRating(review.rating)}
                  </span>
                </p>
                {review.description?.trim() && (
                  <p className="mt-2 text-sm text-(--text-muted)">
                    {review.description.trim()}
                  </p>
                )}
              </li>
            ))}
          </ul>
        </section>
      )}
      <div className="mt-8 flex justify-center border-t border-(--border) pt-5">
        <Link href="/" className={primaryLinkButtonClass}>
          Back to shop
        </Link>
      </div>
    </article>
  );
}
