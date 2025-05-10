// Import Css File
import "../css/changeInfo.css";

// Import Matrial Ui Icon
import AddIcon from "@mui/icons-material/Add";

// Import UseRef Hook
import { useRef } from "react";

// Import Functions From Different Slices
import { useSelector, useDispatch } from "react-redux";
import {
  checkError,
  setUserImg,
  setUserName,
  setUserInfoInLoacalStorage,
  deleteUserInfoFromLocalStorage,
} from "../features/UserInfoSlice";
import { deleteDataFromLocalStorage } from "../features/TodosSlice";
import {
  closeChangeInfoPage,
  resetPagesStateAfterDeleteData,
  setDirectionInLocalstorage,
} from "../features/PagesStateSlice";

// Import i18next Hoook
import { useTranslation } from "react-i18next";

export default function ChangeInfoPage() {
  const { t, i18n } = useTranslation();

  // Use useRef Hook
  const inputRef = useRef(null);

  // Get Data From UserInfoSlice File
  const userInfo = useSelector((choose) => {
    return choose.userInfo;
  });

  // Get Data From PagesStateSlice File
  const openChangeInfoPage = useSelector((choose) => {
    return choose.pagesState.openChangeInfoPage;
  });

  const dispatch = useDispatch();

  return (
    <div className={openChangeInfoPage ? "change-info open" : "change-info"}>
      <div className={"container"}>
        <h3>{t("Update Info")}</h3>

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
          placeholder={t("Enter Name")}
          value={userInfo.name}
          onChange={(eve) => {
            dispatch(checkError({ error: false }));
            dispatch(setUserName({ name: eve.target.value }));
          }}
        />

        <div className={"btns"}>
          <button
            onClick={() => {
              if (userInfo.name !== "") {
                dispatch(closeChangeInfoPage());
                dispatch(setUserInfoInLoacalStorage());
              } else {
                dispatch(checkError({ error: true }));
              }
            }}
          >
            {t("Change")}
          </button>
          <button
            onClick={() => {
              if (userInfo.name === "") {
                dispatch(setUserName({ name: userInfo.oldName }));
              }
              dispatch(closeChangeInfoPage());
            }}
          >
            {t("Cancel")}
          </button>
        </div>

        <div className={"delete-section"}>
          <h3>{t("Delete Info & Tasks")}</h3>
          <button
            onClick={() => {
              dispatch(closeChangeInfoPage());
              dispatch(deleteUserInfoFromLocalStorage());
              dispatch(deleteDataFromLocalStorage());
              dispatch(resetPagesStateAfterDeleteData());
              dispatch(setDirectionInLocalstorage());
              i18n.changeLanguage("en");
            }}
          >
            {t("Delete")}
          </button>
        </div>
      </div>
    </div>
  );
}
