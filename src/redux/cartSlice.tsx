import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CartState {
  items: {
    ticketInfo: string;
    quantity: number;
    user: string;
  }[];
}

const initialState: CartState = {
  items: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems")!)
    : [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (
      state,
      action: PayloadAction<{
        ticketInfo: string;
        quantity: number;
        user: string;
      }>
    ) => {
      const newItem = action.payload;
      const existingItem = state.items.find(
        (item) => item.ticketInfo === newItem.ticketInfo
      );

      if (existingItem) {
        existingItem.quantity += newItem.quantity;
      } else {
        state.items.push(newItem);
      }

      // Save to local storage
      localStorage.setItem("cartItems", JSON.stringify(state.items));
    },
    removeItem: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(
        (item) => item.ticketInfo !== action.payload
      );

      // Save to local storage
      localStorage.setItem("cartItems", JSON.stringify(state.items));
    },
    updateQuantity: (
      state,
      action: PayloadAction<{ ticketInfo: string; quantity: number }>
    ) => {
      const { ticketInfo, quantity } = action.payload;
      const itemToUpdate = state.items.find(
        (item) => item.ticketInfo === ticketInfo
      );
      if (itemToUpdate) {
        itemToUpdate.quantity = quantity;
      }

      // Save to local storage
      localStorage.setItem("cartItems", JSON.stringify(state.items));
    },
    clearCart: (state) => {
      state.items = [];
      localStorage.removeItem("cartItems");
    },
  },
});
