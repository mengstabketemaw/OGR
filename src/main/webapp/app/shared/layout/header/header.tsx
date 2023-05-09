import './header.scss';

import React, { useState } from 'react';
import { Translate, Storage } from 'react-jhipster';
import { Navbar, Nav, NavbarToggler, Collapse, DropdownItem } from 'reactstrap';
import LoadingBar from 'react-redux-loading-bar';

import { Home, Brand } from './header-components';
import { AdminMenu, EntitiesMenu, AccountMenu, LocaleMenu, LicencesMenu } from '../menus';
import { useAppDispatch } from 'app/config/store';
import { setLocale } from 'app/shared/reducers/locale';
import { languages, locales } from 'app/config/translation';
import { NavDropdown } from 'app/shared/layout/menus/menu-components';
import { Link } from 'react-router-dom';

export interface IHeaderProps {
  isAuthenticated: boolean;
  isAdmin: boolean;
  ribbonEnv: string;
  isInProduction: boolean;
  isOpenAPIEnabled: boolean;
  currentLocale: string;
}

const Header = (props: IHeaderProps) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const dispatch = useAppDispatch();

  const handleLocaleChange = event => {
    const langKey = event.target.value;
    Storage.session.set('locale', langKey);
    dispatch(setLocale(langKey));
  };

  const renderDevRibbon = () =>
    props.isInProduction === false ? (
      <div className="ribbon dev">
        <a href="">
          <Translate contentKey={`global.ribbon.${props.ribbonEnv}`} />
        </a>
      </div>
    ) : null;

  const toggleMenu = () => setMenuOpen(!menuOpen);

  /* jhipster-needle-add-element-to-menu - JHipster will add new menu items here */

  return (
    <div id="app-header">
      {renderDevRibbon()}
      <LoadingBar className="loading-bar" />
      <Navbar data-cy="navbar" expand="lg" fixed="top" className="navbar-horizontal navbar-dark bg-gradient-success mb-4 col-12">
        <NavbarToggler aria-label="Menu" onClick={toggleMenu} />
        <Brand />
        <Collapse isOpen={menuOpen} navbar>
          <Nav id="header-tabs" className="ms-auto" navbar>
            {props.isAuthenticated && <Home />}
            {props.isAuthenticated && <LicencesMenu />}

            <NavDropdown icon="book" name="Permit">
              <DropdownItem>
                {' '}
                <Link to="/permit?name=drilling"> Drilling Permit Requirement </Link>{' '}
              </DropdownItem>
              <DropdownItem>
                {' '}
                <Link to="/permit?name=air"> Air Emission Permit </Link>{' '}
              </DropdownItem>
              <DropdownItem> Production Permit</DropdownItem>
              <DropdownItem> Transportation Permit</DropdownItem>
              <DropdownItem> Storage Permit</DropdownItem>
              <DropdownItem> Waste Management Permit</DropdownItem>
              <DropdownItem> Pipeline Permit</DropdownItem>
              <DropdownItem> Flaring and Venting Permit</DropdownItem>
              <DropdownItem> Water Use Permit</DropdownItem>
              <DropdownItem> Emissions Permit</DropdownItem>
            </NavDropdown>

            {/* {props.isAuthenticated && <EntitiesMenu />} */}
            {props.isAuthenticated && props.isAdmin && <AdminMenu showOpenAPI={props.isOpenAPIEnabled} />}
            <LocaleMenu currentLocale={props.currentLocale} onClick={handleLocaleChange} />
            <AccountMenu isAuthenticated={props.isAuthenticated} />
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default Header;
