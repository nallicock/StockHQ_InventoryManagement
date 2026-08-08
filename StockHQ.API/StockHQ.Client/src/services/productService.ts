import type { Product } from "../types/Product";

//instead of App.tsx knowing how to call backend, service handles api commmunications
const API_URL = "https://localhost:7290/api/products";

export async function getProducts(): Promise<Product[]> {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Failed to load products");
  }

  return await response.json();
}

/*
receive stock process:
React > get JWT from localStorage > POST /api/products/1/receive
> Authorization: Bearer <JWT> > .NET validates token
 > [Authorize(Roles = "Admin, Employee")] > Receive Stock
*/
export async function receiveStock(productId: number, quantity: number) {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_URL}/${productId}/receive`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      quantity,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to receive stock");
  }
}

export async function sellStock(productId: number, quantity: number) {
  const token = localStorage.getItem("token");

  const response = await fetch(
    `https://localhost:7290/api/products/${productId}/sell`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        quantity,
      }),
    },
  );

  if (!response.ok) {
    const errorText = await response.text();

    console.error("Sell stock failed:", response.status, errorText);

    throw new Error("Failed to sell stock.");
  }
}

export type CreateProductRequest = {
  name: string;
  sku: string;
  description: string;
  price: number;
  quantityInStock: number;
  categoryId: number;
};

export async function createProduct(request: CreateProductRequest) {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_URL}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(request),
  });

  if (!response.ok) {
    throw new Error("Failed to create product.");
  }

  return await response.json();
}

export type UpdateProductRequest = {
  name: string;
  sku: string;
  description: string;
  price: number;
  quantityInStock: number;
  categoryId: number;
};

export async function updateProduct(
  productId: number,
  request: UpdateProductRequest,
) {
  const token = localStorage.getItem("token");

  const response = await fetch(
    `https://localhost:7290/api/products/${productId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(request),
    },
  );

  if (!response.ok) {
    throw new Error("Failed to update product.");
  }
}

//calls DELETE /api/products/{id}
//admin only
export async function deleteProduct(productId: number) {
  const token = localStorage.getItem("token");

  const response = await fetch(
    `https://localhost:7290/api/products/${productId}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  if (!response.ok) {
    throw new Error("Failed to delete product.");
  }
}
