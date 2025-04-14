import React, { useState } from "react";
import "./Signup.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Toaster,toast } from "react-hot-toast";
import video from '../Pages/signupvideo.mp4'
const Signup = () => {
  let navigate=useNavigate()
  const [credentials, setcredentials] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setcredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password,confirmPassword } = credentials;

    if (!name || !email || !password || !confirmPassword) {
      setError("All fields are required.");
      toast.error("All fields are required")
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      toast.error("Passwords do not match")
      return;
    }

    setError("");
    console.log("Form submitted successfully", credentials);
    // Handle form submission logic (e.g., API call)
    const response=await fetch('http://localhost:5000/api/auth/createuser',{
      method:"POST",
      headers:{
        "Content-Type": "application/json",
      },
      body: JSON.stringify({name,email,password})
    })
    const json=await response.json()
    console.log(json)
    if (json.success) {
      const token=json.jwtdata;
      if (token) {
        localStorage.setItem('token',token)
        toast.success("Account Created Successfully")
        navigate('/myimages')
      }

    } else {
      toast.error('User with this email id already exists')
    }
  };

  return (
    <>
    <Toaster position="top-right" reverseOrder={false} />
    <div className="signup-container">
      <div className="form-section">
        <div className="form-box" style={{width:"70%",paddingTop:"1%",paddingBottom:"1%"}}>
          <div className="form-header">
            <h2>Sign Up</h2>
            <p>It's not long before you embark on this journey!</p>
          </div>
          {error && <p className="error-message">{error}</p>}
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name" id="labelname">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Enter your name"
                value={credentials.name}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="email" id="labelname">E-mail</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="name@email.com"
                value={credentials.email}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password" id="labelname">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Enter your password"
                value={credentials.password}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="confirmPassword" id="labelname">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Confirm your password"
                value={credentials.confirmPassword}
                onChange={handleChange}
              />
            </div>
            <button type="submit" className="signup-button">
              Create an account
            </button>
          </form>
          <p className="signin-link">
            Already have an account? <Link to="/login">Sign In</Link>
          </p>
        </div>
      </div>
      <div className="image-section">
  <video 
    className="background-video" 
    src={video}
    autoPlay 
    loop 
    muted 
    controls={false} // Remove controls if it's purely decorative
  />
</div>

    </div>
    </>
  );
};

export default Signup;
