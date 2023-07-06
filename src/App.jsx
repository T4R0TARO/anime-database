import AnimeItem from "./components/AnimeItem";
import Homepage from "./components/Homepage";
import Gallery from "./components/Gallery";
import VoiceActor from "./components/VoiceActor";
import Watchlist from "./components/Watchlist";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <BrowserRouter basename="/anime-database/">
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/anime/:id/" element={<AnimeItem />} />
        <Route path="/character/:id/" element={<Gallery />} />
        <Route path="/people/:id/" element={<VoiceActor />} />
        <Route path="/mywatchlist/" element={<Watchlist />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
