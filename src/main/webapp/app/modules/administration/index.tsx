import React from 'react';

import { Route } from 'react-router-dom';
import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';
import UserManagement from './user-management';
import Logs from './logs/logs';
import Health from './health/health';
import Metrics from './metrics/metrics';
import Configuration from './configuration/configuration';
import Docs from './docs/docs';
import GeoLocationLocator from 'app/modules/maps/GeoLocationLocator';
import Payment from 'app/modules/administration/Payment';
import LicenceLocation from 'app/modules/maps/LicenceLocation';

const AdministrationRoutes = () => (
  <div>
    <ErrorBoundaryRoutes>
      <Route path="user-management/*" element={<UserManagement />} />
      <Route path="health" element={<Health />} />
      <Route path="metrics" element={<Metrics />} />
      <Route path="configuration" element={<Configuration />} />
      <Route path="logs" element={<Logs />} />
      <Route path="docs" element={<Docs />} />
      <Route path="location" element={<GeoLocationLocator />} />
      <Route path="location-route" element={<LicenceLocation />} />
      <Route path="payment" element={<Payment />} />
    </ErrorBoundaryRoutes>
  </div>
);

export default AdministrationRoutes;
