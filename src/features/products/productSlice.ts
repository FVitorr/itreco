// src/features/cart/cartSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Product } from '../../dtos/product.dto'
import { Store } from '../../dtos/store.dto'

interface CartStore {
  store: Store
  products: Product[]
}

interface CartState {
  stores: CartStore[]
}

const initialState: CartState = {
  stores: [],
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addProductToCart: (state, action: PayloadAction<{ store: Store; product: Product }>) => {
      const { store, product } = action.payload

      let cartStore = state.stores.find(s => s.store.id === store.id)
      if (!cartStore) {
        state.stores.push({ store, products: [product] })
      } else {
        const exists = cartStore.products.find(p => p.id === product.id)
        if (!exists) {
          cartStore.products.push(product)
        }
      }
    },
    clearCart: (state) => {
      state.stores = []
    },
  },
})

export const { addProductToCart, clearCart } = cartSlice.actions
export default cartSlice.reducer
