// Import Css File
import "../css/addTodo.css";

// Import Material Ui Icon
import AddIcon from "@mui/icons-material/Add";

// Import Functions From Different Slices
import { useDispatch } from "react-redux";
import { openTodoForm } from "../features/AddTodoStateSlice";

export default function AddTodo() {
  const dispatch = useDispatch();

  return (
    <>
      <div
        className={"add-todo"}
        onClick={() => {
          dispatch(openTodoForm());
        }}
      >
        <AddIcon className={"icon"} />
      </div>
    </>
  );
}
