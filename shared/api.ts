import { cache } from "react";
import {
  Product,
  ProductResponse,
  SingleProductResponse,
  ApiError,
} from "./types";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "https://v2.api.noroff.dev";

const REVALIDATE_SECONDS = 60;

async function fetchApi<T>(path: string, options?: RequestInit): Promise<T> {
  const url = `${API_URL}${path}`;

  const res = await fetch(url, {
    ...options,
    next: { revalidate: REVALIDATE_SECONDS },
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new ApiError(
      `API error: ${res.status} ${res.statusText}`,
      res.status,
      text,
    );
  }

  return res.json() as Promise<T>;
}

export const fetchProducts = cache(async (): Promise<Product[]> => {
  const response = await fetchApi<ProductResponse>("/online-shop");
  return response.data;
});

export const fetchProductById = cache(async (id: string): Promise<Product> => {
  const response = await fetchApi<SingleProductResponse>(`/online-shop/${id}`);
  return response.data;
});

