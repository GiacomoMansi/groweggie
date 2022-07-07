import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

//Creazione dello state e dellle azioni
import {
  setLocalStorageItem,
  getItemFromLocalStorage,
} from "../../utils/helpers";

//Qui dichiaro le variabili query(input) e le variabili per comporre la chiamata all'api
//in cui oltreuttto restituisco solo ricette vegetariane
const path = getItemFromLocalStorage("query")?.path || "";
const query = getItemFromLocalStorage("query")?.query || "";
const api = `${process.env.REACT_APP_SPOONCULAR_API}`;
const apiKey = `${process.env.REACT_APP_SPOONCULAR_KEY}`;
const apiFinalUrl = "&diet=vegetarian&addRecipeInformation=true";

//Dichiaro uno stato iniziale con loading true, un array in cui andrà il response
//ed inoltre salvo il valore dell'input(query) per potere restituire all'utente la stessa
//schermata di quando avvia la ricerca
const initialState = {
  loading: true,
  error: {
    status: false,
    message: "",
  },
  recipes: [],
  query: {
    path: path || "",
    query: query || "spaghetti",
  },
};

const isQuerySaved = (action) => {
  return action.type.endsWith("/saveQuery");
};

export const recipeSlice = createSlice({
  name: "recipes",
  initialState,
  reducers: {
    startLoading: (state) => {
      state.loading = true;
      state.recipes = [];
    },
    stopLoading: (state) => {
      state.loading = false;
    },
    saveData: (state, action) => {
      state.recipes = action.payload;
    },
    saveQuery: (state, action) => {
      state.query = { ...action.payload };
    },
    catchError: (state, action) => {
      state.error.status = true;
      state.error.message = action.payload;
      state.recipes = [];
    },
    cleanError: (state) => {
      state.error.status = false;
      state.error.message = "";
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(isQuerySaved, (state) => {
      setLocalStorageItem("query", state.query);
    });
  },
});

const {
  startLoading,
  stopLoading,
  saveData,
  saveQuery,
  cleanError,
  catchError,
} = recipeSlice.actions;

const { reducer } = recipeSlice;
//Chiamata all'api in cui gestisco l'errore nel caso il response non dia risultati
export const fetchData = (path) => async (dispatch, getState) => {
  dispatch(startLoading());
  dispatch(cleanError());
  try {
    const response = await axios.get(
      `${api}apiKey=${apiKey}${path}${apiFinalUrl}`
    );
    dispatch(saveData(response.data.results));
    if (response?.data?.results.length === 0) {
      dispatch(catchError(["No results, Try with another recipe"]));
    }
  } catch (error) {
    dispatch(catchError(error.errors));
  }
  dispatch(stopLoading());
};

export { catchError, cleanError, saveQuery };

export default reducer;
