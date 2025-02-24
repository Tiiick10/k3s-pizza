import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  items: [],
  totalPrice: 0,
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addPizza: (state, action) => {
      const pizza = action.payload
      const existingPizza = state.items.find(p => p.uniqueKey === pizza.uniqueKey)

      if (existingPizza) {
        existingPizza.quantity += 1
      } else {
        state.items.push({ ...pizza, quantity: 1 })
      }

      state.totalPrice = state.items.reduce(
        (total, pizza) => total + pizza.price * pizza.quantity,
        0
      )
    },
    
    removePizza: (state, action) => {
      const pizzaKey = action.payload
      const existingPizza = state.items.find(pizza => pizza.uniqueKey === pizzaKey)

      if (existingPizza) {
        if (existingPizza.quantity > 1) {
          existingPizza.quantity -= 1 
        } else {
          state.items = state.items.filter(pizza => pizza.uniqueKey !== pizzaKey)
        }
      }

      state.totalPrice = state.items.reduce(
        (total, pizza) => total + pizza.price * pizza.quantity,
        0
      )
    },
  },
})

export const { addPizza, removePizza } = cartSlice.actions
export default cartSlice.reducer
