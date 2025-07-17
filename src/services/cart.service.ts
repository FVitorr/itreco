import { Cart } from "../dtos/cart.dto ";
import { Product } from "../dtos/product.dto";
import api from "./api";

interface CartItem {
  product: Product;
  quantity: number;
  price: number;
}

interface SyncCartPayload {
  userId: number;
  items: {
    productId: number;
    quantity: number;
    price: number;
  }[];
  total: number;
}

export async function syncCartWithBackend(
  userId: number,
  items: CartItem[],
  total: number
): Promise<Cart[]> {
  const payload: SyncCartPayload = {
    userId,
    total,
    items: items.map((item) => ({
      productId: item.product.id,
      quantity: item.quantity,
      price: item.price,
    })),
  };

  const response = await api.post<Cart[]>("/cart", payload);
  return response.data;
}



export async function getCart(id: number) {
  const response = await api.get<Cart>(`/cart/${id}`);
  return response.data;
}
