import AnimeItem from "./components/AnimeItem";
import Homepage from "./components/Homepage";
import Gallery from "./components/Gallery";
import VoiceActor from "./components/VoiceActor";
import Watchlist from "./components/Watchlist";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="anime-database/" element={<Homepage />} />
        <Route path="/anime-database/anime/:id" element={<AnimeItem />} />
        <Route path="/anime-database/character/:id" element={<Gallery />} />
        <Route path="/anime-database/people/:id" element={<VoiceActor />} />
        <Route path="/anime-database/mywatchlist" element={<Watchlist />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
