import { Product } from "../dtos/product.dto";
import { Store } from "../dtos/store.dto";
import { GetProductsParam } from "../interface/getProductsParam.interface";
import { PaginatedResponse } from "../interface/paginate.interface";

import api from "./api";

export async function getProducts(
  params: GetProductsParam = {}

): Promise<PaginatedResponse<Product>> {
  const response = await api.get<PaginatedResponse<Product>>("/products", {
    params,
  });
  return response.data;
}

export async function searchProductsOrStores(
  params: string
): Promise<PaginatedResponse<Product>> {
  const response = await api.get<PaginatedResponse<Product>>("/search", {
    params: { q: params },
  });
  return response.data;
}
