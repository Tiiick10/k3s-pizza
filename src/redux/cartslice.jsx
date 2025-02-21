import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addPizza: (state, action) => {
      state.items.push(action.payload);
      state.totalPrice += action.payload.price;
    },
    removePizza: (state, action) => {
      const index = state.items.findIndex(p => p.id === action.payload);
      if (index !== -1) {
        state.totalPrice -= state.items[index].price;
        state.items.splice(index, 1);
      }
    },
  },
});

export const { addPizza, removePizza } = cartSlice.actions;
export default cartSlice.reducer;
