import { createSlice } from "@reduxjs/toolkit"

const cartSlice = createSlice({
  name: "cart",
  initialState: [],
  reducers: {
    addItem: (state, action) => {
      const existingItem = state.find((item) => item.id === action.payload.id)
      if (existingItem) {
        existingItem.quantity += 1
      } else {
        state.push({ ...action.payload, quantity: 1 })
      }
    },
    removeItem: (state, action) => {
      return state.filter((item) => item.id !== action.payload)
    },
    updateQuantity: (state, action) => {
      const item = state.find((item) => item.id === action.payload.id)
      if (item) {
        item.quantity = Math.max(0, action.payload.quantity)
        if (item.quantity === 0) {
          return state.filter((i) => i.id !== action.payload.id)
        }
      }
    },
    clearCart: () => [],
  },
})

export const { addItem, removeItem, updateQuantity, clearCart } =
  cartSlice.actions

export const selectCart = (state) => state.cart
export const selectTotalItems = (state) =>
  state.cart.reduce((sum, item) => sum + item.quantity, 0)
export const selectTotalPrice = (state) =>
  state.cart
    .reduce((sum, item) => sum + item.price * item.quantity, 0)
    .toFixed(2)

export default cartSlice.reducer
