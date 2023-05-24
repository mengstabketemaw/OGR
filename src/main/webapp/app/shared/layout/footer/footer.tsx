import './footer.scss';

import React from 'react';
import { Translate } from 'react-jhipster';
import { Col, Row } from 'reactstrap';

const Footer = () => (
  <div className="footer d-none p-0 page-content fixed-bottom bg-gradient-success d-sm-flex text-white justify-content-center m-auto">
    <Translate contentKey="footer"></Translate>
  </div>
);

export default Footer;
