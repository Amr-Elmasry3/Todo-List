// Import Css file
import "../css/home.css";

// Import Componenets
import AddTodo from "./AddTodo";
import Details from "./Details";

// Import UuseEffect Hook
import { useEffect, useState } from "react";

// Import Function From Slices
import { useSelector, useDispatch } from "react-redux";
import {
  closeHomePage,
  getDirectionFromLocalStorage,
  openChangeInfoPage,
  setDirection,
  setDirectionInLocalstorage,
} from "../features/PagesStateSlice";
import {
  setCategoryDetails,
  setSelectedTasks,
  setDataInLocalStorage,
  getDataFromLocalStorage,
} from "../features/TodosSlice";
import { setOldName } from "../features/UserInfoSlice";

// Import Categories Img
import personImg from "../assets/boy.png";
import workImg from "../assets/briefcase.png";
import educationImg from "../assets/education.png";
import shoppingImg from "../assets/shopping.png";
import healthcareImg from "../assets/healthcare.png";

// Import i18next Hoook
import { useTranslation } from "react-i18next";

export default function Home() {
  const [language, setLanguage] = useState("en");

  const { t, i18n } = useTranslation();

  // Get Direction From Local Storage
  useEffect(() => {
    dispatch(getDirectionFromLocalStorage());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Get Data From local Storage
  useEffect(() => {
    dispatch(getDataFromLocalStorage());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Get Data From PagesStateSlice File
  const openHomePage = useSelector((choose) => {
    return choose.pagesState.openHomePage;
  });

  // Get Data From TodosSlice File
  const countTasks = useSelector((choose) => {
    return choose.todos.countTasks;
  });

  // Get Data From UserInfoSlice File
  const userInfo = useSelector((choose) => {
    return choose.userInfo;
  });

  // Get Direction From PagesStateSlice File
  const direction = useSelector((choose) => {
    return choose.pagesState.directionOfPages;
  });

  const dispatch = useDispatch();

  // Array Of All Categories
  const categoriesImg = [
    {
      id: 1,
      src: personImg,
      title: "Personal",
      countTasks: countTasks.countPersonalTasks,
    },
    {
      id: 2,
      src: workImg,
      title: "Work",
      countTasks: countTasks.countWorkTasks,
    },
    {
      id: 3,
      src: educationImg,
      title: "Education",
      countTasks: countTasks.countEducationTasks,
    },
    {
      id: 4,
      src: shoppingImg,
      title: "Shopping",
      countTasks: countTasks.countShoppingTasks,
    },
    {
      id: 5,
      src: healthcareImg,
      title: "Healthcare",
      countTasks: countTasks.countHealthcareTasks,
    },
  ];

  // List From Array Of All Categories
  const categoriesImgList = categoriesImg.map((cate) => {
    return (
      <div
        className={"details-box"}
        key={cate.id}
        onClick={() => {
          dispatch(closeHomePage());
          dispatch(
            setCategoryDetails({
              src: cate.src,
              title: t(cate.title),
              countTasks: cate.countTasks,
            })
          );
          dispatch(setSelectedTasks());
          dispatch(setDataInLocalStorage());
        }}
      >
        <Details
          src={cate.src}
          title={cate.title}
          countTasks={cate.countTasks}
        />
      </div>
    );
  });

  return (
    <div className={openHomePage ? "home open" : "home"}>
      <div className={"language-edit"}>
        <span
          className={"language"}
          onClick={() => {
            if (language === "en") {
              setLanguage("ar");
              i18n.changeLanguage("ar");
              dispatch(setDirection({ direction: "rtl" }));
            } else if (language === "ar") {
              setLanguage("en");
              i18n.changeLanguage("en");
              dispatch(setDirection({ direction: "ltr" }));
            }
            dispatch(setDirectionInLocalstorage());
          }}
        >
          {t("Arabic")}
        </span>
        <span
          className={"edit"}
          onClick={() => {
            dispatch(openChangeInfoPage());
            dispatch(setOldName({ oldName: userInfo.name }));
          }}
        >
          {t("Change Info")}
        </span>
      </div>

      <div className={"user-info"}>
        <div className={"name-and-count-tasks"}>
          <span className={"name"}>
            {t("Hello")} {userInfo.name}
          </span>
          <p className={"count-tasks"}>
            {direction === "ltr"
              ? "Today You Have " + countTasks.countAllTasks + " Task"
              : direction === "rtl" && countTasks.countAllTasks <= 10
              ? t("Today You Have") +
                " " +
                countTasks.countAllTasks +
                " " +
                "مهام"
              : t("Today You Have") +
                " " +
                countTasks.countAllTasks +
                " " +
                "مهمة"}
          </p>
        </div>
        <img src={userInfo.imgSrc} alt="" />
      </div>

      <div className={"categories"}>{categoriesImgList}</div>

      <AddTodo />
    </div>
  );
}
