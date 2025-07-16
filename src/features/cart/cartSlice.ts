import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../../dtos/product.dto";

interface CartState {
  products: Product[];
}

const initialState: CartState = {
  products: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProductToCart: (state, action: PayloadAction<{ product: Product }>) => {
      const { product } = action.payload;
      const exists = state.products.find((p) => p.id === product.id);

      if (!exists) {
        state.products.push(product);
      } else {
        exists.quantity = (exists.quantity || 1) + 1;
      }
    },
    clearCart: (state) => {
      state.products = [];
    },
  },
});

export const { addProductToCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
