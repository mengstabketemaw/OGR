import axios from 'axios';
import { useEffect, useState } from 'react';
import React, { useState } from 'react';
import { Button, Card, CardHeader, Col, Container, Modal, ModalBody, ModalFooter, ModalHeader, Row, Spinner, Table } from 'reactstrap';
import CustomPagination from 'app/shared/common/CustomPagination';
import { isArray } from 'lodash';
import moment from 'moment';
import ShowFieldValue from 'app/shared/common/showFieldValue';

const PAGE_SIZE = 5;
export const AdminDashboardTable = ({ type }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [licences, setLicences] = useState({ loading: true, data: { content: [] } });
  const [detailModal, setDetailModal] = useState({ show: false, id: -1 });
  const fetchData = page => {
    // Construct the URL with the page query parameter
    const url = `/api/licence/formByType?type=${type}&page=${page}&size=${PAGE_SIZE}&sort=submittedDate,desc`;

    axios
      .get(url)
      .then(({ data }) => {
        // Update the state with the new data and total pages
        setLicences({ loading: false, data });
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
      <Col className="mb-5 mb-xl-0" xl="6">
        <Card className="shadow">
          <CardHeader className="border-0">
            <Row className="align-items-center">
              <div className="col">
                <h3 className="mb-0">{type === 'permit' ? 'Permits' : 'Licences'}</h3>
              </div>
            </Row>
          </CardHeader>

          {licences.loading ? (
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
          ) : !isArray(licences.data.content) || licences.data?.content.length === 0 ? (
            <p>There is no Data</p>
          ) : (
            <>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Submitted Date</th>
                    <th scope="col">User</th>
                    <th scope="col">Type</th>
                    <th scope="col">Stage</th>
                    <th scope="col">Status</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {licences.data?.content.map(data => (
                    <tr key={data.id}>
                      <th>{moment(data.submittedDate).format('MMMM Do YYYY, h:mm:ss a')}</th>
                      <th>{data.user.firstName}</th>
                      <th>{data.form.title}</th>
                      <th>{data.stage}</th>
                      <th>{data.status}</th>
                      <th>
                        <Button color="primary" href="#details" onClick={e => setDetailModal({ show: true, id: data.id })} size="sm">
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
      <DetailModal id={detailModal.id} show={detailModal.show} handleClose={() => setDetailModal({ ...detailModal, show: false })} />
    </>
  );
};

const DetailModal = ({ id, show, handleClose }) => {
  const [data, setDate] = useState({ loading: true, data: { data: [] } });

  useEffect(() => {
    if (id === -1) return;
    axios
      .get('/api/licence/' + id)
      .then(({ data }) => setDate({ loading: false, data }))
      .catch(console.log);
  }, [id]);

  return (
    <Modal isOpen={show} onClosed={handleClose}>
      <ModalHeader>Detail</ModalHeader>
      <ModalBody>
        <Container className="p--5 d-flex flex-column justify-content-center">
          {data.loading ? (
            <Spinner className="align-self-center" color="primary" style={{ height: '3rem', width: '3rem' }} type="grow">
              Loading...
            </Spinner>
          ) : (
            <>
              <ShowFieldValue data={data.data?.data} />
            </>
          )}
        </Container>
      </ModalBody>
      <ModalFooter>
        <Button onClick={handleClose}>Close</Button>
      </ModalFooter>
    </Modal>
  );
};

export default AdminDashboardTable;
