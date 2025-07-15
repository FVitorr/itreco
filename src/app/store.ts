import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../features/cart/cartSlice"; // Certifique-se do caminho correto

export const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
