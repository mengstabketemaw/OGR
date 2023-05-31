import 'react-toastify/dist/ReactToastify.css';
import './app.scss';
import 'app/config/dayjs.ts';

import React, { useEffect } from 'react';
import { Card } from 'reactstrap';
import { BrowserRouter, useLocation } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

import { useAppDispatch, useAppSelector } from 'app/config/store';
import { getSession } from 'app/shared/reducers/authentication';
import { getProfile } from 'app/shared/reducers/application-profile';
import { setLocale } from 'app/shared/reducers/locale';
import Header from 'app/shared/layout/header/header';
import Footer from 'app/shared/layout/footer/footer';
import { hasAnyAuthority } from 'app/shared/auth/private-route';
import ErrorBoundary from 'app/shared/error/error-boundary';
import { AUTHORITIES } from 'app/config/constants';
import AppRoutes from 'app/routes';
// @ts-ignore
import Landing from 'app/modules/landing/landing';
import Login from 'app/modules/login/login';

const baseHref = document.querySelector('base').getAttribute('href').replace(/\/$/, '');

export const App = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getSession());
    dispatch(getProfile());
  }, []);

  const currentLocation = window.location.pathname;
  const deviceWidth = window.innerWidth;

  const currentLocale = useAppSelector(state => state.locale.currentLocale);
  const isAuthenticated = useAppSelector(state => state.authentication.isAuthenticated);
  const isAdmin = useAppSelector(state => hasAnyAuthority(state.authentication.account.authorities, [AUTHORITIES.ADMIN]));
  const ribbonEnv = useAppSelector(state => state.applicationProfile.ribbonEnv);
  const isInProduction = useAppSelector(state => state.applicationProfile.inProduction);
  const isOpenAPIEnabled = useAppSelector(state => state.applicationProfile.isOpenAPIEnabled);
  const isLandingPage = currentLocation == '/';

  const paddingTop = '60px';
  return (
    <BrowserRouter basename={baseHref}>
      {isLandingPage && deviceWidth > 768 ? (
        <ErrorBoundary>
          <Landing />
        </ErrorBoundary>
      ) : (
        <div className="app-container rounded-top " style={{ paddingTop }}>
          <ToastContainer position={toast.POSITION.TOP_RIGHT} className="toastify-container" toastClassName="toastify-toast" />
          <ErrorBoundary>
            <Header
              isAuthenticated={isAuthenticated}
              isAdmin={isAdmin}
              currentLocale={currentLocale}
              ribbonEnv={ribbonEnv}
              isInProduction={isInProduction}
              isOpenAPIEnabled={isOpenAPIEnabled}
            />
          </ErrorBoundary>
          <div className="container-fluid view-container mt-4" id="app-view-container">
            <Card className="jh-card pt-4 pb-8 rounded-top rounded-bottom">
              <ErrorBoundary>
                <AppRoutes />
              </ErrorBoundary>
            </Card>
            <Footer />
          </div>
        </div>
      )}
    </BrowserRouter>
  );
};

export default App;
