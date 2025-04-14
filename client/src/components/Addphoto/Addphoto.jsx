import React, { useState } from "react";
import "./Addphoto.css";
import { Toaster,toast } from 'react-hot-toast';

const Addphoto = ({ onAdd }) => {
  const [formData, setFormData] = useState({
    title: "",
    tag: "",
    photo: null,
  });

  // Handle text input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle file input changes
  const handleFileChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      photo: e.target.files[0], // Store the selected file
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formDataToSubmit = new FormData();
    formDataToSubmit.append("title", formData.title);
    formDataToSubmit.append("tag", formData.tag);
    formDataToSubmit.append("photo", formData.photo); // Ensure the file is correctly appended
  
    // Log the form data to verify if the file is included
    for (let [key, value] of formDataToSubmit.entries()) {
      console.log(key, value); // This should show 'photo' and the file
    }
  
    await onAdd(formDataToSubmit);
    toast.success("Added Successfully")
  };
  

  return (
    <>
    <Toaster position="top-right" reverseOrder={false} />
    <form className="add-photo-form" onSubmit={handleSubmit}>
      <h2 className="form-title">Add Photo</h2>
      <div className="form-group">
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Enter title"
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="tag">Tag</label>
        <input
          type="text"
          id="tag"
          name="tag"
          value={formData.tag}
          onChange={handleChange}
          placeholder="Enter tag"
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="photo">Upload Photo</label>
        <input
          type="file"
          id="photo"
          name="photo"
          onChange={handleFileChange}
          required
        />
      </div>
      <button type="submit" className="submit-btn">Add</button>
    </form>
    </>
  );
};

export default Addphoto;
