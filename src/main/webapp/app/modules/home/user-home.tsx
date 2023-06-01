import React, { useEffect, useState } from 'react';
import { Button, Card, CardHeader, Col, Container, Modal, ModalBody, ModalFooter, ModalHeader, Row, Spinner, Table } from 'reactstrap';
import axios from 'axios';
import { isArray } from 'lodash';
import moment from 'moment';
import ShowFieldValue from 'app/shared/common/showFieldValue';
import { useNavigate } from 'react-router-dom';
import { Translate } from 'react-jhipster';
import DeleteLicenceModal from 'app/modules/permit/DeleteLicenceModal';
import Header from 'app/argon/components/Headers/Header';
import UserStats from 'app/modules/dashboard/userStats';

const UserHome = () => {
  const [applications, setApplications] = useState({ loading: true, data: { content: [] } });
  const [detailModal, setDetailModal] = useState({ show: false, id: -1, formId: -1 });
  const nav = useNavigate();
  const [deleteLicence, setDeleteLicence] = useState({ id: -1, show: false, name: '' });

  useEffect(() => {
    axios
      .get('/api/licence/formByUser')
      .then(({ data }) => setApplications({ loading: false, data }))
      .catch(console.log);
  }, []);

  return (
    <>
      <UserStats />
      <Container className="mt--7 pt-7" fluid>
        <Row className="mt-5">
          <Col className="mb-5 mb-xl-12" xl="12">
            <Card className="shadow">
              <CardHeader className="border-0">
                <Row className="align-items-center">
                  <div className="col">
                    <h3 className="mb-0">
                      <Translate contentKey={'global.applications'} />
                    </h3>
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
                <>
                  <Table className="align-items-center table-flush" responsive>
                    <thead className="thead-light">
                      <tr>
                        <th scope="col">
                          <Translate contentKey={'table.submittedDate'} />{' '}
                        </th>
                        <th scope="col">
                          <Translate contentKey={'table.requested'} />
                        </th>
                        <th scope="col">
                          <Translate contentKey={'table.type'} />
                        </th>
                        <th scope="col">
                          <Translate contentKey={'table.stage'} />
                        </th>
                        <th scope="col">
                          <Translate contentKey={'table.status'} />
                        </th>
                        <th scope="col">
                          <Translate contentKey={'table.actions'} />
                        </th>
                      </tr>
                    </thead>
                  </Table>
                  <p className="align-self-center">
                    <Translate contentKey={'table.noData'} />
                  </p>
                </>
              ) : (
                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">
                        <Translate contentKey={'table.submittedDate'} />{' '}
                      </th>
                      <th scope="col">
                        <Translate contentKey={'table.requested'} />
                      </th>
                      <th scope="col">
                        <Translate contentKey={'table.type'} />
                      </th>
                      <th scope="col">
                        <Translate contentKey={'table.stage'} />
                      </th>
                      <th scope="col">
                        <Translate contentKey={'table.status'} />
                      </th>
                      <th scope="col">
                        <Translate contentKey={'table.actions'} />
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {applications.data?.content.map(data => (
                      <tr key={data.id}>
                        <th>{moment(data.submittedDate).format('MMMM Do YYYY')}</th>
                        <th>{data.form.title}</th>
                        <th>{data.form.type}</th>
                        <th>{data.stage?.name || 'Form'}</th>
                        <th>
                          {data.status === 'Inprogress' ? (
                            <Button className={'btn btn-sm bg-warning text-white'}>{data.status}</Button>
                          ) : data.status === 'Authorized' ? (
                            <Button className={'btn btn-sm bg-gradient-success text-white'}>{data.status}</Button>
                          ) : data.status === 'Denied' ? (
                            <Button className={'btn btn-sm bg-danger text-white'}>{data.status}</Button>
                          ) : (
                            <Button className={'btn btn-sm bg-gradient-info text-white'}>{data.status}</Button>
                          )}
                        </th>
                        <th>
                          <Button
                            color="primary"
                            onClick={() => setDetailModal({ show: true, id: data.id, formId: data.form.id })}
                            size="sm"
                          >
                            <Translate contentKey={'entity.action.view'} />
                          </Button>

                          <Button
                            color="secondary"
                            onClick={() => nav('/dataUpdate/' + data.id)}
                            disabled={!(data.stage?.id === 0 || data.stage === null)}
                            size="sm"
                          >
                            <Translate contentKey={'entity.action.edit'} />
                          </Button>

                          <Button
                            color="danger"
                            onClick={() => setDeleteLicence({ id: data.id, show: true, name: data.form.title })}
                            disabled={!(data.stage?.id === 0 || data.stage === null)}
                            size="sm"
                          >
                            <Translate contentKey={'entity.action.delete'} />
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
      <DetailModal id={detailModal.id} show={detailModal.show} handleClose={() => setDetailModal({ ...detailModal, show: false })} />

      <DeleteLicenceModal
        id={deleteLicence.id}
        show={deleteLicence.show}
        name={deleteLicence.name}
        handleClose={() => setDeleteLicence({ id: -1, show: false, name: '' })}
        updateTable={() =>
          setApplications({
            ...applications,
            data: { content: applications.data.content.filter(license => license.id !== deleteLicence.id) },
          })
        }
      />
    </>
  );
};

export const DetailModal = ({ id, show, handleClose }) => {
  const [data, setDate] = useState({ loading: true, data: { form: { fields: [] }, data: [] } });

  useEffect(() => {
    if (id === -1) return;
    axios
      .get('/api/licence/' + id)
      .then(({ data }) => setDate({ loading: false, data }))
      .catch(console.log);
  }, [id]);

  const getDataBasedOnState = () => {
    if (data.data.data.length) {
      return data.data.data.filter(fieldData =>
        data.data?.form.fields.some(field => field.label === fieldData.label && field.state?.id === 0)
      );
    }
    return [];
  };

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
              <ShowFieldValue data={getDataBasedOnState()} />
            </>
          )}
        </Container>
      </ModalBody>
      <ModalFooter>
        {/*<Button
          onClick={() => {
            nav(`/sequence/${formId}/${id}`);
          }}
        >
          <Translate contentKey={'workflow.moreaction'} />
        </Button>*/}
        <Button onClick={handleClose}>
          <Translate contentKey={'table.close'} />
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default UserHome;
