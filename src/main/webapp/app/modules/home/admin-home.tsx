import './home.scss';
import React from 'react';
import { Row, Container } from 'reactstrap';

import Header from '../../argon/components/Headers/Header.js';
import AdminDashboardTable from 'app/modules/dashboard/adminDashboardTable';

export const AdminHome = () => {
  return (
    <>
      <Header />
      {/* Page content */}
      <Container className="mt--7" fluid>
        <Row className="mt-5">
          <AdminDashboardTable title="Exploration licence" />
          <AdminDashboardTable title="Pipeline Licence" />
        </Row>
        <Row className="mt-5">
          <AdminDashboardTable title="Air Permit" />
          <AdminDashboardTable title="Drilling Permit" />
        </Row>
      </Container>
    </>
  );
};

export default AdminHome;
