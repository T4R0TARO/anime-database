import React from "react";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../context/Global";
import "../styles/Upcoming.css";
import Sidebar from "./Sidebar";

export default function Upcoming({ rendered }) {
  const { upcomingAnime, isSearch, searchResults } = useGlobalContext();

  const conditionalRender = () => {
    if (!isSearch && rendered === "upcoming") {
      return upcomingAnime.map((anime) => {
        return (
          <Link to={`/anime/${anime.mal_id}`} key={anime.mal_id}>
            <img
              className="upcoming-image"
              src={anime.images.jpg.large_image_url}
              alt="anime image"
            />
          </Link>
        );
      });
    } else {
      return searchResults.map((anime) => {
        return (
          <Link to={`/anime/${anime.mal_id}`} key={anime.mal_id}>
            <img src={anime.images.jpg.large_image_url} alt="anime image" />
          </Link>
        );
      });
    }
  };

  return (
    <div className="upcoming-container">
      <div className="upcoming-anime">{conditionalRender()}</div>
      <Sidebar />
    </div>
  );
}
