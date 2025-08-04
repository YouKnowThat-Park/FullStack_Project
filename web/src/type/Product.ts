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
  category: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  admin_user: string;
}
