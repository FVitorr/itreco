import { Product } from "../dtos/product.dto";
import { ProductList } from "../dtos/productList.dto";
import { Store } from "../dtos/store.dto";
import { GetProductsParam } from "../interface/getProductsParam.interface";
import { PaginatedResponse } from "../interface/paginate.interface";

import api from "./api";

export async function getProducts(
  params: GetProductsParam = {}
): Promise<PaginatedResponse<ProductList>> {
  const { categoryId, name, page, limit } = params;

  if (!categoryId) {
    throw new Error("categoryId é obrigatório para buscar produtos.");
  }

  const response = await api.get<PaginatedResponse<ProductList>>(
    `/product/category/${categoryId}`,
    {
      params: {
        name: name || "",
        page: page ?? 0,
        size: limit ?? 10,
      },
    }
  );

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
