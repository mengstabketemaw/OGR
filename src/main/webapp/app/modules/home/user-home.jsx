import React, { useEffect, useRef, useState } from 'react';
import { Button, Card, CardBody, CardHeader, Col, Modal, ModalBody, ModalFooter, ModalHeader, Row, Spinner } from 'reactstrap';
import axios from 'axios';
import moment from 'moment';
import ShowFieldValue from 'app/shared/common/showFieldValue';
import { useNavigate } from 'react-router-dom';
import { Translate, translate } from 'react-jhipster';
import DeleteLicenceModal from 'app/modules/permit/DeleteLicenceModal';
import UserStats from 'app/modules/dashboard/userStats';
import { ShowRemarkModal } from 'app/modules/home/showRemarkModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFilePdf,
  faInfoCircle,
  faMoneyBill,
  faPencil
} from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons/faTrash';
import Stages from './stages';
import { CircularProgressbar } from 'react-circular-progressbar';
import ReactToPrint from 'react-to-print';
import Certificate from 'app/modules/certificates/certificate';
import medal from './assets/medal.png';
import {Amendment} from "app/modules/home/amendment";
import UserNotification from "app/modules/home/UserNotification";
import {trans} from "app/shared/common/translator";

const UserHome = () => {
  const [applications, setApplications] = useState({ loading: true, data: { content: [] } });
  const [detailModal, setDetailModal] = useState({ show: false, id: -1, formId: -1 });
  const nav = useNavigate();
  const [deleteLicence, setDeleteLicence] = useState({ id: -1, show: false, name: '' });
  const [showRemark, setShowRemark] = useState(false);
  const [remark, setRemark] = useState('');
  const [id,setId] = useState(0)
  const [showAmen, setshowAmen] = useState(false);
  const fetchData = () => {
    axios
      .get(`/api/licence/formByUser?page=0&size=100&sort=submittedDate,desc`)
      .then(({ data }) => {
        setApplications({ loading: false, data });
      })
      .catch(console.log);
  };

  useEffect(() => {
    fetchData();
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
  const isMobile = window.innerWidth <= 850;


  return (
    <>

      <UserStats />
      <Row>
        <Col className="order-xl-2 pl-0 pr-0" xl="9">
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
                  <Card border="gray" className={'col-12 col-lg-3 col-md-4 col-sm-6  ml-0 mr-lg-2 mt-2 card-hover pl-4 pr-2 w-50 '}
                  >
                    <CardHeader
                      onClick={() => setDetailModal({ show: true, id: data.id, formId: data.form.id })}
                      className="text-left font-weight-bold border-0 pl-0 pr-0 pt-3 pb-0 d-flex pr-0 justify-content-between "
                    >
                      <span className="h3 "
                      onClick={() => setDetailModal({ show: true, id: data.id, formId: data.form.id })}
                      >
                      <Translate  contentKey={'userDashboard.' + data?.form?.title || "Form"} />
                        </span>
                      <div className="text-right"  >
                      <div className="badges"  style={{ width: 50, height: 50,position:"absolute",left:"80%",top:"3%" }}>
                        {data?.status === 'Approved' || data?.status === 'Expired' ? (
                       <img  className="w-100 h-100 text-right" src={medal} />
                        ) : data?.status === 'Denied' ? (
                          <CircularProgressbar  value={0} text={`0%`} />
                        ) : data.status === 'undefined' ? (
                          <CircularProgressbar  value={5} text={`5%`} />
                        ) : data.stage?.name === 'Form' ? (
                          <CircularProgressbar  value={10} text={`10%`} />
                        ) : data.stage?.name === 'Initial Review' ? (
                          <CircularProgressbar  value={30} text={`30%`} />
                        ) : data.stage?.name === 'Technical Review' ? (
                          <CircularProgressbar  value={50} text={`50%`} />
                        ) : data.stage?.name === 'Payment' ? (
                          <CircularProgressbar  value={70} text={`70%`} />
                        ) : data.stage?.name === 'Decision Making' ? (
                          <CircularProgressbar  value={90} text={`90%`} />
                        ) : (
                          <CircularProgressbar  value={60} text={`60%`} />
                        )}

                      </div>
                      </div>

                    </CardHeader>
                    <CardBody className="pt-0 pt-md-1 pl-0 pr-0 pb-0">
                      <Row onClick={() => setDetailModal({ show: true, id: data.id, formId: data.form.id })} className={"pb-0 pt-1"} >
                        <div className="col pb-0">
                          <div className="card-profile-stats d-flex justify-content-between mr-0 ml-0 pb-0 mr-2">
                            <div
                              className={"mr-0 ml-0  pr-0 smaller-div pl-0 text-left pr-0"}>
                              <span style={{fontSize:"12px"}} className="heading h5 pb-0 mb-0">
                               {data?.form?.title?.slice(0,2).toUpperCase()}{data?.id}496
                              </span>
                              <span className="description p" style={{fontSize:"11px"}}>
                                <Translate contentKey={'table.applicationNumber'} />
                              </span>
                            </div>
                            <div className="card-profile-stats d-flex justify-content-between pl-0 pr-0">
                               <span className="heading">
                                {data.status === 'Inprogress' ? (
                                  <p className="btn btn-sm pt-0 shadow-none border-0 d-flex flex-column text-right mb-0 pr-0">
                                    <span className="font-weight-bold  text-warning">{trans('status',data.status)}</span>
                                    <span className="h6 description mt-1 text-right" style={{fontSize:"11px"}}>
                                    {data.stage?.name || 'Form'}
                                  </span>
                                  </p>
                                ) : data.status === 'Approved' ? (
                                  <p className="btn btn-sm shadow-none border-0 d-flex flex-column text-right mb-0 pr-0 ">
                                    <span className={'font-weight-bold text-success text-right'}>{trans('status',data.status)}</span>
                                    <span className="h6 description mt-1 invisible text-right" style={{fontSize:"11px"}}>
                                    {data.stage?.name || 'Form'}
                                  </span>
                                  </p>
                                ) : data.status === 'Expired' ? (
                                  <p className="btn btn-sm shadow-none border-0 d-flex flex-column text-right mb-0 pr-0 ">
                                    <span className={'font-weight-bold text-danger text-right'}>{trans('status',data.status)}</span>
                                    <span className="h6 description mt-1 invisible text-right" style={{fontSize:"11px"}}>
                                    {data.stage?.name || 'Form'}
                                  </span>
                                  </p>
                                )
                                  : data.status === 'Denied' ? (
                                  <p className="btn btn-sm shadow-none border-0 d-flex flex-column text-right mb-0 pr-0 ">
                                    <span className={' font-weight-bold text-danger text-right'}>{trans('status',data.status)}</span>
                                    <span className="h6 description mt-1 invisible text-right" style={{fontSize:"11px"}}>
                                    {data.stage?.name || 'Form'}
                                  </span>
                                  </p>
                                ) : data.status === 'undefined' ? (
                                  <p className="btn btn-sm shadow-none border-0 d-flex flex-column text-right mb-0 pr-0">
                                    <span className={'font-weight-bold  text-gray text-right'}>{trans('status','Inprogress')}</span>
                                    <div className="h6 description text-right" style={{fontSize:"11px"}}>
                                      {data.stage?.name || 'Form'}
                                    </div>
                                  </p>
                                ) : (
                                  <p className="btn btn-sm shadow-none border-0 d-flex flex-column text-right mb-0 pr-1">
                                    <span className={' font-weight-bold text-warning text-right'}>{trans('status',data.status)}</span>
                                    <div className="h6 description text-right" style={{fontSize:"11px"}}>
                                      {data.stage?.name || 'Form'}
                                    </div>
                                  </p>
                                )}
                              </span>
                            </div>
                          </div>
                        </div>
                      </Row>
                      <Row className={"pb-0 pt-0"} >
                        <div className="col pb-0">
                          <div className="card-profile-stats d-flex justify-content-between mr-0 ml-0 pb-0 pt-0 mr-2">
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
                                {data.stage?.id == 3 && !data.payment && !(data.status === 'Approved' || data.status === 'Denied') && (
                                  <Button color="black" className="ml-0 mt-1 mr-0" onClick={() => nav(`/checkout/${data.form.id}?licenceId=${data.id}`)} size="sm">
                                    <FontAwesomeIcon color={'teal'}  style={{fontSize:"18px"}} size="1x" icon={faMoneyBill} />
                                  </Button>
                                )}

                                {data?.status === 'Approved' || data?.status === 'Expired' ? (
                                  <>
                                    {isMobile ?
                                    <Button color="black" tag={"a"} size="sm" href={window.location.origin + `/certificate-validator/${data?.id}`} className="ml-0 mt-1 mr-0">
                                      <FontAwesomeIcon style={{fontSize:"20px"}} color="teal" size="1x"  icon={faFilePdf} />
                                    </Button>
                                      :
                                    <ReactToPrint
                                      onBeforeGetContent={async () => {
                                        await handleBeforeGetContent({
                                          title: translate('userDashboard.' + data?.form?.title || "Form"),
                                          companyName: data?.user.firstName,
                                          location: "Cabinda",
                                          fromDate: moment(data.approvedDate || data.submittedDate).format('YYYY-MM-DD'),
                                          type: data?.form?.id,
                                          link: window.location.origin + `/certificate-validator/${data?.id}`,
                                          licenceId: `${data.form?.title?.slice(0,2).toUpperCase()}`+`${data?.id}`+`496`,
                                        })
                                      }}
                                      trigger={() =>

                                        // <button className="border-0 bg-white">button</button>
                                        <Button color="black" size="sm" className="ml-0 mt-1 mr-0">
                                          <FontAwesomeIcon style={{fontSize:"20px"}} color="teal" size="1x"  icon={faFilePdf} />
                                        </Button>
                                      }
                                      content={() => certRef.current}
                                    />
                                    }

                                    {printData && <Certificate
                                      data={printData}
                                      ref={certRef} />}
                                  </>
                                ): ""}
                                {data?.status === 'Approved' || data?.status === 'Denied' || data?.status === 'Expired' ?
                                <Button className="ml-0 mt-1 mr-0 "
                                  // color="secondary"
                                  color="black"
                                  // className="bg-translucent-light text-dark"
                                  onClick={() =>{ setId(data.id)
                                    setshowAmen(true)}}

                                  size="sm"
                                >
                                  {/*<Translate contentKey={'entity.action.edit'} />*/}
                                  {/*<FontAwesomeIcon icon={faPencil} />*/}
                                  <FontAwesomeIcon
                                    color={'blue'}
                                    style={{fontSize:"16px"}}
                                    size="1x"
                                    icon={faPencil}
                                  />
                                </Button> :
                                <Button className="ml-0 mt-1 mr-0 "
                                  // color="secondary"
                                        color={!(data.stage?.id === 0 || data.stage === null) ? 'light' : 'black'}
                                  // className="bg-translucent-light text-dark"
                                        onClick={() => nav('/dataUpdate/' + data.id)}
                                        hidden={!(data.stage?.id === 0 || data.stage === null)}
                                        size="sm"
                                >
                                  {/*<Translate contentKey={'entity.action.edit'} />*/}
                                  {/*<FontAwesomeIcon icon={faPencil} />*/}
                                  <FontAwesomeIcon
                                    color={!(data.stage?.id === 0 || data.stage === null) ? 'white' : 'blue'}
                                    size="1x"
                                    style={{fontSize:"16px"}}
                                    icon={faPencil}
                                  />
                                </Button>}
                                <Button className="ml-0 mt-1 mr-0"
                                  // color="danger"
                                  // className="bg-translucent-danger text-danger"
                                  color={!(data.stage?.id === 0 || data.stage === null) ? 'light' : 'black'}
                                  onClick={() => setDeleteLicence({ id: data.id, show: true, name: data.form.title })}
                                  hidden={!(data.stage?.id === 0 || data.stage === null)}
                                  size="sm"
                                >
                                  {/*<Translate contentKey={'entity.action.delete'} />*/}
                                  {/*<FontAwesomeIcon  icon={faTrash} />*/}
                                  <FontAwesomeIcon
                                    color={!(data.stage?.id === 0 || data.stage === null) ? 'white' : 'red'}
                                    size="1x"
                                    style={{fontSize:"14px"}}
                                    icon={faTrash}
                                  />
                                </Button>



                                {data.remark && !(data.status === 'Approved' || data.status === 'Denied') && (
                                  <Button  className="ml-0 mt-1 " color="black" onClick={() => showRemarkModal(data.remark)} size="sm">
                                    <FontAwesomeIcon color="teal"  style={{fontSize:"18px"}} icon={faInfoCircle} />
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

       <UserNotification showModal={setDetailModal} showRemark={showRemarkModal}/>
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
        <h3><Translate contentKey={'table.applicationNumber'} />: {data.data.form?.title?.slice(0,2).toUpperCase()}{data.data?.id}496</h3>
      </ModalHeader>
      <ModalBody>
        <div className="d-flex flex-column justify-content-center">
          {data.loading ? (
            <Spinner className="align-self-center" color="primary" style={{ height: '3rem', width: '3rem' }} type="grow">
              Loading...
            </Spinner>
          ) : (
            <>
              <div className="d-flex justify-content-between align-items-end">
                <span className="" style={{color:"rgb(82, 95, 127)"}}><Translate style={{color:"rgb(82, 95, 127)"}} contentKey={"userManagement.firstName"}/>: <span style={{color:"rgb(82, 95, 127)"}}>{data.data.user.firstName}</span></span>
                <span className="" style={{color:"rgb(82, 95, 127)"}}><Translate style={{color:"rgb(82, 95, 127)"}} contentKey={'table.submittedDate'} />: <span style={{color:"rgb(82, 95, 127)"}}>{moment(data.data.submittedDate).format('MMM DD, YYYY')}</span></span>
              </div>
              <ShowFieldValue data={getDataBasedOnState()} form={data?.data.form} />
            </>
          )}
        </div>
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
