import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';
import PrivateRoute from 'app/shared/auth/private-route';
import { AUTHORITIES } from 'app/config/constants';
import ApplyPermit from 'app/modules/permit/ApplyPermit';

/* jhipster-needle-add-route-import - JHipster will add routes here */

export default () => {
  return (
    <div>
      <ErrorBoundaryRoutes>
        <Route
          path="apply-permit"
          element={
            <PrivateRoute hasAnyAuthorities={[AUTHORITIES.USER]}>
              <ApplyPermit />
            </PrivateRoute>
          }
        />
      </ErrorBoundaryRoutes>
    </div>
  );
};
