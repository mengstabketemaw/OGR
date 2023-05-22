import React, { useEffect, useState } from 'react';
import { Button, Card, CardHeader, Col, Container, Modal, ModalBody, ModalFooter, ModalHeader, Row, Spinner, Table } from 'reactstrap';
import axios from 'axios';
import { isArray } from 'lodash';
import moment from 'moment';
import ShowFieldValue from 'app/shared/common/showFieldValue';
import { useNavigate } from 'react-router-dom';
import { getWorkflowByForm } from 'app/modules/licence/license.reducer';
import { useAppDispatch } from 'app/config/store';

const UserHome = () => {
  const [applications, setApplications] = useState({ loading: true, data: { content: [] } });
  const [detailModal, setDetailModal] = useState({ show: false, id: -1, formId: -1 });

  useEffect(() => {
    axios
      .get('/api/licence/formByUser')
      .then(({ data }) => setApplications({ loading: false, data }))
      .catch(console.log);
  }, []);

  return (
    <>
      <Container className="mt--7 p-7" fluid>
        <Row className="mt-5">
          <Col className="mb-5 mb-xl-0" xl="8">
            <Card className="shadow">
              <CardHeader className="border-0">
                <Row className="align-items-center">
                  <div className="col">
                    <h3 className="mb-0">Applications</h3>
                  </div>
                </Row>
              </CardHeader>

              {applications.loading ? (
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
              ) : !isArray(applications.data.content) || applications.data?.content.length === 0 ? (
                <p>There is no Data</p>
              ) : (
                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">Submitted Date</th>
                      <th scope="col">Name</th>
                      <th scope="col">Type</th>
                      <th scope="col">Stage</th>
                      <th scope="col">Status</th>
                      <th scope="col">Actions</th>
                    </tr>
                  </thead>

                  <tbody>
                    {applications.data?.content.map(data => (
                      <tr key={data.id}>
                        <th>{moment(data.submittedDate).format('MMMM Do YYYY, h:mm:ss a')}</th>
                        <th>{data.form.title}</th>
                        <th>{data.form.type}</th>
                        <th>{data.stage?.name || 'Form'}</th>
                        <th>{data.status}</th>
                        <th>
                          <Button
                            color="primary"
                            onClick={e => setDetailModal({ show: true, id: data.id, formId: data.form.id })}
                            size="sm"
                          >
                            View
                          </Button>
                        </th>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              )}
            </Card>
          </Col>
        </Row>
      </Container>
      <DetailModal
        id={detailModal.id}
        formId={detailModal.formId}
        show={detailModal.show}
        handleClose={() => setDetailModal({ ...detailModal, show: false })}
      />
    </>
  );
};

export const DetailModal = ({ id, formId, show, handleClose }) => {
  const [data, setDate] = useState({ loading: true, data: { data: [] } });
  const nav = useNavigate();

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
        <Button
          onClick={() => {
            nav(`/sequence/${formId}/${id}`);
          }}
        >
          More Action
        </Button>
        <Button onClick={handleClose}>Close</Button>
      </ModalFooter>
    </Modal>
  );
};

export default UserHome;
