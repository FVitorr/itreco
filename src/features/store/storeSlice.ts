import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Store } from '../../dtos/store.dto'

interface StoreState {
  currentStore: Store | null
}

const initialState: StoreState = {
  currentStore: null,
}

const storeSlice = createSlice({
  name: 'store',
  initialState,
  reducers: {
    setStore: (state, action: PayloadAction<Store>) => {
      state.currentStore = action.payload
    },
    clearStore: (state) => {
      state.currentStore = null
    },
  },
})

export const { setStore, clearStore } = storeSlice.actions

export default storeSlice.reducer
