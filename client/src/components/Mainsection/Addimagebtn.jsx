import React, { useState, useContext } from "react";
import "./Addimagebtn.css";
import { FaRegSquarePlus } from "react-icons/fa6";
import Addphoto from "../Addphoto/Addphoto";
import Photocontext from "../../context/Photocontext";

const Addimagebtn = () => {
  const context = useContext(Photocontext);
  const { addphotos } = context;
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleAddPhoto = (data) => {
    addphotos(data); // Call the context's addphotos function
    setIsModalOpen(false); // Close modal after adding
  };

  return (
    <div className="add-image-container">
      {/* Button to Open Modal */}
      <button className="add-image-btn" onClick={handleOpenModal}>
        <span className="btn-text">Add Photo</span>
        <FaRegSquarePlus size={22} className="btn-icon" />
      </button>

      {/* Modal */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()} // Prevent modal closure when clicking inside
          >
            <button className="close-modal-btn" onClick={handleCloseModal}>
              ✖
            </button>
            <Addphoto onAdd={handleAddPhoto} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Addimagebtn;
