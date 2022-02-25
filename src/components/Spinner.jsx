import React from 'react';
import './style.css';

function Spinner() {
  return (
    <>
      <div className="backdrop" />
      <div className="spinner">
        <div className="double-bounce1"></div>
        <div className="double-bounce2"></div>
      </div>
    </>
  );
}

export default Spinner;
