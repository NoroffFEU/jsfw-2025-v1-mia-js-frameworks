import { fetchProducts } from "@/app/api/api";
import HomeContent from "@/app/components/HomeContent";
import ProductGrid from "@/app/components/ProductGrid";
import { ApiError } from "@/app/components/shared/types";

export default async function HomePage() {
  let products: Awaited<ReturnType<typeof fetchProducts>> = [];

  try {
    products = await fetchProducts();
  } catch (error) {
    if (error instanceof ApiError) {
      console.error("Products API failed:", error.status, error.message);
    } else {
      console.error("Products fetch failed:", error);
    }

    const isServerError = error instanceof ApiError && error.status >= 500;

    return (
      <HomeContent>
        <section className="max-w-6xl mx-auto px-4 py-12">
          <p className="text-(--text-muted)">
            {isServerError
              ? "Our shop is temporarily unavailable. Please try again in a few minutes."
              : "We couldn’t load products. Please try again later."}
          </p>
        </section>
      </HomeContent>
    );
  }

  return (
    <HomeContent>
      <ProductGrid products={products} />
    </HomeContent>
  );
}
