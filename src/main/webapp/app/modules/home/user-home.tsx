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
import { ShowRemarkModal } from 'app/modules/home/showRemarkModal';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';
import CustomPagination from 'app/shared/common/CustomPagination';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons/faEye';
import { faMoneyBill, faPencil } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons/faTrash';

const PAGE_SIZE = 4;
const UserHome = () => {
  const [applications, setApplications] = useState({ loading: true, data: { content: [] } });
  const [detailModal, setDetailModal] = useState({ show: false, id: -1, formId: -1 });
  const nav = useNavigate();
  const [deleteLicence, setDeleteLicence] = useState({ id: -1, show: false, name: '' });
  const [showRemark, setShowRemark] = useState(false);
  const [remark, setRemark] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  const fetchData = page => {
    // Construct the URL with the page query parameter
    axios
      .get(`/api/licence/formByUser?page=${page}&size=${PAGE_SIZE}&sort=submittedDate,desc`)
      .then(({ data }) => {
        setApplications({ loading: false, data });
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

  const showRemarkModal = value => {
    setShowRemark(true);
    setRemark(value);
  };
  const handleClose = () => {
    setShowRemark(false);
  };

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
                        <th scope="col" className={'pr-0'}>
                          <Translate contentKey={'table.submittedDate'} />{' '}
                        </th>
                        <th scope="col">
                          <Translate contentKey={'table.requested'} />
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
                <>
                  <Table className="align-items-center table-flush table-hover" responsive>
                    <thead className="thead-light">
                      <tr>
                        <th scope="col" className={'pr-0'}>
                          <Translate contentKey={'table.submittedDate'} />{' '}
                        </th>
                        <th scope="col">
                          <Translate contentKey={'table.requested'} />
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
                          <th onClick={() => setDetailModal({ show: true, id: data.id, formId: data.form.id })} className={'pr-0'}>
                            {moment(data.submittedDate).format('MMM DD, YYYY')}
                          </th>
                          <th onClick={() => setDetailModal({ show: true, id: data.id, formId: data.form.id })}>{data.form.title}</th>
                          {/*<th onClick={() => setDetailModal({ show: true, id: data.id, formId: data.form.id })}>{data.form.type}</th>*/}
                          <th onClick={() => setDetailModal({ show: true, id: data.id, formId: data.form.id })}>
                            {data.stage?.name || 'Form'}
                          </th>
                          <th onClick={() => setDetailModal({ show: true, id: data.id, formId: data.form.id })} className={'pl-0 pr-0'}>
                            {data.status === 'Inprogress' ? (
                              <p className="btn btn-sm shadow-none border-0 ">
                                <span className="font-weight-bold  text-warning">{data.status}</span>
                              </p>
                            ) : data.status === 'Authorized' ? (
                              <p className="btn btn-sm shadow-none border-0 ">
                                <span className={'font-weight-bold text-success'}>{data.status}</span>
                              </p>
                            ) : data.status === 'Denied' ? (
                              <p className="btn btn-sm shadow-none border-0 ">
                                <span className={' font-weight-bold text-danger'}>{data.status}</span>
                              </p>
                            ) : data.status === 'undefined' ? (
                              <p className="btn btn-sm shadow-none border-0">
                                <span className={'font-weight-bold  text-gray'}>Inprogress</span>
                              </p>
                            ) : (
                              <p className="btn btn-sm shadow-none border-0">
                                <span className={' font-weight-bold text-info'}>{data.status}</span>
                              </p>
                            )}
                          </th>
                          <th>
                            <Button
                              // color="primary"
                              className="bg-translucent-primary text-primary"
                              onClick={() => setDetailModal({ show: true, id: data.id, formId: data.form.id })}
                              size="sm"
                            >
                              {/*<Translate contentKey={'entity.action.view'} />*/}
                              <FontAwesomeIcon icon={faEye} />
                            </Button>

                            <Button
                              // color="secondary"
                              color={!(data.stage?.id === 0 || data.stage === null) ? 'light' : 'white'}
                              // className="bg-translucent-light text-dark"
                              onClick={() => nav('/dataUpdate/' + data.id)}
                              disabled={!(data.stage?.id === 0 || data.stage === null)}
                              size="sm"
                            >
                              <FontAwesomeIcon
                                color={!(data.stage?.id === 0 || data.stage === null) ? 'white' : 'blue'}
                                size="1x"
                                icon={faPencil}
                              />
                            </Button>

                            <Button
                              // color="danger"
                              // className="bg-translucent-danger text-danger"
                              color={!(data.stage?.id === 0 || data.stage === null) ? 'light' : 'white'}
                              onClick={() => setDeleteLicence({ id: data.id, show: true, name: data.form.title })}
                              disabled={!(data.stage?.id === 0 || data.stage === null)}
                              size="sm"
                            >
                              <FontAwesomeIcon
                                color={!(data.stage?.id === 0 || data.stage === null) ? 'white' : 'red'}
                                size="1x"
                                icon={faTrash}
                              />
                            </Button>
                            {data.remark && !(data.status === 'Authorized' || data.status === 'Denied') && (
                              <Button color="warning" onClick={() => showRemarkModal(data.remark)} size="sm">
                                <Translate contentKey={'workflow.requestInfo'} />
                              </Button>
                            )}
                            {data.stage?.id == 3 && !(data.status === 'Authorized' || data.status === 'Denied') && (
                              <Button onClick={() => nav('/checkout/' + data.form.id)} size="sm">
                                <FontAwesomeIcon color={'green'} size="1x" icon={faMoneyBill} />
                                <Translate contentKey={'checkout.continueToCheckout'} />
                              </Button>
                            )}
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
        </Row>
      </Container>
      <DetailModal id={detailModal.id} show={detailModal.show} handleClose={() => setDetailModal({ ...detailModal, show: false })} />
      <ShowRemarkModal showModal={showRemark} content={remark} handleClose={handleClose} />
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
      <ModalHeader toggle={handleClose}>Detail</ModalHeader>
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
