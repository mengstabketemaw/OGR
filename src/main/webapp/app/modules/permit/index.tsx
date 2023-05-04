import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
const Permit = () => {
  const [params] = useSearchParams();
  const nav = useNavigate();

  return (
    <>
      <h1>{params.get('name')}</h1>
      <button onClick={() => nav('/apply-permit?name=' + params.get('name'))}>Apply</button>
    </>
  );
};

export default Permit;
