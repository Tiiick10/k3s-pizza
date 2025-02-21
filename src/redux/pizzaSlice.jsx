import { createSlice } from "@reduxjs/toolkit";
import pizzas from "../data/pizzas.json";

const pizzaSlice = createSlice({
  name: "pizza",
  initialState: {
    list: pizzas,
    filter: "all",
    sort: "asc",
  },
  reducers: {
    setSort: (state, action) => {
      state.sort = action.payload;
      state.list.sort((a, b) =>
        state.sort === "asc" ? a.price - b.price : b.price - a.price
      );
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
  },
});

export const { setSort, setFilter } = pizzaSlice.actions;
export default pizzaSlice.reducer;
