import { createSlice } from "@reduxjs/toolkit";
import { ProductsPageState } from "../../../lib/types/screen";

const initialState: ProductsPageState = {
  restuarant: null,
  chosenProduct: null,
  products: [],
};

const productsPageSlice = createSlice({
  name: "productsPage",
  initialState,
  reducers: {
    setRestaurant: (state, action) => {
      state.restuarant = action.payload;
    },

    setChosenProduct: (state, action) => {
      state.chosenProduct = action.payload;
    },

    setProducts: (state, action) => {
      state.products = action.payload;
    },
  },
});

export const { setRestaurant, setChosenProduct, setProducts } =
  productsPageSlice.actions;

const ProductsPageReducer = productsPageSlice.reducer;
export default ProductsPageReducer;
