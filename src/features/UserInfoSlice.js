import basicImg from "../assets/boy.png";
import { createSlice } from "@reduxjs/toolkit";

export const UserInfoSlice = createSlice({
  name: "userInfo",
  initialState: {
    imgSrc: basicImg,
    name: "",
    error: false,
    oldName: "",
  },
  reducers: {
    setUserName: (currentState, action) => {
      currentState.name = action.payload.name;
    },
    setUserImg: (currentState, action) => {
      currentState.imgSrc = action.payload.src;
    },
    checkError: (currentState, action) => {
      currentState.error = action.payload.error;
    },
    setOldName: (currentState, action) => {
      currentState.oldName = action.payload.oldName;
    },
    setUserInfoInLoacalStorage: (currentState) => {
      localStorage.setItem("userInfo", JSON.stringify(currentState));
    },
    getUserInfoFromLocalStorage: (currentState) => {
      const userData = JSON.parse(localStorage.getItem("userInfo"));
      currentState.imgSrc = userData.imgSrc;
      currentState.name = userData.name;
      currentState.error = userData.error;
    },
    deleteUserInfoFromLocalStorage: (currentState) => {
      localStorage.removeItem("userInfo");
      currentState.imgSrc = basicImg;
      currentState.name = "";
      currentState.error = false;
    },
  },
});

export const {
  setUserName,
  setUserImg,
  checkError,
  setOldName,
  setUserInfoInLoacalStorage,
  getUserInfoFromLocalStorage,
  deleteUserInfoFromLocalStorage,
} = UserInfoSlice.actions;

export default UserInfoSlice.reducer;
