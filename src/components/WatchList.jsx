import React from "react";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../context/Global";
import "../styles/Watchlist.css";

export default function Watchlist() {
  const { myWatchlist, setMyWatchlist } = useGlobalContext();

  return (
    <div>
      <div className="back">
        <Link to={`/anime-database/`}>Back to Home</Link>
      </div>
      <h1>My Watchlist</h1>
      <div className="watchlist-container">{/* anime data */}</div>
    </div>
  );
}
