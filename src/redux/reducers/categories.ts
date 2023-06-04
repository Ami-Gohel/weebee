//

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { PURGE } from "redux-persist";

import { RootState } from "../store";
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
    // addCategoryItem: (state, action: PayloadAction<CategoriesType>) => {
    //   state.categories[action.payload.index]=.push(action.payload);
    // },
    deleteCategory: (state, action: PayloadAction<number>) => {
      state.categories.splice(action.payload, 1);
    },

    updateCategory: (state, action: PayloadAction<UpdateCategoriesType>) => {
      state.categories[action.payload.index] = action.payload.categoryObj;
      // state.categories.push(action.payload);
    },
  },
});

export const { addCategory, updateCategory, deleteCategory } = categoriesSlice.actions;
export default categoriesSlice.reducer;
