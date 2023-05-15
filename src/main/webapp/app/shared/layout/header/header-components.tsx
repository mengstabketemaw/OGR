import React from 'react';
import { Translate } from 'react-jhipster';

import { NavItem, NavLink, NavbarBrand } from 'reactstrap';
import { NavLink as Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useAppSelector } from 'app/config/store';

const refreshPage = () => {
  window.location.href = '/home';
};

export const BrandIcon = props => (
  <div {...props} className="brand-icon">
    <img src="content/images/img_1.png" className="img-fluid text-xl" style={{ borderRadius: '12px' }} alt="Logo" />
  </div>
);

export const Brand = () => {
  const isAuthenticated = useAppSelector(state => state.authentication.isAuthenticated);
  return (
    <NavbarBrand
      onClick={() => {
        if (isAuthenticated) {
          window.location.href = '/home';
        } else {
          window.location.href = '/';
        }
      }}
      className="brand-logo"
    >
      <BrandIcon />
      <span className="navbar-version">{VERSION}</span>
    </NavbarBrand>
  );
};

export const Home = () => (
  <NavItem>
    <NavLink onClick={refreshPage} className="d-flex align-items-center">
      <FontAwesomeIcon icon="home" className={'mr-1'} />
      <span>
        <Translate contentKey="global.menu.home">Home</Translate>
      </span>
    </NavLink>
  </NavItem>
);
