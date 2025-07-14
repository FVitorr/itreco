import { User } from "./user.dto";
import { Product } from "./product.dto";
import { Category } from "./category.dto";

export interface Store {
  id: number;
  rating: number;
  deliveryTime: number;
  owner: User;
  products: Product[];
  category: Category;
}
