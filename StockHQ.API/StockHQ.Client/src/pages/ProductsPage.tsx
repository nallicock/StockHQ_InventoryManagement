import { useEffect, useState } from "react";
import type { Product } from "../types/Product";
import {
  getProducts,
  receiveStock,
  sellStock,
  createProduct,
} from "../services/productService";

function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [name, setName] = useState("");
  const [sku, setSku] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [quantityInStock, setQuantityInStock] = useState(0);
  const [categoryId, setCategoryId] = useState(0);

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

  async function handleSellStock(productId: number) {
    const quantity = 5;

    try {
      await sellStock(productId, quantity);

      const updatedProducts = await getProducts();
      setProducts(updatedProducts);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleCreateProduct(event: React.FormEvent) {
    event.preventDefault();

    try {
      await createProduct({
        name,
        sku,
        description,
        price,
        quantityInStock,
        categoryId,
      });

      const updatedProducts = await getProducts();
      setProducts(updatedProducts);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
      <h1>Products!</h1>
      <h2>Create Product</h2>
      {products.map((product) => (
        <div key={product.id}>
          <h2>{product.name}</h2>
          <p>SKU: {product.sku}</p>
          <p>Price: ${product.price}</p>
          <p>Stock: {product.quantityInStock}</p>

          <button onClick={() => handleReceiveStock(product.id)}>
            Receive 5
          </button>
          <button onClick={() => handleSellStock(product.id)}>Sell 5</button>
        </div>
      ))}
    </div>
  );
}

export default ProductsPage;
