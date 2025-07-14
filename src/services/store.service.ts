import { Store } from "../dtos/store.dto";
import api from "./api";

export async function getTopStores(): Promise<Store[]> {
  const response = await api.get<Store[]>("/store/home");
  return response.data;
}
