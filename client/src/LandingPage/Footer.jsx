import React from 'react';
import './Footer.css';


const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <h2 className="footer-brand">Docnest</h2>
        <p className="footer-copyright">© {new Date().getFullYear()} Sanskruti Ahire. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
