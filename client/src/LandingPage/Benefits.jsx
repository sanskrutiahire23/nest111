import React,{useEffect} from 'react';
import ScrollReveal from 'scrollreveal';
import './Benefits.css';
import { FaLock, FaCloud, FaCheckCircle, FaSmile } from 'react-icons/fa'; // Icons for benefits

const Benefits = () => {

  useEffect(() => {
    ScrollReveal().reveal(`.benefit-item`, {
      duration: 1000,
      distance: '50px',
      easing: 'ease-in-out',
      origin: 'left',
      reset: true,
      delay:250,
    });
  }, ['.benefit-item']);


  const benefits = [
    {
      title: 'Data Privacy',
      description: 'Your photos are yours alone. No unauthorized access.',
      icon: <FaLock />,
    },
    {
      title: 'Convenience',
      description: 'Access your memories anytime, anywhere.',
      icon: <FaCloud />,
    },
    {
      title: 'Reliability',
      description: 'Our robust cloud ensures your photos are always safe.',
      icon: <FaCheckCircle />,
    },
    {
      title: 'User-Friendly',
      description: 'Designed with simplicity and ease of use in mind.',
      icon: <FaSmile />,
    },
  ];

  return (
    <div className="benefits-section" id='benefits'>
      <h2 className="benefits-title">Why Choose Docnest?</h2>
      <div className="benefits-list">
        {benefits.map((benefit, index) => (
          <div key={index} className="benefit-item">
            <div className="benefit-icon">{benefit.icon}</div>
            <div className="benefit-text">
              <h3 className="benefit-title">{benefit.title}</h3>
              <p className="benefit-description">{benefit.description}</p>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

export default Benefits;
