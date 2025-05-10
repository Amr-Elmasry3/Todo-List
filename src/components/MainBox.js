// Import Css File
import "../css/mainBox.css";

// Import Componenets
import GetStartPage from "./GetStartPage";
import Login from "./Login";
import Home from "./Home";
import ShowTodosPage from "./ShowTodosPage";
import AddTodoForm from "./AddTodoForm";
import ChangeInfoPage from "./ChangeInfoPage";

// Import UseEffect HOOK
import { useEffect } from "react";

// Import Functions From Store And Slices
import { useDispatch } from "react-redux";
import { getUserInfoFromLocalStorage } from "../features/UserInfoSlice";
import { closeGetStatePage, closeLoginPage } from "../features/PagesStateSlice";

export default function MainBox() {
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem("userInfo")) {
      dispatch(getUserInfoFromLocalStorage());
      dispatch(closeGetStatePage());
      dispatch(closeLoginPage());
    }
  });

  return (
    <div className={"main-box"}>
      <GetStartPage />
      <Login />
      <Home />
      <ShowTodosPage />
      <AddTodoForm />
      <ChangeInfoPage />
    </div>
  );
}
