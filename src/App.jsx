import Popular from "./components/Popular";
import AnimeItem from "./components/AnimeItem";
import Homepage from "./components/Homepage";
import { useGlobalContext } from "./context/Global";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="anime-database/" element={<Popular />} /> */}
        <Route path="anime-database/" element={<Homepage />} />
        <Route path="/anime/:id" element={<AnimeItem />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
