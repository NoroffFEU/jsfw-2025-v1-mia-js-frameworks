"use client";
import { useState } from "react";
import type { Product } from "@/shared/types";
import ProductCard from "./ProductCard";

interface ProductGridProps {
  products: Product[];
}

export default function ProductGrid({ products }: ProductGridProps) {
  const [searchTerm, setSearchTerm] = useState("");
  if (!products.length) {
    return (
      <section id="products" className="max-w-6xl mx-auto px-4 py-12">
        <p className="text-[var(--text-muted)]">No products right now.</p>
      </section>
    );
  }
  const filteredProducts = products.filter((product) => product.title.toLowerCase().includes(searchTerm.toLowerCase()));

  const [first, ...rest] = filteredProducts;

  return (
    <section id="products" className="max-w-6xl mx-auto px-4 py-12">
      <h2
        className="text-2xl font-bold text-[var(--text)] mb-8"
        style={{ fontFamily: "var(--font-bitter), serif" }}
      >
        Products
      </h2>
      <div className="mb-8"><input type="text" placeholder="Search products"
        value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}  className="w-full p-2 border border-[var(--border)] rounded-md" /></div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {first && <ProductCard product={first} featured />}
        {rest.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
