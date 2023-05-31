import React from 'react';
import './displayData.css';

const DisplayData = ({ data }) => {
  return (
    <div className="data-container">
      {Object.keys(data).map((key) => (
        <div key={key} className="data-item">
          <strong>{key.charAt(0).toUpperCase() + key.slice(1)}</strong> : {data[key]}
        </div>
      ))}
    </div>
  );
};

export default DisplayData;
