import React from "react";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../context/Global";
import "../styles/Airing.css";
import Sidebar from "./Sidebar";

export default function Airing({ rendered }) {
  const { airingAnime, isSearch, searchResults } = useGlobalContext();

  const conditionalRender = () => {
    if (!isSearch && rendered === "airing") {
      return airingAnime.map((anime) => {
        return (
          <Link to={`/anime/${anime.mal_id}/`} key={anime.mal_id}>
            <img
              className="airing-image"
              src={anime.images.jpg.large_image_url}
              alt="anime image"
            />
          </Link>
        );
      });
    } else {
      return searchResults.map((anime) => {
        return (
          <Link to={`/anime/${anime.mal_id}/`} key={anime.mal_id}>
            <img src={anime.images.jpg.large_image_url} alt="anime image" />
          </Link>
        );
      });
    }
  };

  return (
    <div className="airing-container">
      <div className="airing-anime">{conditionalRender()}</div>
      <Sidebar />
    </div>
  );
}
