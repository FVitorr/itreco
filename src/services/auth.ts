// services/auth.ts
export async function login(email: string, password: string) {
  const response = await fetch("http://localhost:8080/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) throw new Error("Falha no login");

  const data = await response.json();
  localStorage.setItem("token", data.token);
}
