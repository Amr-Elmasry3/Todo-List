import { createSlice } from "@reduxjs/toolkit";

export const DeletePopSlice = createSlice({
  name: "deletePop",
  initialState: {
    state: false,
    data: {},
  },
  reducers: {
    openDeletePop: (currentState) => {
      currentState.state = true;
    },
    closeDeletePop: (currentState) => {
      currentState.state = false;
    },
    getData: (currentState, action) => {
      currentState.data = action.payload;
    },
  },
});

export const { openDeletePop, closeDeletePop, getData } =
  DeletePopSlice.actions;

export default DeletePopSlice.reducer;
