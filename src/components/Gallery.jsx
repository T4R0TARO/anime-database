import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useGlobalContext } from "../context/Global.jsx";
import Loader from "./Loader.jsx";
import "../styles/Gallery.css";

export default function Gallery() {
  const { getAnimePictures, pictures, loading } = useGlobalContext();
  const { id } = useParams();
  const [index, setIndex] = useState(0);

  const handleImageClick = (i) => {
    setIndex(i);
  };

  useEffect(() => {
    getAnimePictures(id);
  }, []);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="Gallery">
          <div className="back">
            <Link to="/anime-database/">Back to Home</Link>
          </div>
          <h1>Gallery Component</h1>
          <div className="big-image">
            <img src={pictures[index]?.jpg.image_url} alt="selected image" />
          </div>
          <div className="small-images">
            {pictures.map((picture, i) => {
              return (
                <div
                  className="image-container"
                  onClick={() => {
                    handleImageClick(i);
                  }}
                  key={i}
                >
                  <img
                    src={picture.jpg.image_url}
                    alt="charcter image"
                    style={{
                      border:
                        i === index ? "3px solid #27AE60" : "3px solid #e5e7eb",
                      filter: i === index ? "grayscale(0)" : "grayscale(60%)",
                      transform: i === index ? "scale(1.1)" : "scale(1)",
                      transition: "all  .3s ease-in-out",
                    }}
                  />
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}
