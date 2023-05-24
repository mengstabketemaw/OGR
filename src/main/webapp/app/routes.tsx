import React from 'react';
import { Route } from 'react-router-dom';
import Loadable from 'react-loadable';

import Login from 'app/modules/login/login';
import Register from 'app/modules/account/register/register';
import Activate from 'app/modules/account/activate/activate';
import PasswordResetInit from 'app/modules/account/password-reset/init/password-reset-init';
import PasswordResetFinish from 'app/modules/account/password-reset/finish/password-reset-finish';
import Logout from 'app/modules/login/logout';
import Home from 'app/modules/home/home';
import EntitiesRoutes from 'app/entities/routes';
import PrivateRoute from 'app/shared/auth/private-route';
import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';
import PageNotFound from 'app/shared/error/page-not-found';
import { AUTHORITIES } from 'app/config/constants';
import Permit from 'app/modules/permit';
import Licence from 'app/modules/licence';
import FormData from 'app/modules/administration/FormData';
import SequenceLanding from 'app/modules/administration/workflow/sequenceLanding';
import ComplianceMonitoring from 'app/modules/compliance/complianceMonitoring';
import { ComplianceDetail } from 'app/modules/compliance/complianceDetail';
import FormUpdateLandingPage from 'app/shared/form/form-update-landing-page';
import { InspectionReport } from 'app/modules/compliance/inspectionReport';
import { ComplianceUser } from 'app/modules/complianceUser/complianceUser';
const loading = <div>loading ...</div>;

const Account = Loadable({
  loader: () => import(/* webpackChunkName: "account" */ 'app/modules/account'),
  loading: () => loading,
});

const Admin = Loadable({
  loader: () => import(/* webpackChunkName: "administration" */ 'app/modules/administration'),
  loading: () => loading,
});

// const Licence = Loadable({
//   loader: () => import(/* webpackChunkName: "administration" */ 'app/modules/licence'),
//   loading: () => loading,
// });

const Form = Loadable({
  loader: () => import(/* webpackChunkName: "administration" */ 'app/modules/form'),
  loading: () => loading,
});

const deviceWidth = window.innerWidth;

const AppRoutes = () => {
  return (
    <div className="view-routes">
      <ErrorBoundaryRoutes>
        <Route path="home" element={<Home />} />
        <Route path={deviceWidth < 768 ? '/login' : '/'} element={<Login />} />
        <Route path="logout" element={<Logout />} />
        <Route path="permit" element={<Permit />} />
        <Route path="licence" element={<Licence />} />
        {/*        <Route path="sequence" element={<TempLanding />} />*/}
        <Route path="compliance" element={<ComplianceMonitoring />} />
        <Route path="sequence/:formId/:id" element={<SequenceLanding />} />
        <Route path="account">
          <Route
            path="*"
            element={
              <PrivateRoute hasAnyAuthorities={[AUTHORITIES.ADMIN, AUTHORITIES.USER]}>
                <Account />
              </PrivateRoute>
            }
          />
          <Route path="register" element={<Register />} />
          <Route path="activate" element={<Activate />} />
          <Route path="reset">
            <Route path="request" element={<PasswordResetInit />} />
            <Route path="finish" element={<PasswordResetFinish />} />
          </Route>
        </Route>
        <Route
          path="admin/*"
          element={
            <PrivateRoute hasAnyAuthorities={[AUTHORITIES.ADMIN]}>
              <Admin />
            </PrivateRoute>
          }
        />

        <Route
          path="form/*"
          element={
            <PrivateRoute hasAnyAuthorities={[AUTHORITIES.ADMIN]}>
              <Form />
            </PrivateRoute>
          }
        />
        <Route
          path="formData/*"
          element={
            <PrivateRoute hasAnyAuthorities={[AUTHORITIES.ADMIN]}>
              <FormData />
            </PrivateRoute>
          }
        />
        <Route
          path="complianceHistory/*"
          element={
            <PrivateRoute hasAnyAuthorities={[AUTHORITIES.ADMIN]}>
              <ComplianceDetail />
            </PrivateRoute>
          }
        />
        <Route
          path="compliance"
          element={
            <PrivateRoute hasAnyAuthorities={[AUTHORITIES.ADMIN]}>
              <ComplianceMonitoring />
            </PrivateRoute>
          }
        />

        <Route
          path="complianceUser/*"
          element={
            <PrivateRoute hasAnyAuthorities={[AUTHORITIES.USER]}>
              <ComplianceUser />
            </PrivateRoute>
          }
        />

        <Route
          path="inspectionReport/*"
          element={
            <PrivateRoute hasAnyAuthorities={[AUTHORITIES.ADMIN]}>
              <InspectionReport />
            </PrivateRoute>
          }
        />

        <Route
          path="dataUpdate/:id"
          element={
            <PrivateRoute hasAnyAuthorities={[AUTHORITIES.USER]}>
              <FormUpdateLandingPage />
            </PrivateRoute>
          }
        />

        <Route
          path="*"
          element={
            <PrivateRoute hasAnyAuthorities={[AUTHORITIES.USER]}>
              <EntitiesRoutes />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<PageNotFound />} />
      </ErrorBoundaryRoutes>
    </div>
  );
};

export default AppRoutes;
