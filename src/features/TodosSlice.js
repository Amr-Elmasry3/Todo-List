import { createSlice } from "@reduxjs/toolkit";

export const TodosSlice = createSlice({
  name: "todos",
  initialState: {
    todosData: [],
    countTasks: {
      countPersonalTasks: 0,
      countWorkTasks: 0,
      countEducationTasks: 0,
      countShoppingTasks: 0,
      countHealthcareTasks: 0,
      countAllTasks: 0,
    },
    categoryDetails: {
      src: null,
      title: "",
      countTasks: 0,
    },
    selectedTasks: [],
  },
  reducers: {
    setCategoryDetails: (currentState, action) => {
      currentState.categoryDetails.src = action.payload.src;
      currentState.categoryDetails.title = action.payload.title;
      if (
        action.payload.title === "Personal" ||
        action.payload.title === "الشخصية"
      ) {
        currentState.categoryDetails.countTasks =
          currentState.countTasks.countPersonalTasks;
      } else if (
        action.payload.title === "Work" ||
        action.payload.title === "العمل"
      ) {
        currentState.categoryDetails.countTasks =
          currentState.countTasks.countWorkTasks;
      } else if (
        action.payload.title === "Education" ||
        action.payload.title === "التعليم"
      ) {
        currentState.categoryDetails.countTasks =
          currentState.countTasks.countEducationTasks;
      } else if (
        action.payload.title === "Shopping" ||
        action.payload.title === "التسوق"
      ) {
        currentState.categoryDetails.countTasks =
          currentState.countTasks.countShoppingTasks;
      } else if (
        action.payload.title === "Healthcare" ||
        action.payload.title === "الصحة"
      ) {
        currentState.categoryDetails.countTasks =
          currentState.countTasks.countHealthcareTasks;
      }
    },
    setSelectedTasks: (currentState) => {
      // eslint-disable-next-line array-callback-return
      currentState.selectedTasks = currentState.todosData.filter((todo) => {
        const category = currentState.categoryDetails.title;
        if (category === "Personal" || category === "الشخصية") {
          return todo.category === "Personal" || todo.category === "الشخصية";
        } else if (category === "Work" || category === "العمل") {
          return todo.category === "Work" || todo.category === "العمل";
        } else if (category === "Education" || category === "التعليم") {
          return todo.category === "Education" || todo.category === "التعليم";
        } else if (category === "Shopping" || category === "التسوق") {
          return todo.category === "Shopping" || todo.category === "التسوق";
        } else if (category === "Healthcare" || category === "الصحة") {
          return todo.category === "Healthcare" || todo.category === "الصحة";
        }
      });
    },
    turnCategoriesLanguage: (currentState, action) => {
      currentState.todosData = action.payload.newTodos;
    },
    addTodo: (currentState, action) => {
      if (action.payload.title !== "") {
        currentState.todosData.push(action.payload);
        if (
          action.payload.category === "Personal" ||
          action.payload.category === "الشخصية"
        ) {
          currentState.countTasks.countPersonalTasks += 1;
        } else if (
          action.payload.category === "Work" ||
          action.payload.category === "العمل"
        ) {
          currentState.countTasks.countWorkTasks += 1;
        } else if (
          action.payload.category === "Education" ||
          action.payload.category === "التعليم"
        ) {
          currentState.countTasks.countEducationTasks += 1;
        } else if (
          action.payload.category === "Shopping" ||
          action.payload.category === "التسوق"
        ) {
          currentState.countTasks.countShoppingTasks += 1;
        } else if (
          action.payload.category === "Healthcare" ||
          action.payload.category === "الصحة"
        ) {
          currentState.countTasks.countHealthcareTasks += 1;
        }
        currentState.countTasks.countAllTasks += 1;
      }
    },
    finishedTodo: (currentState, action) => {
      // eslint-disable-next-line array-callback-return
      currentState.todosData.map((todo) => {
        if (todo.id === action.payload.id) {
          todo.finished = !todo.finished;
        }
      });
    },
    deleteTodo: (currentState, action) => {
      // eslint-disable-next-line array-callback-return
      currentState.todosData.map((todo, index) => {
        if (todo.id === action.payload.id) {
          currentState.todosData.splice(index, 1);
        }
      });
      if (
        action.payload.category === "Personal" ||
        action.payload.category === "الشخصية"
      ) {
        currentState.countTasks.countPersonalTasks -= 1;
      } else if (
        action.payload.category === "Work" ||
        action.payload.category === "العمل"
      ) {
        currentState.countTasks.countWorkTasks -= 1;
      } else if (
        action.payload.category === "Education" ||
        action.payload.category === "التعليم"
      ) {
        currentState.countTasks.countEducationTasks -= 1;
      } else if (
        action.payload.category === "Shopping" ||
        action.payload.category === "التسوق"
      ) {
        currentState.countTasks.countShoppingTasks -= 1;
      } else if (
        action.payload.category === "Healthcare" ||
        action.payload.category === "الصحة"
      ) {
        currentState.countTasks.countHealthcareTasks -= 1;
      }
      currentState.countTasks.countAllTasks -= 1;
    },
    setDataInLocalStorage: (currentState) => {
      localStorage.setItem("todosData", JSON.stringify(currentState));
    },
    getDataFromLocalStorage: (currentState) => {
      if (localStorage.getItem("todosData")) {
        const data = JSON.parse(localStorage.getItem("todosData"));
        currentState.todosData = data.todosData;
        currentState.countTasks = data.countTasks;
        currentState.categoryDetails = data.categoryDetails;
        currentState.selectedTasks = data.selectedTasks;
      }
    },
    deleteDataFromLocalStorage: (currentState) => {
      localStorage.removeItem("todosData");
      currentState.todosData = [];
      currentState.countTasks = {
        countPersonalTasks: 0,
        countWorkTasks: 0,
        countEducationTasks: 0,
        countShoppingTasks: 0,
        countHealthcareTasks: 0,
        countAllTasks: 0,
      };
      currentState.categoryDetails = {
        src: null,
        title: "",
        countTasks: 0,
      };
      currentState.selectedTasks = [];
    },
  },
});

export const {
  setCategoryDetails,
  setSelectedTasks,
  turnCategoriesLanguage,
  addTodo,
  finishedTodo,
  deleteTodo,
  setDataInLocalStorage,
  getDataFromLocalStorage,
  deleteDataFromLocalStorage,
} = TodosSlice.actions;

export default TodosSlice.reducer;
