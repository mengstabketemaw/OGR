import './home.scss';

import React from 'react';
import { Link } from 'react-router-dom';
import { Translate } from 'react-jhipster';
import { Row, Col, Alert, Card, CardImg, CardBody, CardTitle, CardText, Button } from 'reactstrap';

import { useAppSelector } from 'app/config/store';

export const Home = () => {
  const account = useAppSelector(state => state.authentication.account);

  return (
    <>
      <Card style={{ width: '18rem' }}>
        <CardImg alt="..." top />
        <CardBody>
          <CardTitle>Card title</CardTitle>
          <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
          <Button color="primary" href="#pablo" onClick={e => e.preventDefault()}>
            Go somewhere
          </Button>
        </CardBody>
      </Card>
    </>
  );
};

export default Home;
