import React, { useState } from "react";
import Popular from "./Popular";
import { useGlobalContext } from "../context/Global";

export default function Homepage() {
  const [rendered, setRendered] = useState("popular");

  const switchComponents = () => {
    switch (rendered) {
      case "popular":
        return <Popular rendered={rendered} />;
      default:
        return <Popular rendered={rendered} />;
    }
  };

  return (
    <div className="Homepage">
      <h1>Homepage</h1>
      <header>
        <div className="logo">
          <h1>
            {rendered === "popular"
              ? "Popular Anime"
              : rendered === "airing"
              ? "Airing Anime"
              : "Upcoming Anime"}
          </h1>
          {/* SEARCH BAR */}
          <div className="search-container">
            {/* popular button */}
            {/* search form */}
            {/* airing button */}
            {/* upcoming button */}
          </div>
        </div>
      </header>
      {switchComponents()}
    </div>
  );
}
