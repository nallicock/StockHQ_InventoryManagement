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
import { getUserRoles } from "../utils/auth";
import { getCategories } from "../services/categoryService";

function ProductsPage() {
  const roles = getUserRoles();
  const isAdmin = roles.includes("Admin");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [name, setName] = useState("");
  const [sku, setSku] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [quantityInStock, setQuantityInStock] = useState(0);
  const [categoryId, setCategoryId] = useState(0);
  const [editingProductId, setEditingProductId] = useState<number | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);

  useEffect(() => {
    getProducts()
      .then((data) => setProducts(data))
      .catch((error) => setError("Failed to load products!"))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    getCategories()
      .then((data) => setCategories(data))
      .catch((error) => console.error(error));
  }, []);

  function resetProductForm() {
    setName("");
    setSku("");
    setDescription("");
    setPrice(0);
    setQuantityInStock(0);
    setCategoryId(0);
    setEditingProductId(null);
  }

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
      resetProductForm();
      setShowCreateModal(false);
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
  if (loading) {
    return <p>Loading products......</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }
  return (
    <div className="productPage">
      <h1>Products</h1>
      <p>Manage products and inventory</p>

      {isAdmin && (
        <div className="create-btn-container">
          <button
            className="create-btn"
            onClick={() => setShowCreateModal(true)}
          >
            + Create Product
          </button>
        </div>
      )}
      {showCreateModal && (
        <div className="modalOverlay">
          <div className="modalBlock">
            <h2>Create/Update Product</h2>
            <form onSubmit={handleCreateProduct}>
              <div className="formField">
                <input
                  placeholder="Name"
                  className="formInput"
                  type="text"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                />
              </div>

              <div className="formField">
                <input
                  placeholder="SKU"
                  className="formInput"
                  type="text"
                  value={sku}
                  onChange={(event) => setSku(event.target.value)}
                />
              </div>
              <div className="formField">
                <input
                  placeholder="Description"
                  className="formInput"
                  type="text"
                  value={description}
                  onChange={(event) => setDescription(event.target.value)}
                />
              </div>
              <div className="formField">
                <label>Price</label>
                <input
                  className="formInput"
                  type="number"
                  value={price}
                  onChange={(event) => setPrice(Number(event.target.value))}
                />
              </div>
              <div className="formField">
                <label>Quantity</label>
                <input
                  className="formInput"
                  type="number"
                  value={quantityInStock}
                  onChange={(event) =>
                    setQuantityInStock(Number(event.target.value))
                  }
                />
              </div>
              <div className="formField">
                <label>Category</label>
                <select
                  className="formInput"
                  value={categoryId}
                  onChange={(event) =>
                    setCategoryId(Number(event.target.value))
                  }
                >
                  <option value={0}>Select a category</option>

                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
              <button className="submit-btn" type="submit">
                {editingProductId !== null
                  ? "Update Product"
                  : "Create Product"}
              </button>
              <button
                className="cancel-btn"
                type="button"
                onClick={() => {
                  setShowCreateModal(false);
                  resetProductForm();
                }}
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
      <div className="searchContainer">
        <input
          type="text"
          className="searchInput"
          placeholder="Search products...."
        />
      </div>
      <div className="tableWrapper">
        <table className="productsTable">
          <thead>
            <tr className="productsHeader">
              <th>Product</th>
              <th>SKU</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>{product.name}</td>
                <td>{product.sku}</td>
                <td>${product.price}</td>
                <td>{product.quantityInStock}</td>

                <td className="productActions">
                  <button onClick={() => handleReceiveStock(product.id)}>
                    Receive 5
                  </button>
                  <button onClick={() => handleSellStock(product.id)}>
                    Sell 5
                  </button>
                  {isAdmin && (
                    <button
                      onClick={() => {
                        setShowCreateModal(true);
                        handleEditProduct(product);
                      }}
                    >
                      Edit
                    </button>
                  )}
                  {isAdmin && (
                    <button onClick={() => handleDeleteProduct(product.id)}>
                      Delete
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ProductsPage;
