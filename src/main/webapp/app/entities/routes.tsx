import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';
import PrivateRoute from 'app/shared/auth/private-route';
import { AUTHORITIES } from 'app/config/constants';
import ApplyPermit from 'app/modules/permit/ApplyPermit';
import ApplyLicence from 'app/modules/licence/ApplyLicence';
import Workflow from 'app/modules/administration/workflow/workflow';
import CheckoutForm from 'app/modules/checkout/checkout';
import Permit from 'app/modules/permit';
/* jhipster-needle-add-route-import - JHipster will add routes here */

export default () => {
  return (
    <div>
      <ErrorBoundaryRoutes>
        <Route
          path="apply-permit"
          element={
            <PrivateRoute hasAnyAuthorities={[AUTHORITIES.USER]}>
              <Permit />
            </PrivateRoute>
          }
        />
        <Route
          path="checkout/:id"
          element={
            <PrivateRoute hasAnyAuthorities={[AUTHORITIES.USER]}>
              <CheckoutForm />
            </PrivateRoute>
          }
        />
        <Route
          path="apply-licence"
          element={
            <PrivateRoute hasAnyAuthorities={[AUTHORITIES.USER]}>
              <ApplyLicence />
            </PrivateRoute>
          }
        />
        <Route
          path="workflow"
          element={
            <PrivateRoute hasAnyAuthorities={[AUTHORITIES.USER]}>
              <Workflow />
            </PrivateRoute>
          }
        />
      </ErrorBoundaryRoutes>
    </div>
  );
};
