import React, { useState } from "react";
import Popular from "./Popular.jsx";
import Upcoming from "./Upcoming.jsx";
import Airing from "./Airing.jsx";
import { useGlobalContext } from "../context/Global.jsx";
import "../styles/Homepage.css";

export default function Homepage() {
  const {
    handleChange,
    search,
    handleSubmit,
    searchAnime,
    getPopularAnime,
    getUpcomingAnime,
    getAiringAnime,
    isSearch,
    searchResults,
  } = useGlobalContext();

  const [rendered, setRendered] = useState("popular");
  // console.log(rendered);

  const switchComponents = () => {
    switch (rendered) {
      case "popular":
        return <Popular rendered={rendered} />;
      case "airing":
        return <Airing rendered={rendered} />;
      case "upcoming":
        return <Upcoming rendered={rendered} />;
      default:
        return <Popular rendered={rendered} />;
    }
  };

  return (
    <div className="Homepage">
      <header>
        <div className="logo">
          <h1>
            {rendered === "popular"
              ? "Popular Anime"
              : rendered === "airing"
              ? "Airing Anime"
              : "Upcoming Anime"}
          </h1>
        </div>
        {/* SEARCH BAR */}
        <div className="search-container">
          {/* popular button */}
          <div className="filter-btn popular-filter">
            <button
              onClick={() => {
                setRendered("popular");
              }}
            >
              Popular
            </button>
          </div>
          {/* search form */}
          <form action="" className="search-form" onSubmit={handleSubmit}>
            <div className="input-control">
              <input
                type="text"
                placeholder="Search Anime"
                value={search}
                onChange={handleChange}
              />
              <button type="submit">Search</button>
              <div className="search-results-count">
                {isSearch && (
                  <p>
                    {searchResults.length === 0 ? "No" : searchResults.length}{" "}
                    Results Found
                  </p>
                )}
              </div>
            </div>
          </form>
          {/* airing button */}
          <div className="filter-btn airing-filter">
            <button
              onClick={() => {
                setRendered("airing");
                getAiringAnime();
              }}
            >
              Airing
            </button>
          </div>
          {/* upcoming button */}
          <div className="filter-btn upcoming-filter">
            <button
              onClick={() => {
                setRendered("upcoming");
                getUpcomingAnime();
              }}
            >
              Upcoming
            </button>
          </div>
        </div>
      </header>
      {/* Display Data Content */}
      {switchComponents()}
    </div>
  );
}
