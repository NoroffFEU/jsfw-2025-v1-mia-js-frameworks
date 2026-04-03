"use client";

import type { Product } from "@/app/components/shared/types";
import { useCart } from "@/app/context/CartContext";
import { useToast } from "@/app/context/ToastContext";
import { productEffectiveUnitPrice } from "@/app/components/shared/productPricing";

const defaultButtonClass =
  "shrink-0 self-center px-3 py-1.5 bg-(--accent) text-white text-xs font-semibold border-2 border-(--accent) transition-colors hover:bg-(--text) hover:border-(--text) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--text)";

type AddToCartButtonProps = {
  product: Product;
  className?: string;
};

export default function AddToCartButton({
  product,
  className = defaultButtonClass,
}: AddToCartButtonProps) {
  const unitPrice = productEffectiveUnitPrice(product);
  const { addItem } = useCart();
  const { showToast } = useToast();

  return (
    <button
      type="button"
      onClick={() => {
        addItem({
          productId: product.id,
          title: product.title,
          imageUrl: product.image?.url,
          unitPrice,
          listPrice: product.price,
        });
        showToast(`Successfully added ${product.title} to your cart`);
      }}
      className={className}
    >
      Add to Cart
    </button>
  );
}
