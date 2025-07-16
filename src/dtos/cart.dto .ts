import { User } from "./user.dto";
import { CartItem } from "./cartItem.dto";

export interface Cart {
  id: number;
  user: User;
  items: CartItem[];
  total: number;
}

//      deliveryFee: "R$ 9,99",
