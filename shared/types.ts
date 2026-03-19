export interface ProductImage {
  url: string;
  alt: string;
}

export interface Review {
  id: string;
  username: string;
  rating: number;
  description?: string;
}

export interface Product {
  id: string;
  title: string;
  description?: string;
  price: number;
  discountedPrice?: number;
  image?: ProductImage;
  rating?: number;
  tags?: string[];
  reviews?: Review[];
}

// Response shapes from the Noroff API
export interface ProductResponse {
  data: Product[];
}

export interface SingleProductResponse {
  data: Product;
}

// Custom error used in shared/api.ts
export class ApiError extends Error {
  status: number;
  body: string;

  constructor(message: string, status: number, body: string) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.body = body;
  }
}
