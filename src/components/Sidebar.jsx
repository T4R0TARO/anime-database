import React from "react";
import { useGlobalContext } from "../context/Global";
import { Link } from "react-router-dom";
import "../styles/Sidebar.css";

export default function Sidebar() {
  const { popularAnime } = useGlobalContext();
  const sortedPopularAnime = popularAnime.sort((a, b) => {
    return b.score - a.score;
  });
  return (
    <div className="Sidebar">
      <h3>Top 5 Popular</h3>
      <div className="sidebar-anime">
        {sortedPopularAnime.slice(0, 5).map((anime) => {
          return (
            <Link to={`/anime/${anime.mal_id}/`} key={anime.mal_id}>
              <img src={anime.images.jpg.large_image_url} alt="top anime" />
              <h5>{anime.title}</h5>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
