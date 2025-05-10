import { createSlice } from "@reduxjs/toolkit";

export const PagesStateSlice = createSlice({
  name: "pagesState",
  initialState: {
    openGetStartPage: true,
    openLoginPage: false,
    openHomePage: false,
    openShowTodosPage: false,
    openChangeInfoPage: false,
    openUpdateTodoPage: false,
    directionOfPages: "ltr",
  },
  reducers: {
    closeGetStatePage: (currentState) => {
      currentState.openGetStartPage = false;
      currentState.openLoginPage = true;
    },
    closeLoginPage: (currentState) => {
      currentState.openLoginPage = false;
      currentState.openHomePage = true;
    },
    closeHomePage: (currentState) => {
      currentState.openHomePage = false;
      currentState.openShowTodosPage = true;
    },
    closeShowTodosPage: (currentState) => {
      currentState.openShowTodosPage = false;
      currentState.openHomePage = true;
    },
    openChangeInfoPage: (currentState) => {
      currentState.openChangeInfoPage = true;
    },
    closeChangeInfoPage: (currentState) => {
      currentState.openChangeInfoPage = false;
    },
    openUpdateTodoPage: (currentState) => {
      currentState.openUpdateTodoPage = true;
    },
    closeUpdateTodoPage: (currentState) => {
      currentState.openUpdateTodoPage = false;
    },
    resetPagesStateAfterDeleteData: (currentState) => {
      currentState.openGetStartPage = true;
      currentState.openLoginPage = false;
      currentState.openHomePage = false;
      currentState.openShowTodosPage = false;
      currentState.openChangeInfoPage = false;
      currentState.openUpdateTodoPage = false;
      currentState.directionOfPages = "ltr";
    },
    setDirection: (currentState, action) => {
      currentState.directionOfPages = action.payload.direction;
    },
    setDirectionInLocalstorage: (currentState) => {
      localStorage.setItem("directionOfPages", currentState.directionOfPages);
    },
    getDirectionFromLocalStorage: (currentState) => {
      if (localStorage.getItem("directionOfPages")) {
        currentState.directionOfPages =
          localStorage.getItem("directionOfPages");
      }
    },
  },
});

export const {
  closeGetStatePage,
  closeLoginPage,
  closeHomePage,
  closeShowTodosPage,
  openChangeInfoPage,
  closeChangeInfoPage,
  openUpdateTodoPage,
  closeUpdateTodoPage,
  resetPagesStateAfterDeleteData,
  setDirection,
  setDirectionInLocalstorage,
  getDirectionFromLocalStorage,
} = PagesStateSlice.actions;

export default PagesStateSlice.reducer;
