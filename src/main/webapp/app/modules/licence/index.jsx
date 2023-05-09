import React from 'react';

import { Route } from 'react-router-dom';
import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';
import ExplorationLicence from './exploration-licence/exploration-licence';
import PipelineLicence from 'app/modules/licence/pipeline-licence/pipeline-licence';

const LicenceRoute = () => (
  <div>
    <ErrorBoundaryRoutes>
      <Route path="exploration" element={<ExplorationLicence />} />
      <Route path="pipeline" element={<PipelineLicence />} />
    </ErrorBoundaryRoutes>
  </div>
);

export default LicenceRoute;
