import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartslice";
import pizzaReducer from "./pizzaSlice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    pizza: pizzaReducer,
  },
});
