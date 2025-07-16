import {Product} from "../dtos/product.dto";
import {GetProductsParam} from "../interface/getProductsParam.interface";
import {PaginatedResponse} from "../interface/paginate.interface";

import api from "./api";

export async function getProducts(
  params: GetProductsParam = {}
): Promise<PaginatedResponse<Product>> {
  const { categoryId, name, page = 0, size = 10, sort } = params;

  const queryParams: Record<string, any> = {
    page,
    size,
  };

  if (categoryId) queryParams.categoryId = categoryId;
  if (name) queryParams.name = name;
  if (sort) queryParams.sort = sort;

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

export async function save(product: Omit<Product, "id">): Promise<Product> {
  const response = await api.post<Product>("/product", product);
  return response.data;
}


export async function update(product: Product): Promise<Product> {
  const response = await api.put<Product>(`/product/${product.id}`, product);
  return response.data;
}

export async function deleteProduct(productId: number): Promise<void> {
  await api.delete(`/product/${productId}`);
}
