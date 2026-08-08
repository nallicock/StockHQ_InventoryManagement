import { useEffect, useState } from "react";
import type { Product } from "../types/Product";
import type { Category } from "../types/Category";
import {
  getProducts,
  receiveStock,
  sellStock,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../services/productService";

import { getCategories } from "../services/categoryService";

function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [name, setName] = useState("");
  const [sku, setSku] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [quantityInStock, setQuantityInStock] = useState(0);
  const [categoryId, setCategoryId] = useState(0);
  const [editingProductId, setEditingProductId] = useState<number | null>(null);

  useEffect(() => {
    getProducts()
      .then((data) => setProducts(data))
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    getCategories()
      .then((data) => setCategories(data))
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
      if (editingProductId !== null) {
        await updateProduct(editingProductId, {
          name,
          sku,
          description,
          price,
          quantityInStock,
          categoryId,
        });
      } else {
        await createProduct({
          name,
          sku,
          description,
          price,
          quantityInStock,
          categoryId,
        });
      }

      const updatedProducts = await getProducts();
      setProducts(updatedProducts);

      setEditingProductId(null);
    } catch (error) {
      console.error(error);
    }
  }

  //preload selected product's existing values into form
  async function handleEditProduct(product: Product) {
    setEditingProductId(product.id);

    setName(product.name);
    setSku(product.sku);
    setDescription(product.description);
    setPrice(product.price);
    setQuantityInStock(product.quantityInStock);
    setCategoryId(product.categoryId);
  }

  async function handleDeleteProduct(productId: number) {
    try {
      await deleteProduct(productId);

      const updatedProducts = await getProducts();
      setProducts(updatedProducts);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
      <h1>Products!</h1>

      <form onSubmit={handleCreateProduct}>
        <div>
          <label>Name</label>
          <input
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </div>

        <div>
          <label>SKU</label>
          <input
            type="text"
            value={sku}
            onChange={(event) => setSku(event.target.value)}
          />
        </div>
        <div>
          <label>Description</label>
          <input
            type="text"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
        </div>
        <div>
          <label>Price</label>
          <input
            type="number"
            value={price}
            onChange={(event) => setPrice(Number(event.target.value))}
          />
        </div>
        <div>
          <label>Quantity</label>
          <input
            type="number"
            value={quantityInStock}
            onChange={(event) => setQuantityInStock(Number(event.target.value))}
          />
        </div>
        <div>
          <label>Category</label>
          <select
            value={categoryId}
            onChange={(event) => setCategoryId(Number(event.target.value))}
          >
            <option value={0}>Select a category</option>

            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <button type="submit">
          {editingProductId !== null ? "Update Product" : "Create Product"}
        </button>
      </form>
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
          <button onClick={() => handleEditProduct(product)}>Edit</button>
          <button onClick={() => handleDeleteProduct(product.id)}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default ProductsPage;
