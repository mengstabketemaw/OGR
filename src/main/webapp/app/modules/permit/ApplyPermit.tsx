import React from 'react';
import { useSearchParams } from 'react-router-dom';

const ApplyPermit = () => {
  const [params] = useSearchParams();
  return (
    <>
      <p>{params.get('name')}</p>
    </>
  );
};

export default ApplyPermit;
