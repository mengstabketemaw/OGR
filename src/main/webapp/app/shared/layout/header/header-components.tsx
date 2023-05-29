import React, { useEffect, useState } from 'react';
import { Translate } from 'react-jhipster';

import { DropdownItem, NavbarBrand, NavItem, NavLink, Spinner } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useAppSelector } from 'app/config/store';
import { NavDropdown } from 'app/shared/layout/menus/menu-components';
import axios from 'axios';

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

export const ComplianceMonitoringUser = () => {
  const [licence, setLicence] = useState({ loading: true, data: [] });

  const fetchData = () => {
    // Construct the URL with the page query parameter
    const url = `/api/licence/user`;
    axios
      .get(url)
      .then(({ data }) => {
        // Update the state with the new data and total pages
        setLicence({ loading: false, data });
      })
      .catch(console.log);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <NavDropdown icon="book" name={<Translate contentKey="compliance.inspectionHistory" />}>
      {licence.loading ? (
        <div className={'d-flex justify-content-center'}>
          <Spinner
            className="align-self-center"
            color="primary"
            style={{
              height: '3rem',
              width: '3rem',
            }}
            type="grow"
          >
            Loading...
          </Spinner>
        </div>
      ) : (
        <>
          {licence?.data?.map(data => (
            <DropdownItem
              tag={'a'}
              href={`/complianceUser?licence=${data.form.id}&title=${data.form.title}&submittedDate=${data.submittedDate}`}
            >
              {data.form.title}
            </DropdownItem>
          ))}
        </>
      )}
    </NavDropdown>
  );
};
