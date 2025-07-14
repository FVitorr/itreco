import { Category } from "../dtos/category.dto";
import api from "./api";

export async function getCategory(): Promise<Category[]> {
  const response = await api.get<Category[]>("/category");
  return response.data;
}
