import { usePublicProductList } from "@/hooks/useProductList";
import { Product } from "@/type/Product";

export default function ProductsPage() {
  const { data } = usePublicProductList();

  return (
    <div>
      {data?.map((product: Product) => (
        <div key={product.name}>
          <p>{product.name}</p>
          <p>{product.price}</p>
        </div>
      ))}
    </div>
  );
}
