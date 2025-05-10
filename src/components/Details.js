import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

export default function Details({ src, title, countTasks }) {
  const { t } = useTranslation();

  const direction = useSelector((choose) => {
    return choose.pagesState.directionOfPages;
  });

  return (
    <>
      <img src={src} alt="" />
      <div className={"details"}>
        <span className={"title"}>{t(title)}</span>
        <span className={"countTasks"}>
          {direction === "ltr"
            ? countTasks + " Task"
            : direction === "rtl" && countTasks <= 10
            ? countTasks + " مهام"
            : countTasks + " مهمة"}
        </span>
      </div>
    </>
  );
}
