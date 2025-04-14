import React, { useState,useEffect } from 'react';
import './Faqs.css';
import ScrollReveal from 'scrollreveal';
const Faqs = () => {

  useEffect(() => {
    ScrollReveal().reveal(`.faq-list`, {
      duration: 1000,
      easing: 'ease-in-out',
      scale:1.1,
      reset: true,
      delay:250,
    });
  }, ['.faq-list']);

  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: 'Is my data secure?',
      answer: 'Absolutely! Your data is encrypted and accessible only to you.',
    },
    {
      question: 'What happens if I delete a photo?',
      answer:
        'Deleted photos are moved to the trash. You can restore them within 30 days before they are permanently deleted.',
    },
    {
      question: 'Can I access my photos on mobile devices?',
      answer: 'Yes! Docnest is optimized for mobile devices and accessible via any modern browser.',
    },
    {
      question: 'Can I recover a photo after it has been permanently deleted?',
      answer:
        'Unfortunately, once a photo has been permanently deleted, it cannot be recovered. However, when you delete a photo, it is first moved to the trash, where it remains for 30 days. During this period, you can restore the photo if needed. After 30 days, items in the trash are automatically and permanently deleted.',
    },
  ];

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="faq-section" id='faq'>
      <h2 className="faq-title">Frequently Asked Questions</h2>
      <div className="faq-list">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className={`faq-item ${activeIndex === index ? 'active' : ''}`}
            onClick={() => toggleAccordion(index)}
          >
            <div className="faq-question">
              {faq.question}
              <span className="faq-toggle-icon">
                {activeIndex === index ? '-' : '+'}
              </span>
            </div>
            {activeIndex === index && <div className="faq-answer">{faq.answer}</div>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Faqs;
