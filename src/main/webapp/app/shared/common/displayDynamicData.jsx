import React from 'react';

const DisplayData = ({ data,collapse }) => {
  return (
    <>
    {!collapse ? (
      <div className="mb-4 d-flex  flex-wrap border-bottom-3 border-bottom border-success bg-lightest-blue">
        {Object.keys(data).map((key) => (
          <div key={key} className="data-item p-2 w-50 "><i>
            <strong>{key.charAt(0).toUpperCase() + key.slice(1)}</strong> : {data[key]}</i>
          </div>
        ))}
      </div>
    ):(<></>)}
    </>
  );
};

export default DisplayData;
