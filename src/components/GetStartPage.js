// Import Css File
import "../css/getStartPage.css";

// Import Img
import getStartImg from "../assets/getStartPicture.png";

// Import Functions From Store And Slices
import { useSelector, useDispatch } from "react-redux";
import { closeGetStatePage } from "../features/PagesStateSlice";

export default function GetStartPage() {
  // Get Data From PagesStateSlice File
  const openGetStartPage = useSelector((choose) => {
    return choose.pagesState.openGetStartPage;
  });

  const dispatch = useDispatch();

  return (
    <div
      className={openGetStartPage ? "get-start-page open" : "get-start-page"}
    >
      <img src={getStartImg} alt="...." />
      <h3>Get Organized Your Life</h3>
      <p>
        This is a simple and effective to-do list and manager which helps you
        manage time
      </p>
      <button
        onClick={() => {
          dispatch(closeGetStatePage());
        }}
      >
        Get Started
      </button>
    </div>
  );
}
