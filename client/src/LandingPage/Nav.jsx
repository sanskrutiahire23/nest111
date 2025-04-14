import React, { useState, useEffect } from 'react';
import './Nav.css';
import { useNavigate } from 'react-router-dom';

const Nav = () => {
    const navigate=useNavigate()
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="navbar-title">{isScrolled ? 'Dn' : 'Docnest'}</div>
      <ul className="navbar-links">
        <li><a href="#home">Home</a></li>
        <li><a href="#services">Services</a></li>
        <li><a href="#how">How It Works</a></li>
        <li><a href="#benefits">Why Choose Us?</a></li>
        <li><a href="#faq">FAQs</a></li>
      </ul>
      <button className="get-started-btn" onClick={()=>{navigate('/login')}}>Login</button>
    </nav>
  );
};

export default Nav;
