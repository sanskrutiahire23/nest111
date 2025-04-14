import React from 'react';
import Lottie from 'lottie-react'; // Adjust the path

const Icons = (props) => {
  return (
    <div style={{ height: '150px', width: '150px' }}> {/* Adjust size */}
      <Lottie animationData={props.animationData} loop={true} />
    </div>
  );
};

export default Icons;
