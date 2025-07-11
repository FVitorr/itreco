import  api from "./api"
import {UserRegisterData} from "../dtos/user.dtos";


interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

const API = "http://localhost:8080";

export async function login(email: string, password: string) {
  const encodedCredentials = btoa("myclientid:myclientsecret");

  const formData = new URLSearchParams();
  formData.append("grant_type", "password");
  formData.append("username", email);
  formData.append("password", password);

  const response = await fetch(`${API}/oauth2/token`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${encodedCredentials}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: formData.toString(),
  });

  const data = await response.json();

  if (!response.ok || !data.access_token) {
    throw new Error(data.error_description || "Falha no login");
  }

  localStorage.setItem("token", data.access_token);
  return data;
}

export async function getUserInfo() {
  try {
    const response = await api.get("/auth/info");
    return response.data;
  } catch (error: any) {
    // Você pode customizar o tratamento de erro aqui
    const message =
      error.response?.data?.message ||
      error.message ||
      "Falha ao buscar dados do usuário";
    throw new Error(message);
  }
}

export async function register(data: UserRegisterData) {
  const response = await fetch(`${API}/user/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Falha no registro: ${errorText}`);
  }

  const responseData = await response.json();
  return responseData;
}
