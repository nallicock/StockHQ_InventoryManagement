import { useEffect, useState } from "react";
import type { Product } from "../types/Product";
import { getProducts } from "../services/productService";
import { receiveStock } from "../services/productService";

function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    getProducts()
      .then((data) => setProducts(data))
      .catch((error) => console.error(error));
  }, []);

  async function handleReceiveStock(productId: number) {
    const quantity = 5;

    try {
      await receiveStock(productId, quantity);

      const updatedProducts = await getProducts();
      setProducts(updatedProducts);
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <div>
      <h1>Products!</h1>

      {products.map((product) => (
        <div key={product.id}>
          <h2>{product.name}</h2>
          <p>SKU: {product.sku}</p>
          <p>Price: ${product.price}</p>
          <p>Stock: {product.quantityInStock}</p>

          <button onClick={() => handleReceiveStock(product.id)}>
            Receive 5
          </button>
        </div>
      ))}
    </div>
  );
}

export default ProductsPage;
