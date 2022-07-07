import {
  setLocalStorageItem,
  getItemFromLocalStorage,
} from "../../utils/helpers";
import { createSlice, isAnyOf } from "@reduxjs/toolkit";

const isAddToDetialPageAction = (action) => {
  return action.type.endsWith("/AddToDetialPage");
};
const isDetailPageAction = (action) => {
  return isAnyOf(isAddToDetialPageAction)(action);
};

const localStorageDetailPage = getItemFromLocalStorage("detailPage");

const initialValue = {
  detailPage: localStorageDetailPage ? localStorageDetailPage : [],
};
export const detailPageSlice = createSlice({
  name: "detailPage",
  initialState: initialValue,
  reducers: {
    AddToDetialPage: (state, action) => {
      state.detailPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(isDetailPageAction, (state) => {
      setLocalStorageItem("detailPage", state.detailPage);
    });
  },
});
//Prendo ogni ricetta su cui clicca l'utente e tramite find() restitusico quella che corrisponde all'id
const addSingleElementToDetailPage = (item) => (dispatch, getState) => {
  const { detailPage } = getState().detailPage;
  if (detailPage.find((x) => x.id === item.id)) {
    return;
  }

  dispatch(AddToDetialPage(item));
};

export const { AddToDetialPage } = detailPageSlice.actions;

export { addSingleElementToDetailPage };

export default detailPageSlice.reducer;
