export interface ProductImage {
  image: string;
}
export interface Product {
  name: string;
  price: number;
  images: ProductImage[];
}
