import { fetchProducts } from "@/shared/api";
import HomeContent from "@/app/components/HomeContent";
import ProductGrid from "@/app/components/ProductGrid";

export default async function HomePage() {
  const products = await fetchProducts();
  return (
    <HomeContent>
      <ProductGrid products={products} />
    </HomeContent>
  );
}