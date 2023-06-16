import Popular from "./components/Popular";
import { useGlobalContext } from "./context/Global";
import { BrowserRouter } from "react-router-dom";
import "./App.css";

function App() {
  const global = useGlobalContext();
  // console.log(global);

  return (
    <BrowserRouter>
      <div className="App">
        <Popular />
      </div>
    </BrowserRouter>
  );
}

export default App;
