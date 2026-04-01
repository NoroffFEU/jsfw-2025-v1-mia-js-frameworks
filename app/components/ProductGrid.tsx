"use client";

import { useMemo, useState } from "react";
import type { Product } from "@/shared/types";
import {
  productHasDiscount,
  productEffectiveUnitPrice,
  productDiscountPercent,
} from "@/shared/productPricing";
import ProductCard from "./ProductCard";

interface ProductGridProps {
  products: Product[];
}

type SortKey =
  | "name"
  | "name-z-to-a"
  | "price"
  | "price-high-to-low"
  | "rating"
  | "rating-low-to-high"
  | "discount";

/** Shows products with discounts */
function discountSearch(query: string): boolean {
  const lower = query.toLowerCase().trim();
  if (!lower) return false;
  const keywords = [
    "discount",
    "discounted",
    "on sale",
    "sale",
    "deal",
    "reduced",
  ];
  return keywords.some((kw) => lower.includes(kw));
}

function textMatch(product: Product, query: string): boolean {
  const lower = query.toLowerCase();
  if (product.title.toLowerCase().includes(lower)) return true;
  const desc = product.description?.trim();
  if (desc && desc.toLowerCase().includes(lower)) return true;
  return (
    product.tags?.some((tag) => tag.toLowerCase().includes(lower)) ?? false
  );
}

function matchesSearch(product: Product, query: string): boolean {
  if (!query.trim()) return true;
  if (discountSearch(query) && productHasDiscount(product)) return true;
  return textMatch(product, query);
}

function sortProducts(list: Product[], key: SortKey): Product[] {
  const copy = [...list];
  switch (key) {
    case "name":
      return copy.sort((a, b) =>
        a.title.localeCompare(b.title, undefined, { sensitivity: "base" }),
      );
    case "name-z-to-a":
      return copy.sort((a, b) =>
        b.title.localeCompare(a.title, undefined, { sensitivity: "base" }),
      );
    case "price":
      return copy.sort(
        (a, b) => productEffectiveUnitPrice(a) - productEffectiveUnitPrice(b),
      );

    case "price-high-to-low":
      return copy.sort(
        (a, b) => productEffectiveUnitPrice(b) - productEffectiveUnitPrice(a),
      );

    case "rating":
      return copy.sort((a, b) => {
        const ra = a.rating ?? -1;
        const rb = b.rating ?? -1;
        return rb - ra;
      });

    case "rating-low-to-high":
      return copy.sort((a, b) => {
        const ra = a.rating ?? -1;
        const rb = b.rating ?? -1;
        return ra - rb;
      });

    case "discount":
      return copy.sort((a, b) => {
        const pa = productDiscountPercent(a);
        const pb = productDiscountPercent(b);
        if (pa == null && pb == null) return 0;
        if (pa == null) return 1; // a without discount → lower
        if (pb == null) return -1; // b without discount → lower
        return pb - pa; // larger % off first
      });
    default:
      return copy;
  }
}

export default function ProductGrid({ products }: ProductGridProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("name");

  const filteredSorted = useMemo(() => {
    const filtered = products.filter((product) =>
      matchesSearch(product, searchTerm),
    );
    return sortProducts(filtered, sortKey);
  }, [products, searchTerm, sortKey]);

  if (!products.length) {
    return (
      <section id="products" className="max-w-6xl mx-auto px-4 py-12">
        <p className="text-(--text-muted)">No products right now.</p>
      </section>
    );
  }

  const q = searchTerm.trim();
  const hasQuery = q.length > 0;
  const noMatches = hasQuery && filteredSorted.length === 0;

  const [first, ...rest] = filteredSorted;

  return (
    <section id="products" className="max-w-6xl mx-auto px-4 py-12">
      <h2
        className="text-2xl font-bold text-(--text) mb-8"
        style={{ fontFamily: "var(--font-bitter), serif" }}
      >
        Products
      </h2>
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="w-full sm:flex-1 min-w-0">
          <label htmlFor="product-search" className="sr-only">
            Search products
          </label>
          <input
            id="product-search"
            type="search"
            aria-controls="product-grid"
            placeholder="Search products, tags, or try “discount”"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-2 border border-(--border) rounded-md"
            autoComplete="off"
          />
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <label
            htmlFor="product-sort"
            className="text-sm text-(--text-muted) whitespace-nowrap"
          >
            Sort by
          </label>
          <select
            id="product-sort"
            value={sortKey}
            onChange={(e) => setSortKey(e.target.value as SortKey)}
            className="min-w-[10rem] p-2 border border-(--border) rounded-md bg-(--bg-card) text-(--text)"
            aria-label="Sort products"
          >
            <option value="name">Name (A to Z)</option>
            <option value="name-z-to-a">Name (Z to A)</option>
            <option value="price">Price (Low to High)</option>
            <option value="price-high-to-low">Price (High to Low)</option>
            <option value="rating">Rating (High to Low)</option>
            <option value="rating-low-to-high">Rating (Low to High)</option>
            <option value="discount">Most Discount</option>
          </select>
        </div>
      </div>

      <p className="mb-8 text-sm text-(--text-muted)" aria-live="polite">
        {hasQuery
          ? noMatches
            ? `No products match “${q}”.`
            : `${filteredSorted.length} product${filteredSorted.length === 1 ? "" : "s"} found`
          : `${products.length} product${products.length === 1 ? "" : "s"}`}
      </p>
      {noMatches ? null : (
        <div
          id="product-grid"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6"
        >
          {first && <ProductCard product={first} featured />}
          {rest.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
}
