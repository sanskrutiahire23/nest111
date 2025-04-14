import React, { useState, useEffect } from "react";
import "./Editphoto.css";
import { Toaster,toast } from 'react-hot-toast';

const Editphoto = ({ initialData, onUpdate }) => {
  const [formData, setFormData] = useState({
    title: "",
    tag: "",
    photo: null,
  });

  useEffect(() => {
    setFormData({
      title: initialData.title || "",
      tag: initialData.tag || "",
      photo: null,
    });
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      photo: e.target.files[0],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(formData);
    toast.success("Edited Successfully") // Trigger the update function in the parent component
  };

  return (
    <>
    <Toaster position="top-right" reverseOrder={false} />
    <form className="edit-photo-form" onSubmit={handleSubmit}>
      <h2 className="form-title">Edit Photo</h2>
      <div className="form-group">
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Edit title"
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
          placeholder="Edit tag"
        />
      </div>
      <div className="form-group">
        <label htmlFor="photo">Upload New Photo</label>
        <input
          type="file"
          id="photo"
          name="photo"
          onChange={handleFileChange}
        />
      </div>
      <button type="submit" className="submit-btn">Update</button>
    </form>
    </>
  );
};

export default Editphoto;
