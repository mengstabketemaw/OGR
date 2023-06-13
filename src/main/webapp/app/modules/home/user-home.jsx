import React, { useEffect, useRef, useState } from 'react';
import { Button, Card, CardBody, CardHeader, Col, Container, Modal, ModalBody, ModalFooter, ModalHeader, Row, Spinner } from 'reactstrap';
import axios from 'axios';
import moment from 'moment';
import ShowFieldValue from 'app/shared/common/showFieldValue';
import { useNavigate } from 'react-router-dom';
import { Translate, translate } from 'react-jhipster';
import DeleteLicenceModal from 'app/modules/permit/DeleteLicenceModal';
import UserStats from 'app/modules/dashboard/userStats';
import { ShowRemarkModal } from 'app/modules/home/showRemarkModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faFileAlt, faFilePdf, faInfo, faMoneyBill, faPencil, faPrint, faUndo} from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons/faTrash';
import profilePic from '../../../content/images/avatar.png';
import { useAppSelector } from 'app/config/store';
import Stages from './stages';
import { CircularProgressbar } from 'react-circular-progressbar';
import ReactToPrint, { useReactToPrint } from 'react-to-print';
import Certificate from 'app/modules/certificates/certificate';
import medal from './assets/medal.png';
import {Amendment} from "app/modules/home/amendment";

const PAGE_SIZE = 5;
const UserHome = () => {
  const [applications, setApplications] = useState({ loading: true, data: { content: [] } });
  const [detailModal, setDetailModal] = useState({ show: false, id: -1, formId: -1 });
  const nav = useNavigate();
  const [deleteLicence, setDeleteLicence] = useState({ id: -1, show: false, name: '' });
  const [showRemark, setShowRemark] = useState(false);
  const [remark, setRemark] = useState('');
  const [id,setId] = useState(0)
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const account = useAppSelector(state => state.authentication.account);
  const [showAmen, setshowAmen] = useState(false);
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

  const showRemarkModal = (value) => {
    setShowRemark(true);
    setRemark(value);
  };
  const [printData,setPrintData] = useState(null)
  const handleClose = () => {
    setShowRemark(false);
  };
  const certRef = useRef();

  const handleBeforeGetContent = (data) => {
    setPrintData(data);
    return Promise.resolve();
  }

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
        <Col className="order-xl-2 pl-0 pr-0  " xl="9">
          <Row className=" ml-0 mr-0 pr-0 pl-0">
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
                <Card className={'card-profile shadow  ml-0 mt-2 border-bottom'}>
                  <CardHeader className="text-center border-0 pt-md-4 pb-0 pb-md-4 d-flex justify-content-between"></CardHeader>
                  <CardBody className="pt-0 pt-md-1">
                    <h2> <Translate contentKey={'global.noApplied'} /> </h2>
                  </CardBody>
                </Card>
              </>
            ) : (
              <>
                {applications.data?.content.map(data => (
                  <Card border="primary" className={'col-12 col-lg-3 col-md-4 col-sm-6  ml-0 mr-lg-4 mt-2 card-hover pl-4 pr-2 w-50 '}
                  >
                    <CardHeader
                      // onClick={() => setDetailModal({ show: true, id: data.id, formId: data.form.id })}
                      className="text-left font-weight-bold border-0 pl-0 pr-0  pt-md-4 pb-0 d-flex pr-0 justify-content-between "
                    >
                      <span className="h3 "
                      onClick={() => setDetailModal({ show: true, id: data.id, formId: data.form.id })}
                      >
                      <Translate  contentKey={'userDashboard.' + data?.form?.title} />
                        </span>
                      <div className="text-center position-relative">
                      <div style={{ width: 50, height: 50 }}>
                        {data?.status === 'Authorized' ? (
                          <>
                            <ReactToPrint
                              onBeforeGetContent={async () => {
                                await handleBeforeGetContent({
                                  title: translate('userDashboard.' + data?.form?.title),
                                  companyName: account.firstName,
                                  location: "Cabinda",
                                  fromDate: moment(data.apporvedDate).format('YYYY-MM-DD'),
                                  type: data?.form?.id,
                                  link: window.location.origin + `/certificate-validator/${data?.id}`
                                })
                              }}
                              trigger={() =>

                                // <button className="border-0 bg-white">button</button>
                                <img className="w-100 h-100 text-right position-relative left-4" src={medal} />

                            }
                              content={() => certRef.current}
                            />

                            {printData && <Certificate
                              data={printData}
                              ref={certRef} />}
                          </>

                        ) : data?.status === 'Denied' ? (
                          <CircularProgressbar className="position-relative left-1" value={0} text={`0%`} />
                        ) : data.status === 'undefined' ? (
                          <CircularProgressbar className="position-relative left-3" value={5} text={`5%`} />
                        ) : data.stage?.name == 'Form' ? (
                          <CircularProgressbar className="position-relative left-3" value={10} text={`10%`} />
                        ) : data.stage?.name == 'Initial Review' ? (
                          <CircularProgressbar className="position-relative left-3" value={30} text={`30%`} />
                        ) : data.stage?.name == 'Technical Review' ? (
                          <CircularProgressbar className="position-relative left-3" value={50} text={`50%`} />
                        ) : data.stage?.name == 'Payment' ? (
                          <CircularProgressbar className="position-relative left-3" value={70} text={`70%`} />
                        ) : data.stage?.name == 'Decision Making' ? (
                          <CircularProgressbar className="position-relative left-3" value={90} text={`90%`} />
                        ) : (
                          <CircularProgressbar className="position-relative left-3" value={60} text={`60%`} />
                        )}

                      </div>
                      <span className="heading">
                                {data.status === 'Inprogress' ? (
                                  <p className="btn btn-sm pt-0 shadow-none border-0 d-flex flex-column text-center">
                                    <span className="font-weight-bold  text-warning"> {data.status}</span>
                                    <span className="h6 description mt-1" style={{fontSize:"11px"}}>
                                    <Translate contentKey={'userDashboard.' + data.stage?.name || 'Form'} />
                                  </span>
                                  </p>
                                ) : data.status === 'Authorized' ? (
                                  <p className="btn btn-sm shadow-none border-0 d-flex flex-column text-center ">
                                    <span className={'font-weight-bold text-success'}>{data.status}</span>
                                    <span className="h6 description mt-1 invisible" style={{fontSize:"11px"}}>
                                    <Translate contentKey={'userDashboard.' + data.stage?.name || 'Form'} />
                                  </span>
                                  </p>
                                ) : data.status === 'Denied' ? (
                                  <p className="btn btn-sm shadow-none border-0 ">
                                    <span className={' font-weight-bold text-danger'}>{data.status}</span>
                                  </p>
                                ) : data.status === 'undefined' ? (
                                  <p className="btn btn-sm shadow-none border-0 d-flex flex-column">
                                    <span className={'font-weight-bold  text-gray'}>Inprogress</span>
                                    <div className="h6 description" style={{fontSize:"11px"}}>
                                      <Translate contentKey={'userDashboard.' + data.stage?.name || 'Form'} />
                                    </div>
                                  </p>
                                ) : (
                                  <p className="btn btn-sm shadow-none border-0 d-flex flex-column">
                                    <span className={' font-weight-bold text-info'}>{data.status}</span>
                                    <div className="h6 description" style={{fontSize:"11px"}}>
                                      <Translate contentKey={'userDashboard.' + data.stage?.name || 'Form'} />
                                    </div>

                                  </p>
                                )}
                              </span>
                      </div>

                    </CardHeader>
                    <CardBody className="pt-0 pt-md-1 pl-0 pr-0 pb-0">
                      <Row className={"pb-0"} >
                        <div className="col pb-0">
                          <div className="card-profile-stats d-flex justify-content-between mr-0 ml-0 pb-0 mr-2">
                            <div
                              onClick={() => setDetailModal({ show: true, id: data.id, formId: data.form.id })}
                              className={"mr-0 ml-0  pr-0 smaller-div pl-0 text-left pr-0"}>
                              <span style={{fontSize:"12px"}} className="heading h5 pb-0 mb-0">{moment(data.submittedDate).format('MMM DD, YYYY')}</span>
                              <span className="description p" style={{fontSize:"11px"}}>
                                <Translate contentKey={'table.submittedDate'} />
                              </span>
                            </div>
                            <div className="card-profile-stats d-flex justify-content-between pt-0 pl-0 pr-0">
                              <div className="text-right pl-0 pr-0 ">
                                {data.stage?.id == 3 && !data.payment && !(data.status === 'Authorized' || data.status === 'Denied') && (
                                  <Button className="ml-0 mt-1 " onClick={() => nav(`/checkout/${data.form.id}?licenceId=${data.id}`)} size="sm">
                                    <FontAwesomeIcon color={'green'} size="1x" icon={faMoneyBill} />
                                  </Button>
                                )}

                                {data?.status === 'Authorized' ? (
                                  <>
                                    <ReactToPrint
                                      onBeforeGetContent={async () => {
                                        await handleBeforeGetContent({
                                          title: translate('userDashboard.' + data?.form?.title),
                                          companyName: account.firstName,
                                          location: "Cabinda",
                                          fromDate: moment(data.apporvedDate).format('YYYY-MM-DD'),
                                          type: data?.form?.id,
                                          link: window.location.origin + `/certificate-validator/${data?.id}`
                                        })
                                      }}
                                      trigger={() =>

                                        // <button className="border-0 bg-white">button</button>
                                        <Button color="white" size="sm" className="ml-0 mt-1 pt-0 pb-0 pl-1 pr-1">
                                          <FontAwesomeIcon color="teal" size="2x"  icon={faPrint} />
                                        </Button>
                                      }
                                      content={() => certRef.current}
                                    />

                                    {printData && <Certificate
                                      data={printData}
                                      ref={certRef} />}
                                  </>
                                ): ""}
                                {data?.status === 'Authorized' || data?.status === 'Denied' ?
                                <Button className="ml-0 mt-1 "
                                  // color="secondary"
                                  color={'white'}
                                  // className="bg-translucent-light text-dark"
                                  onClick={() =>{ setId(data.id)
                                    setshowAmen(true)}}

                                  size="sm"
                                >
                                  {/*<Translate contentKey={'entity.action.edit'} />*/}
                                  {/*<FontAwesomeIcon icon={faPencil} />*/}
                                  <FontAwesomeIcon
                                    color={'blue'}
                                    size="1x"
                                    icon={faPencil}
                                  />
                                </Button> :
                                <Button className="ml-0 mt-1 "
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
                                </Button>}
                                <Button className="ml-0 mt-1 "
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
                                  <Button  className="ml-0 mt-1 " color="white" onClick={() => showRemarkModal(data.remark)} size="sm">
                                    <FontAwesomeIcon color={'blue'} icon={faInfo} />
                                  </Button>
                                )}

                              </div>
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

        <Col className="order-xl-1 mb-5 mb-xl-0 mt-xl--6  col-sm-6 col-12" xl="3">
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
      <ShowRemarkModal  showModal={showRemark} content={remark} handleClose={handleClose} />
      <Amendment  id = {id} showModal={showAmen} handleClose={()=>{setshowAmen(false)}}/>
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
        {data.data.form?.title?.slice(0,2).toUpperCase()}{data.data?.id}496
      </ModalHeader>
      <ModalBody>
        <Container className="d-flex flex-column justify-content-center">
          {data.loading ? (
            <Spinner className="align-self-center" color="primary" style={{ height: '3rem', width: '3rem' }} type="grow">
              Loading...
            </Spinner>
          ) : (
            <>
              <div className="d-flex justify-content-between align-items-end">
                <span className="text-black fs-4"><Translate contentKey={"userManagement.firstName"}/>: <span style={{ color:"rgb(82, 95, 127)"}}>{data.data.user.firstName}</span></span>
                <span className="text-black" style={{fontSize:"12px"}}><Translate contentKey={'table.submittedDate'} />: <span>{moment(data.data.submittedDate).format('MMM DD, YYYY')}</span></span>
              </div>
              <ShowFieldValue data={getDataBasedOnState()} form={data?.data.form} />
            </>
          )}
        </Container>
      </ModalBody>
      <ModalFooter>
        <Button onClick={handleClose}>
          <Translate contentKey={'table.close'} />
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default UserHome;
