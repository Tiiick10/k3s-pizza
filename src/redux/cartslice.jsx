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
        existingPizza.quantity += pizza.quantity
      } else {
        state.items.push(pizza)
      }

      state.totalPrice = state.items.reduce(
        (total, pizza) => total + pizza.price * pizza.quantity,
        0
      )
    },
    removePizza: (state, action) => {
      const pizzaKey = action.payload
      state.items = state.items.filter(pizza => pizza.uniqueKey !== pizzaKey)
      state.totalPrice = state.items.reduce(
        (total, pizza) => total + pizza.price * pizza.quantity,
        0
      )
    },
  },
})

export const { addPizza, removePizza } = cartSlice.actions
export default cartSlice.reducer
