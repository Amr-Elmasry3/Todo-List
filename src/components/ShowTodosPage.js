// Import Css File
import "../css/showTodosPage.css";

// Import Components
import Details from "./Details";
import AddTodos from "./AddTodo";

// Import Functions From Different Slices
import { useSelector, useDispatch } from "react-redux";
import { closeShowTodosPage } from "../features/PagesStateSlice";
import {
  setSelectedTasks,
  finishedTodo,
  setDataInLocalStorage,
} from "../features/TodosSlice";
import { openDeletePop, getData } from "../features/DeletePopSlice";

// Import Matrial Ui Icons
import CheckIcon from "@mui/icons-material/Check";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

// Import i18next Hoook
import { useTranslation } from "react-i18next";

export default function ShowTodosPage() {
  const { t } = useTranslation();

  // Get Data From PageeStateSlice File
  const openShowTodosPage = useSelector((choose) => {
    return choose.pagesState.openShowTodosPage;
  });

  // Get Data From TodosSlice File
  const categoryDetails = useSelector((choose) => {
    return choose.todos.categoryDetails;
  });

  const arrayOfTodos = useSelector((choose) => {
    return choose.todos.selectedTasks;
  });

  const dispatch = useDispatch();

  // List Of Special Todos => Depends On Type Of Category That Clicked
  const arrayOfTodosList = arrayOfTodos.map((todo) => {
    return (
      <div className={"box"} key={todo.id}>
        <p>{todo.title}</p>
        <div className={"icons-box"}>
          <button
            className={todo.finished ? "check-icon finished" : "check-icon"}
            onClick={() => {
              dispatch(finishedTodo({ id: todo.id }));
              dispatch(setSelectedTasks());
              dispatch(setDataInLocalStorage());
            }}
          >
            <CheckIcon className={"icon"} />
          </button>
          <button
            className={"delete-icon"}
            onClick={() => {
              dispatch(openDeletePop());
              dispatch(getData({ id: todo.id, category: todo.category }));
              // The Deletion Done From Delete Pop
            }}
          >
            <DeleteForeverIcon className={"icon"} />
          </button>
        </div>
      </div>
    );
  });

  return (
    <div className={openShowTodosPage ? "show-todos open" : "show-todos"}>
      <div
        className={"back-icon"}
        onClick={() => {
          dispatch(closeShowTodosPage());
        }}
      >
        <button>{t("Home")}</button>
      </div>

      <div className={"details-box"}>
        <Details
          src={categoryDetails.src}
          title={categoryDetails.title}
          countTasks={categoryDetails.countTasks}
        />
      </div>

      <div className={"todos"}>{arrayOfTodosList}</div>

      <AddTodos className={"add-icon"} />
    </div>
  );
}
