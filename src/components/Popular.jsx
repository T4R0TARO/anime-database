import React from "react";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../context/Global";
import "../styles/Popular.css";

export default function Popular() {
  const { popularAnime, isSearch } = useGlobalContext();
  // console.log(popularAnime);

  const conditionalRender = () => {
    if (!isSearch) {
      return popularAnime.map((anime) => {
        return (
          <Link to={`/anime/${anime.mal_id}`} key={anime.mal_id}>
            <img src={anime.images.jpg.large_image_url} alt="anime image" />
          </Link>
        );
      });
    }
  };

  return (
    <div className="popular-container">
      <div className="popular-anime">{conditionalRender()}</div>
    </div>
  );
}
