import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button, Card, CardHeader, Col, Row, Spinner, Table } from 'reactstrap';
import { isArray } from 'lodash';
import moment from 'moment/moment';
import CustomPagination from 'app/shared/common/CustomPagination';
import axios from 'axios';

const PAGE_SIZE = 5;
const ComplianceMonitoring = () => {
  const [params] = useSearchParams();
  const nav = useNavigate();

  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [inspections, setInspections] = useState({ loading: true, data: { content: [] } });

  const fetchData = page => {
    // Construct the URL with the page query parameter
    const url = `/api/compliance?page=${page}&size=${PAGE_SIZE}&sort=desc`;

    axios
      .get(url)
      .then(({ data }) => {
        // Update the state with the new data and total pages
        setInspections({ loading: false, data });
        setTotalPages(Math.ceil(data.totalElements / PAGE_SIZE));
      })
      .catch(console.log);
  };

  const handlePageChange = pageNumber => {
    setCurrentPage(pageNumber - 1);
    fetchData(pageNumber - 1);
  };

  useEffect(() => {
    // Fetch the initial data when the component mounts
    fetchData(currentPage);
  }, []);

  return (
    <>
      <div className="d-flex justify-content-center">
        <Col className="mb-5 mb-xl-0" md="8">
          <Card className="shadow">
            <CardHeader className="border-0">
              <Row className="align-items-center">
                <div className="col">
                  <h1 className="mb-0">Compliance Monitoring </h1>
                  <h5> View and track compliance with regulations for oil and gas refineries.</h5>
                </div>
              </Row>
            </CardHeader>

            {inspections.loading ? (
              <Spinner
                className="align-self-center"
                color="primary"
                style={{
                  height: '3rem',
                  width: '3rem',
                }}
                type="grow"
              >
                Loading...
              </Spinner>
            ) : !isArray(inspections.data.content) || inspections.data?.content.length === 0 ? (
              <p>There is no Data</p>
            ) : (
              <>
                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">Record Id Date</th>
                      <th scope="col">Company Name</th>
                      <th scope="col">Licence Type</th>
                      <th scope="col">Status</th>
                      <th scope="col">Last Inspection Date</th>
                      <th scope="col">Actions</th>
                    </tr>
                  </thead>

                  <tbody>
                    {inspections.data?.content.map(data => (
                      <tr key={data.id}>
                        <th>{data.id}</th>
                        <th>{moment(data.submittedDate).format('MMMM Do YYYY, h:mm:ss a')}</th>
                        <th>{data.user.firstName}</th>
                        <th>{data.form.title}</th>
                        <th>{data.stage}</th>
                        <th>{data.status}</th>
                        <th>
                          <Button color="primary" onClick={e => setDetailModal({ show: true, id: data.id })} size="sm">
                            View
                          </Button>
                        </th>
                      </tr>
                    ))}
                  </tbody>
                </Table>

                <CustomPagination currentPage={currentPage + 1} totalPages={totalPages} onPageChange={handlePageChange} />
              </>
            )}
          </Card>
        </Col>
      </div>
    </>
  );
};

export default ComplianceMonitoring;
