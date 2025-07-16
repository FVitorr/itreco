import { Product } from "../dtos/product.dto";
import { ProductList } from "../dtos/productList.dto";
import { Store } from "../dtos/store.dto";
import { GetProductsParam } from "../interface/getProductsParam.interface";
import { PaginatedResponse } from "../interface/paginate.interface";

import api from "./api";

export async function getProducts(
  params: GetProductsParam = {}
): Promise<PaginatedResponse<Product>> {
  const { categoryId, name, page = 0, size = 10 } = params;

  const queryParams: Record<string, any> = {
    page,
    size,
  };

  if (categoryId) queryParams.categoryId = categoryId;
  if (name) queryParams.name = name;

  const response = await api.get<PaginatedResponse<Product>>(
    `/product/category`,
    { params: queryParams }
  );

  return response.data;
}

export async function searchProductsOrStores(
  params: string
): Promise<PaginatedResponse<Product>> {
  const response = await api.get<PaginatedResponse<Product>>(
    "/product/search",
    {
      params: { name: params },
    }
  );
  return response.data;
}

export async function getProductStores(): Promise<PaginatedResponse<Product>> {
  const response = await api.get<PaginatedResponse<Product>>("/product/store");
  return response.data;
}
