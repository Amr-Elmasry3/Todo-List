import { createSlice } from "@reduxjs/toolkit";

export const AddTodoStateSlice = createSlice({
  name: "addTodoState",
  initialState: {
    state: false,
  },
  reducers: {
    openTodoForm: (currentState) => {
      currentState.state = true;
    },
    closeTodoForm: (currentState) => {
      currentState.state = false;
    },
  },
});

export const { openTodoForm, closeTodoForm } = AddTodoStateSlice.actions;

export default AddTodoStateSlice.reducer;
