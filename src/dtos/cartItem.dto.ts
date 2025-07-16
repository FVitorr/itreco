import { Product } from "./product.dto";

export interface CartItem {
  id: number;
  product: Product;
  quantity: number;
  price: number;
}
