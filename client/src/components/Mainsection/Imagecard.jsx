import React, { useContext, useEffect, useState, } from "react";
import "./Imagecard.css";
import { FaEdit, FaTrash, FaDownload, FaHeart } from "react-icons/fa"; 
import Photocontext from "../../context/Photocontext";
import Editphoto from "../Editphoto/Editphoto"; // Import the Editphoto component
import myimage from '../../Pages/myimage.jpg'
import { Toaster,toast } from 'react-hot-toast';


const Imagecard =() => {
  const context = useContext(Photocontext);
  const { photos, getallphotos, editPhoto, addtofav,addtotrash } = context;

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editPhotoData, setEditPhotoData] = useState(null);

  useEffect(() => {
    getallphotos(); // Fetch all photos on component mount
  },[]); // Dependency array ensures it only runs once


   const [favorites, setFavorites] = useState([]);

  // Function to open edit modal
  const handleEdit = (photo) => {
    setEditPhotoData(photo); // Set current photo data
    setIsEditModalOpen(true); // Open the modal
  };

  // Function to handle close modal
  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setEditPhotoData(null); // Clear current data
  };

  // Function to handle edit submission
  const handleEditSubmit = (updatedData) => {
    editPhoto(editPhotoData._id, updatedData); // Call the edit function
    handleCloseEditModal(); // Close the modal
  };

  // Function to handle image download
  const handleDownload = (filepath, title) => {
    const link = document.createElement("a");
    link.href = filepath;
    link.download = title; 
    link.click();
  };

  return (
    <div>
      <Toaster position="top-right" reverseOrder={false} />
      <h2 className="section-title">Your Images</h2>
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
                  className="favorite-btn"
                  onClick={() => {addtofav(image._id);
                  toast.success("Added to Favourites")
                  }}

                >
                  <FaHeart
                    className={
                      favorites.includes(image._id)
                        ? "heart-icon red"
                        : "heart-icon"
                    }
                  />
                </button>
                <button className="edit-btn" onClick={() => handleEdit(image)}>
                  <FaEdit /> Edit
                </button>
                <button
                  className="delete-btn"
                  onClick={() => {addtotrash(image._id);toast.success("Deleted Successfully")}}
                >
                  <FaTrash /> Delete
                </button>
                <button
                  className="download-btn"
                  onClick={() => {handleDownload(image.filepath, image.title);toast.success("Downloaded Successfully")}}
                >
                  <FaDownload /> Download
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
      marginTop: "2rem",
      width: "100%", // Ensures centering of content
    }}
  >
    <img
      src={myimage}
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
      Add photos to see!
    </h2>
  </div>
)}

      {/* Edit Modal */}
      {isEditModalOpen && (
        <div className="modal-overlay" onClick={handleCloseEditModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-modal-btn" onClick={handleCloseEditModal}>
              ✖
            </button>
            {/* Use the Editphoto component here */}
            <Editphoto
              initialData={editPhotoData}
              onUpdate={handleEditSubmit}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Imagecard;


