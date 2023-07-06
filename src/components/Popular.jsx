import React from "react";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../context/Global";
import "../styles/Popular.css";
import Sidebar from "./Sidebar";

export default function Popular({ rendered }) {
  const { popularAnime, isSearch, searchResults } = useGlobalContext();

  const conditionalRender = () => {
    if (!isSearch && rendered === "popular") {
      return popularAnime.map((anime) => {
        return (
          <Link to={`/anime-database/anime/${anime.mal_id}`} key={anime.mal_id}>
            <img
              className="popular-image"
              src={anime.images.jpg.large_image_url}
              alt="anime image"
            />
          </Link>
        );
      });
    } else {
      return searchResults.map((anime) => {
        return (
          <Link to={`/anime-database/anime/${anime.mal_id}`} key={anime.mal_id}>
            <img src={anime.images.jpg.large_image_url} alt="anime image" />
          </Link>
        );
      });
    }
  };

  return (
    <div className="popular-container">
      <div className="popular-anime">{conditionalRender()}</div>
      <Sidebar />
    </div>
  );
}
