import {Category} from "./category.dto";

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  categories?: Category[];
}
