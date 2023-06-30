import AnimeItem from "./components/AnimeItem";
import Homepage from "./components/Homepage";
import Gallery from "./components/Gallery";
import VoiceActor from "./components/VoiceActor";
import WatchList from "./components/WatchList";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="anime-database/" element={<Homepage />} />
        <Route path="/anime/:id" element={<AnimeItem />} />
        <Route path="/character/:id" element={<Gallery />} />
        <Route path="/people/:id" element={<VoiceActor />} />
        <Route path="/mywatchlist" element={<WatchList />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
