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
