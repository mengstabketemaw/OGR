import './footer.scss';

import React from 'react';
import { Translate } from 'react-jhipster';
import { Col, Row } from 'reactstrap';

const Footer = () => (
  <div className="footer p-0 page-content fixed-bottom bg-gradient-success">
    <Row className="d-flex justify-content-center">
      <Col md="4" className="d-flex">
        <p className="align-self-center text-white">
          <Translate contentKey="footer"></Translate>
        </p>
      </Col>
    </Row>
  </div>
);

export default Footer;
