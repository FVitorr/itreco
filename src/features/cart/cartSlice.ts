import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../../dtos/product.dto";
import { CartItem } from "../../dtos/cartItem.dto";

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProductToCart: (state, action: PayloadAction<{ product: Product }>) => {
      const { product } = action.payload;
      const existingItem = state.items.find(item => item.product.id === product.id);

      if (existingItem) {
        existingItem.quantity += 1;
        existingItem.price = existingItem.quantity * product.price;
      } else {
        state.items.push({
          id: Date.now(),
          product,
          quantity: 1,
          price: product.price,
        });
      }
    },

    incrementQuantity: (state, action: PayloadAction<number>) => {
      const item = state.items.find(item => item.product.id === action.payload);
      if (item) {
        item.quantity += 1;
        item.price = item.quantity * item.product.price;
      }
    },

    decrementQuantity: (state, action: PayloadAction<number>) => {
      const item = state.items.find(item => item.product.id === action.payload);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
        item.price = item.quantity * item.product.price;
      }
    },

    removeItem: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(item => item.product.id !== action.payload);
    },

    clearCart: (state) => {
      state.items = [];
    },

    setCartItems: (state, action: PayloadAction<CartItem[]>) => {
      state.items = action.payload;
    },
  },
});

export const {
  addProductToCart,
  incrementQuantity,
  decrementQuantity,
  removeItem,
  clearCart,
  setCartItems,
} = cartSlice.actions;

export default cartSlice.reducer;
