import { configureStore } from "@reduxjs/toolkit";
import todosReducer from "../features/TodosSlice";
import addTodoStateReducer from "../features/AddTodoStateSlice";
import pagesStateReducer from "../features/PagesStateSlice";
import userInfoReducer from "../features/UserInfoSlice";
import deletePopReducer from "../features/DeletePopSlice";

export default configureStore({
  reducer: {
    todos: todosReducer,
    addTodoState: addTodoStateReducer,
    pagesState: pagesStateReducer,
    userInfo: userInfoReducer,
    deletePop: deletePopReducer,
  },
});
