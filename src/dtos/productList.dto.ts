import {Store} from "./store.dto";

export interface ProductList {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  store: Store;
}
