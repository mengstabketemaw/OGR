import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from 'reactstrap';
const Licence = () => {
  const [params] = useSearchParams();
  const nav = useNavigate();

  return (
    <>
      <h1>{params.get('name')}</h1>
      <Button onClick={() => nav('/apply-licence?name=' + params.get('name') + '&pageKey=' + params.get('pageKey'))}>Apply</Button>
    </>
  );
};

export default Licence;
