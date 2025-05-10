// Import Css File
import "../css/login.css";

// Import Matrial Ui Icon
import AddIcon from "@mui/icons-material/Add";

// Import UseRef Hook
import { useRef } from "react";

// Import Functions From Different Slices
import { useSelector, useDispatch } from "react-redux";
import { closeLoginPage } from "../features/PagesStateSlice";
import {
  setUserName,
  setUserImg,
  checkError,
  setUserInfoInLoacalStorage,
} from "../features/UserInfoSlice";

export default function Login() {
  // Use This Hook To Connect Between Click On Photo And File input
  const inputRef = useRef(null);

  // Get Data From PagesStateSlice File
  const openLoginPage = useSelector((choose) => {
    return choose.pagesState.openLoginPage;
  });

  // Get Data From UserInfoSlice File
  const userInfo = useSelector((choose) => {
    return choose.userInfo;
  });

  const dispatch = useDispatch();

  return (
    <div className={openLoginPage ? "login open" : "login"}>
      <h2>Set Name & Picture</h2>
      <div
        className={"photo"}
        onClick={() => {
          inputRef.current.click();
        }}
      >
        <img src={userInfo.imgSrc} alt="" />
        <AddIcon className={"icon"} />
      </div>
      <input
        className="file"
        type="file"
        ref={inputRef}
        onChange={(eve) => {
          const file = eve.target.files[0];
          if (file) {
            const reader = new FileReader();
            reader.onload = () => {
              const result = reader.result;
              dispatch(setUserImg({ src: result }));
            };
            reader.readAsDataURL(file);
          }
        }}
      />
      <input
        className={userInfo.error ? "name error" : "name"}
        type="text"
        placeholder="Enter Name"
        value={userInfo.name}
        onChange={(eve) => {
          dispatch(checkError({ error: false }));
          dispatch(setUserName({ name: eve.target.value }));
        }}
      />
      <button
        onClick={() => {
          if (userInfo.name !== "") {
            dispatch(closeLoginPage());
            dispatch(setUserInfoInLoacalStorage());
          } else {
            dispatch(checkError({ error: true }));
          }
        }}
      >
        Login
      </button>
    </div>
  );
}
