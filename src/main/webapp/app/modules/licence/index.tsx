import React from 'react';

import { Route } from 'react-router-dom';
import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';
import ExplorationLicence from './exploration-licence/exploration-licence';

const LicenceRoute = () => (
  <div>
    <ErrorBoundaryRoutes>
      <Route path="exploration" element={<ExplorationLicence />} />
    </ErrorBoundaryRoutes>
  </div>
);

export default LicenceRoute;
