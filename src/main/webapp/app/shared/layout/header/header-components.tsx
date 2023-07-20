import React, { useEffect, useState } from 'react';
import { Translate } from 'react-jhipster';

import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle, NavbarBrand, NavItem, NavLink, Spinner } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useAppSelector } from 'app/config/store';
import { NavDropdown } from 'app/shared/layout/menus/menu-components';
import axios from 'axios';
import { faAngleDown, faAngleRight } from '@fortawesome/free-solid-svg-icons';

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
      role="button"
      onClick={() => {
        window.location.href = '/';
      }}
      className="brand-logo"
    >
      <BrandIcon />
      {/*<span className="navbar-version">{VERSION}</span>*/}
    </NavbarBrand>
  );
};

export const Home = () => (
  <NavItem role="button">
    <NavLink onClick={refreshPage} className="d-flex align-items-center">
      {/*<FontAwesomeIcon icon="home" className={'mr-1'} />*/}
      <span style={{ cursor: 'pointer' }}>
        <Translate contentKey="global.menu.home">Home</Translate>
      </span>
    </NavLink>
  </NavItem>
);

export const ComplianceMonitoringUser = () => {
  const [licence, setLicence] = useState({ loading: true, data: [] });
  const [inspectionDropdownOpen, setInspectionDropdownOpen] = useState(false);

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
  }, [, inspectionDropdownOpen]);

  const deviceWidth = window.innerWidth;

  return (
    <Dropdown
      className={'col-6 col-md-12'}
      onMouseLeave={() => {
        setInspectionDropdownOpen(false);
      }}
      isOpen={inspectionDropdownOpen}
      direction={deviceWidth > 768 ? 'end' : 'down'}
    >
      <div
        onMouseEnter={() => {
          setInspectionDropdownOpen(true);
        }}
      >
        <DropdownToggle
          icon="book"
          className=" pl-0 pr-0 h3 shadow-none w-100 d-flex justify-content-between bg-transparent border-0 text-dark font-weight-light"
        >
          <Translate contentKey="compliance.inspectionHistory" />
          {deviceWidth > 768 ? <FontAwesomeIcon icon={faAngleRight} /> : <FontAwesomeIcon icon={faAngleDown} />}
        </DropdownToggle>
      </div>

      <DropdownMenu className="border-bottom-dark border-left-dark border-right-dark border-1 shadow ">
        <DropdownItem className={'text-gray'} header>
          <Translate contentKey="compliance.inspectionHistory" />
        </DropdownItem>

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
      </DropdownMenu>
    </Dropdown>
  );
};
