import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useGlobalContext } from "../context/Global.jsx";
import Loader from "./Loader.jsx";
import "../styles/AnimeItem.css";

export default function AnimeItem() {
  const { id } = useParams();
  const { loading } = useGlobalContext();

  //state
  const [anime, setAnime] = useState([]);
  const [characters, setCharacters] = useState([]);
  const [showMore, setShowMore] = useState(false);

  // destructure anime
  const {
    title,
    title_japanese,
    synopsis,
    trailer,
    duration,
    aired,
    season,
    images,
    rank,
    score,
    scored_by,
    popularity,
    status,
    rating,
    source,
    studios,
  } = anime;

  //get anime by id
  const getAnime = async (anime) => {
    const response = await fetch(`https://api.jikan.moe/v4/anime/${anime}`);
    const data = await response.json();
    setAnime(data.data);
  };

  //get characters
  const getCharacters = async (anime) => {
    const response = await fetch(
      `https://api.jikan.moe/v4/anime/${anime}/characters`
    );
    const data = await response.json();
    setCharacters(data.data);
  };

  useEffect(() => {
    getAnime(id);
    getCharacters(id);
  }, []);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="anime-item-container">
          <div className="back">
            <Link to="/anime-database/">Back to Home</Link>
          </div>
          <div className="anime-card">
            <h1>{title}</h1>
            <h2>{title_japanese}</h2>
            <div className="details">
              <div className="image-details-container">
                <div className="image">
                  <img src={images?.jpg.large_image_url} alt="anime image" />
                </div>

                <div className="anime-details">
                  <p>
                    <span>Aired:</span>
                    <span>{aired?.string}</span>
                  </p>
                  <p>
                    <span>Rating:</span>
                    <span>{rating}</span>
                  </p>
                  <p>
                    <span>Rank:</span>
                    <span>{rank}</span>
                  </p>
                  <p>
                    <span>Score:</span>
                    <span className="score">
                      {score}{" "}
                      <p className="scored-by">
                        scored by {scored_by} reviewers
                      </p>
                    </span>
                  </p>
                  <p>
                    <span>Popularity:</span>
                    <span>{popularity}</span>
                  </p>
                  <p>
                    <span>Status:</span>
                    <span>{status}</span>
                  </p>
                  <p>
                    <span>Source:</span>
                    <span>{source}</span>
                  </p>
                  <p>
                    <span>Season:</span>
                    <span>{season}</span>
                  </p>
                  <p>
                    <span>Duration:</span>
                    <span>{duration}</span>
                  </p>
                  <p>
                    <span>Studio:</span>
                    <span>{studios?.map((studio) => studio.name)}</span>
                  </p>
                </div>
              </div>

              <p className="description">
                {showMore ? synopsis : synopsis?.substring(0, 450) + "..."}
                <button
                  onClick={() => {
                    setShowMore(!showMore);
                  }}
                >
                  {showMore ? "Show Less" : "Read More"}
                </button>
              </p>
            </div>
          </div>
          {/* Trailer */}
          <div className="trailer-container">
            <h3 className="title">Trailer</h3>
            {trailer?.embed_url && (
              <iframe
                src={trailer?.embed_url}
                title={title}
                width="800"
                height="450"
                allowFullScreen
              ></iframe>
            )}
          </div>
          <h3 className="title">Characters</h3>
          <div className="characters">
            {characters?.map((character, index) => {
              const { role, voice_actors } = character;
              const { images, name, mal_id } = character.character;
              return (
                <div className="characters-container" key={index}>
                  <Link to={`/character/${mal_id}`}>
                    <div className="character">
                      <img src={images?.jpg.image_url} alt="character image" />
                    </div>
                    <h4>{name}</h4>
                    <p>{role}</p>
                  </Link>
                  <Link to={`/people/${voice_actors[0]?.person.mal_id}`}>
                    <div className="character voice-actor">
                      <img
                        src={voice_actors[0]?.person.images?.jpg.image_url}
                        alt="voice-actor"
                      />
                    </div>
                    <h4>{voice_actors[0]?.person.name}</h4>
                    <p>{voice_actors[0]?.language}</p>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}
