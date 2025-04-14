import React, { useState } from "react";
import "./Login.css";
import { Link } from "react-router-dom";
import { Toaster,toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import video from '../Pages/loginvideo.mp4'
const Login = () => {
  const navigate=useNavigate()
  const [credentials, setcredentials] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setcredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const {email, password } = credentials;

    if (!email || !password) {
      setError("All fields are required.");
      toast.error("All fields are required")
      return;
    }
    setError("");
    console.log("Form submitted successfully", credentials);
    // Handle form submission logic (e.g., API call)
    const response=await fetch('http://localhost:5000/api/auth/login',{
      method:"POST",
      headers:{
        "Content-type":"Application/json",
      },
      body: JSON.stringify({email,password})
    })
    const json=await response.json()
    if (json.success) {
      const token=json.jwtdata
      if (token) {
        localStorage.setItem('token',token)
        toast.success('Logged in successfully')
        navigate('/myimages')
      }
    } else {
      toast.error("Please login with correct credentials")
    }
  };

  return (
    <>
    <Toaster position="top-right" reverseOrder={false} />
    <div className="signup-container">
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
      <div className="form-section">
        <div className="form-box">
          <div className="form-header">
            <h2>Login</h2>
            <p>Let's get you back where you left!</p>
          </div>
          {error && <p className="error-message">{error}</p>}
          <form onSubmit={handleSubmit}>
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
            <button type="submit" className="anybutton">
              Login
            </button>
          </form>
          <p className="signin-link">
            Don't have an account? <Link to="/signup">Sign up</Link>
          </p>
        </div>
      </div>
    </div>
    </>
  );
};

export default Login;
