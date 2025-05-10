import "./App.css";
import MainBox from "./components/MainBox";
import DeletePop from "./components/DeletePop";
import { useSelector } from "react-redux";

function App() {
  const direction = useSelector((choose) => {
    return choose.pagesState.directionOfPages;
  });

  return (
    <div className="app" style={{ direction: direction }}>
      <MainBox />
      <DeletePop />
    </div>
  );
}

export default App;
