import React,{useEffect} from 'react';
import './Howitworks.css';
import accessGif from '../icons/global-unscreen.gif'; // Replace with your actual path
import uploadGif from '../icons/download-unscreen.gif';  // Replace with your actual path
import organizeGif from '../icons/folder-unscreen.gif';  // Replace with your actual path
import signUpGif from '../icons/writing-unscreen.gif';  // Replace with your actual path
import ScrollReveal from "scrollreveal";

const Howitworks = () => {
  
  useEffect(() => {
    ScrollReveal().reveal(`.steps-container`, {
      duration: 500,
      easing: 'ease-in',
      opacity:0,
      reset: true,
      delay:500,
    });
  }, ['.steps-container']);
  const steps = [
    {
      title: 'Sign Up',
      description: 'Create an account to get started.',
      icon: <img src={signUpGif} alt="Sign Up" className="step-icon-image" />,
    },
    {
      title: 'Upload Photos',
      description: 'Securely upload your memories to the cloud.',
      icon: <img src={uploadGif} alt="Upload Photos" className="step-icon-image" />,
    },
    {
      title: 'Organize',
      description: 'Mark favorites, sort collections, and manage trash.',
      icon: <img src={organizeGif} alt="Organize" className="step-icon-image" />,
    },
    {
      title: 'Access Anywhere',
      description: 'Log in anytime to view or manage your photos.',
      icon: <img src={accessGif} alt="Access Anywhere" className="step-icon-image" />,
    },
  ];

  return (
    <div className="how-it-works" id='how'>
      <h2 className="section-title">How It Works</h2>
      <div className="steps-container">
        {steps.map((step, index) => (
          <div key={index} className="step-card">
            <div className="step-icon">{step.icon}</div>
            <h3 className="step-title">{step.title}</h3>
            <p className="step-description">{step.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Howitworks;
