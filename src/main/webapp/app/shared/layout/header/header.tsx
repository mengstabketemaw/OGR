import './header.scss';

import React, { useEffect, useRef, useState } from 'react';
import { Translate, Storage } from 'react-jhipster';
import { Navbar, Nav, NavbarToggler, Collapse, DropdownItem, NavItem, NavLink } from 'reactstrap';
import LoadingBar from 'react-redux-loading-bar';

import { Home, Brand, ComplianceMonitoringUser } from './header-components';
import { AdminMenu, EntitiesMenu, AccountMenu, LocaleMenu, LicencesMenu } from '../menus';
import { useAppDispatch } from 'app/config/store';
import { setLocale } from 'app/shared/reducers/locale';
import { languages, locales } from 'app/config/translation';
import { NavDropdown } from 'app/shared/layout/menus/menu-components';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';

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
  const nav = useNavigate();
  const dispatch = useAppDispatch();
  const navbarRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = event => {
      if (navbarRef.current && !navbarRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    window.addEventListener('click', handleOutsideClick);

    return () => {
      window.removeEventListener('click', handleOutsideClick);
    };
  }, []);

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

  const gotoCompliance = () => {
    window.location.href = '/compliance';
  };

  const gotoComplianceUser = () => {
    window.location.href = '/complianceUser';
  };
  /* jhipster-needle-add-element-to-menu - JHipster will add new menu items here */

  return (
    <div id="app-header rounded-bottom">
      <LoadingBar className="loading-bar" />
      <div className="navbar">
        <Navbar data-cy="navbar" expand="md" fixed="top" className="navbar-horizontal pt-2 pb-2 navbar-dark bg-gradient-success  col-12">
          <NavbarToggler aria-label="Menu" onClick={toggleMenu} />

          <Brand />
          <Collapse className={menuOpen ? 'show mt-6 mt-md-0' : 'mt-6 mt-md-0'} navbar>
            <Nav id="header-tabs" className="ms-auto" navbar>
              {props.isAuthenticated && <Home />}
              <NavDropdown icon="book" name={<Translate contentKey="licence.title" />}>
                <DropdownItem tag="a" href={(props.isAdmin ? '/formData' : '/permit') + '?name=Exploration Licence&pageKey=1'}>
                  <Translate contentKey="licence.types.exploration" />
                </DropdownItem>
                <DropdownItem tag="a" href={(props.isAdmin ? '/formData' : '/permit') + '?name=PipeLine Licence&pageKey=2'}>
                  <Translate contentKey="licence.types.pipeline" />
                </DropdownItem>
                <DropdownItem>
                  <Translate contentKey="licence.types.storage" />
                </DropdownItem>
                <DropdownItem>
                  <Translate contentKey="licence.types.transportation" />
                </DropdownItem>
                <DropdownItem>
                  <Translate contentKey="licence.types.processing" />
                </DropdownItem>
                <DropdownItem>
                  <Translate contentKey="licence.types.distribution" />
                </DropdownItem>
                <DropdownItem>
                  <Translate contentKey="licence.types.retail" />
                </DropdownItem>
                <DropdownItem>
                  <Translate contentKey="licence.types.waste" />
                </DropdownItem>
              </NavDropdown>

              <NavDropdown icon="book" name={<Translate contentKey="permit.title" />}>
                <DropdownItem tag="a" href={(props.isAdmin ? '/formData' : '/permit') + '?name=Drilling Permit &pageKey=4'}>
                  Drilling Permit
                </DropdownItem>
                <DropdownItem tag="a" href={(props.isAdmin ? '/formData' : '/permit') + '?name=Air Emission Permit &pageKey=3'}>
                  Air Emission Permit
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
              {props.isAuthenticated && props.isAdmin && (
                <NavItem>
                  <NavLink onClick={gotoCompliance} className="d-flex align-items-center">
                    <FontAwesomeIcon icon={faInfoCircle} className={'mr-1'} />
                    <span>
                      <Translate contentKey="global.menu.compliance" />
                    </span>
                  </NavLink>
                </NavItem>
              )}
              {props.isAuthenticated && !props.isAdmin && <ComplianceMonitoringUser />}

              {/* {props.isAuthenticated && <EntitiesMenu />} */}
              {props.isAuthenticated && props.isAdmin && <AdminMenu showOpenAPI={props.isOpenAPIEnabled} />}
              <LocaleMenu currentLocale={props.currentLocale} onClick={handleLocaleChange} />
              <AccountMenu isAuthenticated={props.isAuthenticated} />
              <NavDropdown icon="help" name={<Translate contentKey="support.support" />}>
                <DropdownItem tag="a" href={'https://ograngola.tawk.help/'}>
                  {' '}
                  <Translate contentKey="support.knowledgeBased" />
                </DropdownItem>
                <DropdownItem>
                  {' '}
                  <Translate contentKey="support.contactUs" />
                </DropdownItem>
                <DropdownItem>
                  {' '}
                  <Translate contentKey="support.FAQ" />
                </DropdownItem>
              </NavDropdown>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    </div>
  );
};

export default Header;
