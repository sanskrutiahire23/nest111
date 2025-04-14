import React from 'react';
import './Hero.css';
import {useNavigate} from 'react-router-dom'
const Hero = () => {
    const navigate=useNavigate()
  return (
    <div className="hero-section" id='home'>
      <div className="hero-overlay">
        <h1 className="hero-title">Secure Your Memories with Docnest</h1>
        <p className="hero-subtitle">Effortless photo storage, organization, and access, anytime and anywhere.</p>
        <button className="hero-button" onClick={()=>{navigate('/signup')}}>Get Started</button>
      </div>
    </div>
  );
};

export default Hero;
