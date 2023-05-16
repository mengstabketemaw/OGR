import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import loading = toast.loading;
import { Button, Card, CardHeader, Col, Container, Modal, ModalBody, ModalFooter, ModalHeader, Row, Spinner, Table } from 'reactstrap';
import { isArray } from 'lodash';
import moment from 'moment/moment';
import CustomPagination from 'app/shared/common/CustomPagination';
import ShowFieldValue from 'app/shared/common/showFieldValue';
import { DetailModal } from 'app/modules/home/user-home';

const FormData = () => {
  const [updateModal, setUpdateModal] = useState({ show: false, data: {} });
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [licences, setLicences] = useState({ loading: true, data: { content: [] } });
  const [detailModal, setDetailModal] = useState({ show: false, id: -1, formId: -1 });
  const [param] = useSearchParams();

  const fetchData = page => {
    // Construct the URL with the page query parameter
    const url = `/api/licence/form/${param.get('pageKey')}?page=${page}&size=${10}&sort=submittedDate,desc`;

    axios
      .get(url)
      .then(({ data }) => {
        // Update the state with the new data and total pages
        setLicences({ loading: false, data });
        setTotalPages(Math.ceil(data.totalElements / 10));
      })
      .catch(console.log);
  };

  const handleShowUpdateModal = id => {};

  const handlePageChange = pageNumber => {
    setCurrentPage(pageNumber - 1);
    fetchData(pageNumber - 1);
  };

  useEffect(() => {
    // Fetch the initial data when the component mounts
    fetchData(currentPage);
  }, []);

  return (
    <Row className="d-flex justify-content-center">
      <Col md="8">
        <Card className="shadow">
          <CardHeader className="border-0">
            <Row className="align-items-center">
              <div className="col">
                <h3 className="mb-0">{param.get('name')}</h3>
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
              </Table>
              <p className="align-self-center">There is no Data</p>
            </>
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
                        <Button color="primary" onClick={e => setDetailModal({ show: true, id: data.id, formId: data.form.id })} size="sm">
                          View
                        </Button>

                        <Button color="secondary" onClick={e => handleShowUpdateModal(data.id)} size="sm">
                          Update
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
      <DetailModal
        id={detailModal.id}
        formId={detailModal.formId}
        show={detailModal.show}
        handleClose={() => setDetailModal({ ...detailModal, show: false })}
      />
    </Row>
  );
};
export default FormData;
