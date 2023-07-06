import React from "react";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../context/Global";
import "../styles/Watchlist.css";

export default function Watchlist() {
  const { myWatchlist, setMyWatchlist, finishedAnimeMap, setFinishedAnimeMap } =
    useGlobalContext();

  /**toggleFinishedButton()
   * access state `finishedAnimeMap`
   * set `malId` as key in obj `finishedAnimeMap
   * set `!prevState[malId]` as value in obj `finishedAnimeMap`
   * @param {anime item unique ID} malId
   */
  const toggleFinishedButton = (malId) => {
    setFinishedAnimeMap((prevState) => ({
      ...prevState,
      [malId]: !prevState[malId],
    }));
  };

  /**removeFromList(malId)
   * removes items by referenceing anime id from `myWatchList` && `finishedAnimeMap`
   * updateItems: access state `myWatchlist` and keeps all items that do NOT have share the id that was clicked
   * `setFinishedAnimeMap`: removes item from obj `finishedAnimeMap` by clicked id
   * `setMyWatchList`: updates state `myWatchList` and changes values to `updatedItems`
   * @param {anime item unique id} malId
   */
  const removeFromList = (malId) => {
    // remove item from state `myWatchList`
    const updatedItems = myWatchlist.filter((item) => item.mal_id !== malId);

    // remove item from obj `finishedAnimeMap`
    setFinishedAnimeMap((prevState) => {
      const updatedState = { ...prevState };
      delete updatedState[malId];
      return updatedState;
    });

    setMyWatchlist(updatedItems);
  };

  return (
    <div className="Watchlist">
      <div className="back">
        <Link to={`/anime-database/`}>Back to Home</Link>
      </div>
      <h1>My Watchlist</h1>
      <div className="watchlist-container">
        {myWatchlist.map((anime) => {
          const malId = anime.mal_id;
          const isFinished = finishedAnimeMap[malId] || false;
          return (
            <div key={malId} className="watchlist-anime">
              <Link to={`/anime-database/anime/${malId}`}>
                <img src={anime.images.jpg.large_image_url} alt="anime image" />
              </Link>
              <div className="watchlist-buttons">
                <button
                  className="finished-anime"
                  style={{
                    background: isFinished ? "lightgreen" : "lightgray",
                  }}
                  onClick={() => toggleFinishedButton(malId)}
                >
                  Finished
                </button>
                <button
                  className="remove-from-list"
                  onClick={() => removeFromList(malId)}
                >
                  Remove
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
