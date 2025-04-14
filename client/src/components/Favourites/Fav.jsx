import React, { useContext, useEffect, useState } from 'react';
import Photocontext from "../../context/Photocontext";
import { IoMdRemoveCircleOutline } from 'react-icons/io';
import nophoto from '../../Pages/concept-teamwork_132971-129.jpg'
import {Toaster,toast} from 'react-hot-toast'

const Fav = () => {
  const { photos: contextPhotos, loadfavourites, removefave } = useContext(Photocontext);
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    loadfavourites(); // Fetch favorites when the component mounts
  }, []);

  useEffect(() => {
    setPhotos(contextPhotos); // Update local state when context photos change
  }, [contextPhotos]);

  const handleRemove = async (id) => {
    try {
      await removefave(id); // Call the context's remove function
      setPhotos((prevPhotos) => prevPhotos.filter((photo) => photo._id !== id)); // Update local state
    } catch (error) {
      console.error("Error removing favorite:", error);
    }
  };

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <h2 className="section-title">Favourites</h2>
      <div className="image-grid">
        {photos.map((image) => (
          <div className="image-card" key={image._id}>
            <div className="image-container">
              <img
                src={image.filepath}
                alt={image.title}
                className="image"
                loading="lazy"
              />
            </div>
            <div className="overlay">
              <h3 className="card-title">{image.title}</h3>
              <p className="card-tag">{image.tag}</p>
              <div className="card-actions">
                <button
                  className="edit-btn"
                  onClick={() => {handleRemove(image._id);
                  toast.success("Removed from favourites successfully")
                  }} // Use the local handleRemove function
                >
                  <IoMdRemoveCircleOutline /> Remove From Favourites
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {!photos.length && (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      marginTop: "4rem",
      width: "100%", // Ensures centering of content
    }}
  >
    <img
      src={nophoto}
      alt="No Photo Image"
      style={{
        width: "30rem", // Fixed image width
      }}
    />
    <h2
      style={{
        marginTop: "1rem", // Space between image and title
        fontSize: "1.2rem",
        fontWeight: "bold",
        textAlign: "center", // Center align title below the image
      }}
    >
      Add photos to favourites to see
    </h2>
  </div>
)}

      
    </>
  );
};

export default Fav;
