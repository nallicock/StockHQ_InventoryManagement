import type { Category } from "../types/Category";

const API_URL = "https://localhost:7290/api/categories";

export async function getCategories(): Promise<Category[]> {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Failed to load categories.");
  }

  return await response.json();
}
