import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Category = {
  id: string;
  title: string;
};

type State = {
  categories: Category[];
};

const initialState: State = {
  categories: [],
};

export const categoriesSlice = createSlice({
  name: "categoriesSlice",
  initialState,
  reducers: {
    addCategory: (state, action: PayloadAction<Category>) => {
      state.categories = [...state.categories, action.payload];
    },
    removeCategory: (state, action: PayloadAction<string>) => {
      state.categories = state.categories.filter((category) => {
        return category.id != action.payload;
      });
    },
  },
});

export const { addCategory, removeCategory } = categoriesSlice.actions;
