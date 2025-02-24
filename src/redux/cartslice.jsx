import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  items: [],
  totalPrice: 0,
}

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addPizza: (state, action) => {
      const existingPizza = state.items.find(p => p.id === action.payload.id)
    
      if (existingPizza) {
        existingPizza.quantity += 1
      } else {
        state.items.push({ ...action.payload, quantity: 1 })
      }
    
      state.totalPrice += action.payload.price
    },
    
    removePizza: (state, action) => {
      const existingPizza = state.items.find(p => p.id === action.payload)
    
      if (existingPizza) {
        if (existingPizza.quantity > 1) {
          existingPizza.quantity -= 1
        } else {
          state.items = state.items.filter(p => p.id !== action.payload)
        }
        state.totalPrice -= existingPizza.price
      }
    },
    
  },
})

export const { addPizza, removePizza } = cartSlice.actions
export default cartSlice.reducer
