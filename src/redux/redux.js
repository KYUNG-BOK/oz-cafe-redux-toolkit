import { configureStore, createSlice } from '@reduxjs/toolkit';

import data from '../assets/data';

const menuSlice = createSlice({
  name: 'menu',
  initialState: data.menu,
  reducers: {
  },
});

// cart slice
const cartSlice = createSlice({
  name: 'cart',
  initialState: [],
  reducers: {
    addToCart: (state, action) => {
      // action.payload: 추가할 아이템 객체
      state.push(action.payload);
    },
    removeFromCart: (state, action) => {
      // action.payload: 제거할 아이템 id 
      return state.filter(item => item.id !== action.payload);
    },
    clearCart: () => {
      return [];
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;

const store = configureStore({
  reducer: {
    menu: menuSlice.reducer,
    cart: cartSlice.reducer,
  },
});

export default store;
