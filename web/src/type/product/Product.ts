import { Category } from "./Category";

export interface ProductImage {
  image: string;
}
export interface PublicProduct {
  id: string;
  name: string;
  price: number;
  images: ProductImage[];
}

export interface AdminProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  discount_price: number;
  stock: number;
  sold_count: number;
  rating: number;
  category: Category | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  admin_user: string;
}

export interface CreateProductInput {
  name: string;
  description: string;
  price: number;
  discount_price: number;
  stock: number;
  category: number;
  category_id: number;
  is_active: boolean;
  image?: File;
}
