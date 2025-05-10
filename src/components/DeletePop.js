// Import Css File
import "../css/deletePop.css";

// Import Functions From Different Slices
import { useSelector, useDispatch } from "react-redux";
import { closeDeletePop } from "../features/DeletePopSlice";
import {
  setCategoryDetails,
  setSelectedTasks,
  deleteTodo,
  setDataInLocalStorage,
} from "../features/TodosSlice";

// Import i18next Hoook
import { useTranslation } from "react-i18next";

export default function DeletePop({ state, handleState, id }) {
  const { t } = useTranslation();

  // Get Data From DeletePopSlice File
  const openDeletePop = useSelector((choose) => {
    return choose.deletePop.state;
  });

  const data = useSelector((choose) => {
    return choose.deletePop.data;
  });

  // Get Data From TodosSlice File
  const categoryDetails = useSelector((choose) => {
    return choose.todos.categoryDetails;
  });

  const dispatch = useDispatch();

  // Types Of Button
  let deletePopButtons = [
    { id: 1, btnName: "Ok" },
    { id: 2, btnName: "Cancel" },
  ];

  // List For Types Of Button
  let deletePopButtonsList = deletePopButtons.map((btn) => {
    return (
      <button
        key={btn.id}
        onClick={() => {
          if (btn.btnName === "Ok") {
            dispatch(deleteTodo(data));
            dispatch(setCategoryDetails(categoryDetails));
            dispatch(setSelectedTasks());
            dispatch(setDataInLocalStorage());
          }
          dispatch(closeDeletePop());
        }}
      >
        {t(btn.btnName)}
      </button>
    );
  });

  return (
    <>
      <div className={openDeletePop ? "delete-pop open" : "delete-pop"}>
        <div className={"container"}>
          <p>{t("Are you sure about the deletion?")}</p>
          <div className={"btns"}>{deletePopButtonsList}</div>
        </div>
      </div>
    </>
  );
}
