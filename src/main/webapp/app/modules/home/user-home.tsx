import React, { useEffect, useState } from 'react';
import { Button, Card, CardBody, CardHeader, Col, Container, Modal, ModalBody, ModalFooter, ModalHeader, Row, Spinner } from 'reactstrap';
import axios from 'axios';
import moment from 'moment';
import ShowFieldValue from 'app/shared/common/showFieldValue';
import { useNavigate } from 'react-router-dom';
import { Translate } from 'react-jhipster';
import DeleteLicenceModal from 'app/modules/permit/DeleteLicenceModal';
import UserStats from 'app/modules/dashboard/userStats';
import { ShowRemarkModal } from 'app/modules/home/showRemarkModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoneyBill, faPencil } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons/faTrash';
import profilePic from '../../../content/images/avatar.png';
import { useAppSelector } from 'app/config/store';
import Stages from './stages';
import { CircularProgressbar } from 'react-circular-progressbar';
import { useRef } from 'react/react.shared-subset';
import { useReactToPrint } from 'react-to-print';
import Certificate from 'app/modules/certificates/certificate';

const PAGE_SIZE = 5;
const UserHome = () => {
  const [applications, setApplications] = useState({ loading: true, data: { content: [] } });
  const [detailModal, setDetailModal] = useState({ show: false, id: -1, formId: -1 });
  const nav = useNavigate();
  const [deleteLicence, setDeleteLicence] = useState({ id: -1, show: false, name: '' });
  const [showRemark, setShowRemark] = useState(false);
  const [remark, setRemark] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const account = useAppSelector(state => state.authentication.account);

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

  const certRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => certRef.current,
  });
  const showRemarkModal = value => {
    setShowRemark(true);
    setRemark(value);
  };
  const handleClose = () => {
    setShowRemark(false);
  };

  let numberOfCards = 6;
  let columnClass;
  if (numberOfCards >= 3) {
    columnClass = 'col-lg-4';
  } else if (numberOfCards === 2) {
    columnClass = 'col-lg-6';
  } else {
    columnClass = 'col-lg-12';
  }

  const percentage = 66;

  return (
    <>
      <UserStats />
      <Row>
        <Col className="order-xl-2 pl-0 pr-0" xl="9">
          <Row className="col-12 ml-0 mr-0 pr-0 pl-0">
            {applications.loading ? (
              <Spinner
                className="align-self-center justify-content-center"
                color="primary"
                style={{
                  height: '3rem',
                  width: '3rem',
                }}
                type="grow"
              >
                Loading...
              </Spinner>
            ) : !Array.isArray(applications.data?.content) || applications.data?.content.length === 0 ? (
              <>
                <Card className={'card-profile shadow col-12 col-lg-12 ml-0 mt-2 border-bottom'}>
                  <CardHeader className="text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4"></CardHeader>
                  <CardBody className="pt-0 pt-md-1">
                    <h2>No Data</h2>
                  </CardBody>
                </Card>
              </>
            ) : (
              <>
                {applications.data?.content.map(data => (
                  <Card
                    border="primary"
                    onClick={() => setDetailModal({ show: true, id: data.id, formId: data.form.id })}
                    className={'col-12 ' + columnClass + ' ml-0 mt-2 card-hover '}
                  >
                    <CardHeader className="text-left font-weight-bold border-0 pt-8 pt-md-4 pb-0 pb-md-4 d-flex justify-content-between cursor-">
                      <Translate contentKey={'userDashboard.' + data?.form?.title} />
                      <div style={{ width: 70, height: 70 }}>
                        {data?.status === 'Authorized' ? (
                          <CircularProgressbar value={100} text={`100%`} />
                        ) : data?.status === 'Denied' ? (
                          <CircularProgressbar value={0} text={`0%`} />
                        ) : data.status === 'undefined' ? (
                          <CircularProgressbar value={5} text={`5%`} />
                        ) : data.stage?.name == 'Form' ? (
                          <CircularProgressbar value={10} text={`10%`} />
                        ) : data.stage?.name == 'Initial Review' ? (
                          <CircularProgressbar value={30} text={`30%`} />
                        ) : data.stage?.name == 'Technical Review' ? (
                          <CircularProgressbar value={50} text={`50%`} />
                        ) : data.stage?.name == 'Payment' ? (
                          <CircularProgressbar value={70} text={`70%`} />
                        ) : data.stage?.name == 'Decision Making' ? (
                          <CircularProgressbar value={90} text={`90%`} />
                        ) : (
                          <CircularProgressbar value={60} text={`60%`} />
                        )}
                      </div>
                    </CardHeader>
                    <CardBody className="pt-0 pt-md-1">
                      <Row>
                        <div className="col">
                          <div className="card-profile-stats d-flex justify-content-between">
                            <div>
                              <span className="heading">{moment(data.submittedDate).format('MMM DD, YYYY')}</span>
                              <span className="description">
                                <Translate contentKey={'table.submittedDate'} />
                              </span>
                            </div>
                            <div>
                              <span className="heading">
                                {data.status === 'Inprogress' ? (
                                  <p className="btn btn-sm shadow-none border-0 ">
                                    <span className="font-weight-bold  text-warning"> {data.status}</span>
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
                              </span>
                            </div>
                          </div>
                        </div>
                      </Row>
                      <Row>
                        <div className="col">
                          <div className="card-profile-stats d-flex justify-content-between">
                            <div className="text-center">
                              <h4>
                                <Translate contentKey={'userDashboard.' + data.stage?.name || 'Form'} />
                              </h4>
                              <div className="h5 font-weight-300">
                                <i className="ni location_pin mr-2" />
                                <Translate contentKey={'table.stage'} />
                              </div>
                            </div>

                            <div className="text-center">
                              {data.stage?.id == 3 && !(data.status === 'Authorized' || data.status === 'Denied') && (
                                <Button onClick={() => nav('/checkout/' + data.form.id)} size="sm">
                                  <FontAwesomeIcon color={'green'} size="1x" icon={faMoneyBill} />
                                </Button>
                              )}
                              <Button
                                // color="secondary"
                                color={!(data.stage?.id === 0 || data.stage === null) ? 'light' : 'white'}
                                // className="bg-translucent-light text-dark"
                                onClick={() => nav('/dataUpdate/' + data.id)}
                                disabled={!(data.stage?.id === 0 || data.stage === null)}
                                size="sm"
                              >
                                {/*<Translate contentKey={'entity.action.edit'} />*/}
                                {/*<FontAwesomeIcon icon={faPencil} />*/}
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
                                {/*<Translate contentKey={'entity.action.delete'} />*/}
                                {/*<FontAwesomeIcon  icon={faTrash} />*/}
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
                              {data.status === 'Authorized' && (
                                <>
                                  <button className="border-0 bg-white" onClick={handlePrint}>
                                    button
                                  </button>
                                  <Certificate ref={certRef} />
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                      </Row>
                    </CardBody>
                  </Card>
                ))}
              </>
            )}
          </Row>
        </Col>
        <Col className="order-xl-1 mb-5 mb-xl-0 mt-xl--6" xl="3">
          {/*<Card className="card-profile shadow">*/}
          {/*  <Row className="justify-content-center">*/}
          {/*    <Col className="order-lg-2" lg="3">*/}
          {/*      <div className="card-profile-image">*/}
          {/*        <a href="#pablo" onClick={(e) => e.preventDefault()}>*/}
          {/*          <img*/}
          {/*            alt="..."*/}
          {/*            className="rounded-circle"*/}
          {/*            src={profilePic}*/}
          {/*          />*/}
          {/*        </a>*/}
          {/*      </div>*/}
          {/*    </Col>*/}
          {/*  </Row>*/}
          {/*  <CardHeader className="text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4">*/}
          {/*  </CardHeader>*/}
          {/*  <CardBody className="pt-0 pt-md-1">*/}
          {/*    <Row>*/}
          {/*      <div className="col">*/}
          {/*        <div className="card-profile-stats d-flex justify-content-center">*/}
          {/*          <div>*/}
          {/*            <span className="heading">2</span>*/}
          {/*            <span className="description"><h4><Translate contentKey={'userDashboard.licences'}/> </h4></span>*/}
          {/*          </div>*/}
          {/*          <div>*/}
          {/*            <span className="heading">3</span>*/}
          {/*            <span className="description"><h4><Translate contentKey={'userDashboard.permits'}/> </h4></span>*/}
          {/*          </div>*/}
          {/*        </div>*/}
          {/*      </div>*/}
          {/*    </Row>*/}
          {/*    <Row>*/}
          {/*      <div className="col">*/}
          {/*        <div className="card-profile-stats d-flex justify-content-center">*/}
          {/*          <div className="text-center">*/}
          {/*            <h4>*/}
          {/*              {account.firstName}{'  '}{account.lastName}*/}
          {/*            </h4>*/}
          {/*          </div>*/}

          {/*          <div className="text-center">*/}
          {/*            <h4>*/}
          {/*              {'  '} {account.email}*/}
          {/*            </h4>*/}
          {/*            <div className="h5 font-weight-300">*/}
          {/*              <i className="ni location_pin mr-2"/>*/}
          {/*              <Translate contentKey={'userDashboard.luanda'}/>*/}
          {/*            </div>*/}
          {/*          </div>*/}
          {/*        </div>*/}
          {/*      </div>*/}
          {/*    </Row>*/}
          {/*  </CardBody>*/}
          {/*</Card>*/}
          <Card className="card-profile shadow">
            <CardHeader className="text-left border-0 pt-8 pt-md-4 pb-0">
              <h4>
                <Translate contentKey={'userDashboard.myactivities'} />{' '}
              </h4>
            </CardHeader>
            <CardBody className="pt-0 pt-md-4">
              <Row>
                <React.Fragment>
                  <Stages></Stages>
                </React.Fragment>
              </Row>
            </CardBody>
          </Card>
        </Col>
      </Row>
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
      <ModalHeader toggle={handleClose}>
        {' '}
        <Translate contentKey={'userDashboard.detail'} />{' '}
      </ModalHeader>
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
