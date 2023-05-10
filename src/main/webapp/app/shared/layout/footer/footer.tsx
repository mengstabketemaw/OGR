import './footer.scss';

import React from 'react';
import { Translate } from 'react-jhipster';
import { Col, Row } from 'reactstrap';

const Footer = () => (
  <div className="footer  page-content fixed-bottom bg-gradient-success">
    <Row>
      <Col md="12">
        <p>
          <Translate contentKey="footer">Oil and Gas Regulation and Licensing</Translate>
        </p>
      </Col>
    </Row>
  </div>
);

export default Footer;
