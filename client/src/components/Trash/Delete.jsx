import React from 'react'
import { useContext,useEffect } from 'react';
import Photocontext from "../../context/Photocontext";
import { FaTrash } from 'react-icons/fa';
import {MdSettingsBackupRestore} from 'react-icons/md'
import dustbin from '../../Pages/dustbin.jpg'
import { Toaster,toast } from 'react-hot-toast';

const Delete = () => {
    const context = useContext(Photocontext);
    const {photos,fetchtrash,deletephotos,restore} = context;

    useEffect(()=> {
        fetchtrash()
    },[])

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <h2 className="section-title">Trash</h2>
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
                  className="delete-btn"
                  onClick={() => {
                    deletephotos(image._id);
                    toast.success("Photo Deleted Successfully")
                  }}
                >
                  <FaTrash /> Delete Permenantly
                </button>
                <button
                  className="edit-btn"
                  onClick={() => {
                    restore(image._id);
                    toast.success("Restored Successfully")
                  }}
                >
                  <MdSettingsBackupRestore /> Restore
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
    }
  }
  >
    <img
      src={dustbin}
      alt="No Photo Image"
      style={{
        width: "20rem", // Fixed image width
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
      Trash is empty!
    </h2>
  </div>
)}
    </>
  );
}

export default Delete