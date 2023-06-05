

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { CategoriesType, UpdateCategoriesType } from "../types/categories";

export interface CategoryState {
  categories: CategoriesType[];
}

const initialState: CategoryState = {
  categories: [],
};

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    addCategory: (state, action: PayloadAction<CategoriesType>) => {
      state.categories.push(action.payload);
    },
    deleteCategory: (state, action: PayloadAction<number>) => {
      state.categories.splice(action.payload, 1);
    },

    updateCategory: (state, action: PayloadAction<UpdateCategoriesType>) => {
      state.categories[action.payload.index] = action.payload.categoryObj;
    },
  },
});

export const { addCategory, updateCategory, deleteCategory } = categoriesSlice.actions;
export default categoriesSlice.reducer;
