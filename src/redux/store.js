import { createSlice, configureStore } from "@reduxjs/toolkit";
import apiReducer from "./reducers/api-reducer";
import detailRecipeReducer from "./reducers/detailRecipe-reducer";

//Creazione dello store con i reducer al suo interno
const store = configureStore({
  reducer: {
    recipes: apiReducer,
    detailPage: detailRecipeReducer,
  },
});

export default store;
