// Import Css File
import "../css/addTodoForm.css";

// Import Matrial Ui Icon
import CloseIcon from "@mui/icons-material/Close";

// Import Function From Different Slices
import { useSelector, useDispatch } from "react-redux";
import { closeTodoForm } from "../features/AddTodoStateSlice";
import {
  addTodo,
  setCategoryDetails,
  setSelectedTasks,
  setDataInLocalStorage,
} from "../features/TodosSlice";

// Import UseState Hook
import { useState } from "react";

// Import Uuidv4 Library
import { v4 as uuidv4 } from "uuid";

// Import i18next Hoook
import { useTranslation } from "react-i18next";

export default function AddTodoForm() {
  const { t } = useTranslation();

  // Use UseState Hook
  const [formData, setFormData] = useState({
    title: "",
    category: t("Personal"),
  });

  // Get Data From AddTodoStateSlice File
  const openTodoForm = useSelector((choose) => {
    return choose.addTodoState.state;
  });

  // Get Data From TodosSlice File
  const categoryDetails = useSelector((choose) => {
    return choose.todos.categoryDetails;
  });

  const dispatch = useDispatch();

  return (
    <div className={openTodoForm ? "todo-form open" : "todo-form"}>
      <CloseIcon
        className={"close-icon"}
        onClick={() => {
          dispatch(closeTodoForm());
        }}
      />

      <div className={"container"}>
        <div className={"form-box"}>
          <input
            type="text"
            placeholder={t("Add Task")}
            value={formData.title}
            onChange={(eve) => {
              setFormData({ ...formData, title: eve.target.value });
            }}
          />
          <select
            value={formData.category}
            onChange={(eve) => {
              setFormData({ ...formData, category: t(eve.target.value) });
            }}
          >
            <option>{t("Personal")}</option>
            <option>{t("Work")}</option>
            <option>{t("Education")}</option>
            <option>{t("Shopping")}</option>
            <option>{t("Healthcare")}</option>
          </select>
        </div>

        <div className={"buttons"}>
          <button
            onClick={() => {
              dispatch(
                addTodo({
                  id: uuidv4(),
                  title: formData.title,
                  category: t(formData.category),
                  finished: false,
                })
              );
              dispatch(closeTodoForm());
              dispatch(setCategoryDetails(categoryDetails));
              dispatch(setSelectedTasks());
              dispatch(setDataInLocalStorage());

              setFormData({ title: "", category: t("Personal") });
            }}
          >
            {t("Add")}
          </button>
          <button
            onClick={() => {
              dispatch(closeTodoForm());
            }}
          >
            {t("Cancel")}
          </button>
        </div>
      </div>
    </div>
  );
}
