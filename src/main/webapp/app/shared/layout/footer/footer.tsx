import './footer.scss';

import React from 'react';
import { Translate } from 'react-jhipster';
import { Col, Row } from 'reactstrap';

const Footer = () => (
  <>
    <div className="footer d-none p-0 page-content fixed-bottom bg-gradient-success d-sm-flex text-white justify-content-between align-items-center m-auto">
      <span className="navbar-version text-white font-weight-bold">
        {' '}
        <Translate contentKey={'global.version'} /> {'  '} 2.231
      </span>
      <Translate contentKey="footer"></Translate>
      <div className=""></div>
    </div>
  </>
);

export default Footer;
