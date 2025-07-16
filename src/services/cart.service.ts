import { Product } from "../dtos/product.dto";
import { Store } from "../dtos/store.dto";
import api from "./api";

export async function sendAddToCart(product: Product): Promise<Store[]> {
  const response = await api.post<Store[]>("/cart/add", { product });
  return response.data;
}
