import './header.scss';

import React, { useEffect, useRef, useState } from 'react';
import { Translate, Storage } from 'react-jhipster';
import {
  Navbar,
  Nav,
  NavbarToggler,
  Collapse,
  DropdownItem,
  NavItem,
  NavLink,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
  Dropdown,
} from 'reactstrap';
import LoadingBar from 'react-redux-loading-bar';

import { Home, Brand, ComplianceMonitoringUser } from './header-components';
import { AdminMenu, EntitiesMenu, AccountMenu, LocaleMenu, LicencesMenu } from '../menus';
import { useAppDispatch } from 'app/config/store';
import { setLocale } from 'app/shared/reducers/locale';
import { languages, locales } from 'app/config/translation';
import { NavDropdown } from 'app/shared/layout/menus/menu-components';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleRight, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
// import NotificationComponent from 'app/entities/notification/notification';

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

  const [licenceDropdownOpen, setLicenceDropdownOpen] = useState(false);
  const [permitDropdownOpen, setPermitDropdownOpen] = useState(false);

  const deviceWidth = window.innerWidth;

  return (
    <div id="app-header rounded-bottom">
      <LoadingBar className="loading-bar" />
      <div className="navbar">
        <Navbar data-cy="navbar" expand="md" fixed="top" className="navbar-horizontal pt-2 pb-2 navbar-dark bg-gradient-success  col-12">
          <NavbarToggler aria-label="Menu" onClick={toggleMenu} />

          <Brand />
          <Collapse className={menuOpen ? 'show mt-6 mt-md-0' : 'mt-6 mt-md-0'} navbar>
            <Nav id="header-tabs" className="ms-auto" navbar>
              {/*<NotificationComponent />*/}
              {props.isAuthenticated && <Home />}
              <NavDropdown
                // icon="cogs"
                name={<Translate contentKey="global.services" />}
                className={'row'}
              >
                <Dropdown
                  className={'col-6 col-md-12'}
                  onMouseLeave={() => {
                    setLicenceDropdownOpen(false);
                  }}
                  isOpen={licenceDropdownOpen}
                  direction={deviceWidth > 768 ? 'end' : 'down'}
                >
                  <div
                    onMouseEnter={() => {
                      setLicenceDropdownOpen(true);
                    }}
                  >
                    <DropdownToggle
                      // icon="book"
                      className=" pl-0 pr-0 h3 shadow-none w-100 d-flex justify-content-between bg-transparent border-0 text-dark font-weight-light"
                    >
                      <Translate contentKey="licence.titles" />
                      {deviceWidth > 768 ? <FontAwesomeIcon icon={faAngleRight} /> : <FontAwesomeIcon icon={faAngleDown} />}
                    </DropdownToggle>
                  </div>
                  <DropdownMenu className="border-bottom-dark border-left-dark border-right-dark border-1 shadow ">
                    <DropdownItem className={'text-gray'} header>
                      <Translate contentKey="licence.titles" />
                    </DropdownItem>
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
                  </DropdownMenu>
                </Dropdown>

                <Dropdown
                  className={'col-6 col-md-12'}
                  onMouseLeave={() => {
                    setPermitDropdownOpen(false);
                  }}
                  isOpen={permitDropdownOpen}
                  direction={deviceWidth > 768 ? 'end' : 'down'}
                >
                  <div
                    onMouseEnter={() => {
                      setPermitDropdownOpen(true);
                    }}
                  >
                    <DropdownToggle
                      // icon="book"
                      className=" pl-0 pr-0 h3 shadow-none w-100 d-flex justify-content-between bg-transparent border-0 text-dark font-weight-light"
                    >
                      <Translate contentKey="permit.titles" />
                      {deviceWidth > 768 ? <FontAwesomeIcon icon={faAngleRight} /> : <FontAwesomeIcon icon={faAngleDown} />}
                    </DropdownToggle>
                  </div>
                  <DropdownMenu className="border-bottom-dark border-left-dark border-right-dark border-1 shadow ">
                    <DropdownItem className={'text-gray'} header>
                      <Translate contentKey="permit.titles" />
                    </DropdownItem>
                    <DropdownItem tag="a" href={(props.isAdmin ? '/formData' : '/permit') + '?name=Drilling Permit &pageKey=4'}>
                      <Translate contentKey="permit.types.drilling" />
                    </DropdownItem>
                    <DropdownItem tag="a" href={(props.isAdmin ? '/formData' : '/permit') + '?name=Air Emission Permit &pageKey=3'}>
                      <Translate contentKey="permit.types.air" />
                    </DropdownItem>
                    <DropdownItem>
                      <Translate contentKey="permit.types.production" />
                    </DropdownItem>
                    <DropdownItem>
                      <Translate contentKey="permit.types.transport" />
                    </DropdownItem>
                    <DropdownItem>
                      <Translate contentKey="permit.types.storage" />
                    </DropdownItem>
                    <DropdownItem>
                      <Translate contentKey="permit.types.waste" />
                    </DropdownItem>
                    <DropdownItem>
                      <Translate contentKey="permit.types.pipeline" />
                    </DropdownItem>
                    <DropdownItem>
                      <Translate contentKey="permit.types.flaring" />
                    </DropdownItem>
                    <DropdownItem>
                      <Translate contentKey="permit.types.water" />
                    </DropdownItem>
                    <DropdownItem>
                      <Translate contentKey="permit.types.emission" />
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
                {props.isAuthenticated && props.isAdmin && (
                  <DropdownItem onClick={gotoCompliance}>
                    <Translate contentKey="global.menu.compliance" />
                  </DropdownItem>
                )}
                {props.isAuthenticated && !props.isAdmin && <ComplianceMonitoringUser />}
              </NavDropdown>

              {/* {props.isAuthenticated && <EntitiesMenu />} */}
              {props.isAuthenticated && props.isAdmin && <AdminMenu showOpenAPI={props.isOpenAPIEnabled} />}
              <LocaleMenu currentLocale={props.currentLocale} onClick={handleLocaleChange} />
              <NavDropdown
                // icon="help"
                name={<Translate contentKey="support.support" />}
              >
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
              <AccountMenu isAuthenticated={props.isAuthenticated} />
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    </div>
  );
};

export default Header;
