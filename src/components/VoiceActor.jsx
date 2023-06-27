import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useGlobalContext } from "../context/Global";
import Loader from "./Loader";
import "../styles/VoiceActor.css";

export default function VoiceActor() {
  const { getVoiceActor, voiceActor, loading } = useGlobalContext();
  const { id } = useParams();
  const [animeVoices, setAnimeVoices] = useState([]);
  const { name, images, about, birthday, family_name, website_url, anime } =
    voiceActor;

  // get anime info and character voiced by actor
  const getAnimeVoices = async (id) => {
    const response = await fetch(
      `https://api.jikan.moe/v4/people/${id}/voices`
    );
    const data = await response.json();
    setAnimeVoices(data.data);
  };

  useEffect(() => {
    getVoiceActor(id);
    getAnimeVoices(id);
  }, []);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="VoiceActor">
          <div className="voice-actor-container">
            <div className="back">
              <Link to="/anime-database/">Back to Home</Link>
            </div>
            <h1>Seiyu Info</h1>
            <div className="actor-card">
              <div className="details-container">
                <div className="voice-actor-image">
                  <img src={images?.jpg.image_url} alt="voice-actor" />
                </div>
                <div className="voice-actor-details">
                  <p>
                    <span>Name: </span>
                    <span>{name}</span>
                  </p>
                  <p>
                    <span>Family Name: </span>
                    <span>{family_name}</span>
                  </p>
                  <p>
                    <span>Birthday: </span>
                    <span>{birthday?.substring(0, 10)}</span>
                  </p>
                  <p>
                    <span>Website: </span>
                    <a href={website_url} target="_blank">
                      <span>{website_url}</span>
                    </a>
                  </p>
                </div>
              </div>
              <p className="voice-actor-about">{about}</p>
            </div>
          </div>
          {/* Voiced Characters */}
          <h2>Voice Acting Roles</h2>
          <div className="anime-voices-container">
            {animeVoices?.map((voice, index) => {
              const { role } = voice;
              const { mal_id, title } = voice.anime;
              const { name, images } = voice.character;

              return (
                <div className="voiced-characters-container" key={index}>
                  <div className="voiced-character">
                    <img src={images?.jpg.image_url} alt="voice-character" />
                  </div>
                  <div className="voiced-character-details">
                    <p>
                      <span>Character: </span>
                      <span>{name}</span>
                    </p>
                    <p>
                      <span>Role: </span>
                      <span>{role}</span>
                    </p>
                    <p>
                      <span>Title: </span>
                      <Link to={`/anime/${mal_id}`}>
                        <span>{title}</span>
                      </Link>
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}
