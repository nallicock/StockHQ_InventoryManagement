const API_URL = "https://localhost:7290/api/auth";

export async function login(email: string, password: string) {
  const response = await fetch(`${API_URL}/login`, {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify({
      email,
      password,
    }),
  });

  if (!response.ok) {
    throw new Error("Invalid email or password");
  }

  return await response.json();
}
