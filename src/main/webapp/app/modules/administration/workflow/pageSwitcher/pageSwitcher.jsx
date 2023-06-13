import React, {useContext,useState} from "react";
import {PageContext} from './pageSequence'
import {
  Accordion, AccordionBody, AccordionHeader, AccordionItem,
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
  Spinner,
  Table
} from "reactstrap";
import {Translate} from "react-jhipster";
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useAppSelector, useAppDispatch} from "app/config/store";
import {IssuedOrDenied} from "app/modules/administration/workflow/definedStatePages/issued-or-denied";
import {updateStatusAndState, updateRemark} from "app/modules/administration/workflow/workflow.reducer";
import {useNavigate} from "react-router-dom";
import './pageS.css'
import {MoreRequestInfoModal} from '../definedStatePages/more-request-info-modal'
import {toast} from "react-toastify";
import moment from 'moment';
import {trans as translator, trans} from "app/shared/common/translator";
import workflow from "../../../../../content/images/workflow.gif";
import {faCloudSun, faCog, faHourglassStart, faMoneyBillWaveAlt, faRecycle} from "@fortawesome/free-solid-svg-icons";
import {Denied} from "app/modules/administration/workflow/definedStatePages/denied";
import {StayOrLeave} from "app/modules/administration/workflow/definedStatePages/stayOrLeave";
const PageSwitcher = () => {
  const dispatch = useAppDispatch();
  const nav = useNavigate()
  const { pages, currentPage, switchPage, id , formId, showReqModal, handleReqClose
    , sRM, showDenModal, handleDenClose, sDM
    ,showNotifyModal , closeNotifyModal ,notifyModal} = useContext(PageContext);
  const sequenceFromDatabase = useAppSelector(state => state.licence.currentSequence);
  const [showModal,setShowModal] = useState(false)
  const [showNotify,setShowNotify] = useState(false)
  const licencePayment = useAppSelector(state => state.licence.license.payment) || false;

  const handleSwitchPage = (pageNumber) => {

    if (pageNumber >= 0 && pageNumber < pages.length) {
      switchPage(pageNumber);
    }
  };
  const handlePreviousPage = () => {
    handleSwitchPage(currentPage - 1);
    const param = {
      id : id,
      data : {
        stateId : sequenceFromDatabase[currentPage -1],
        status:'Inprogress'
      }
    }
    dispatch(updateStatusAndState(param))
  };
  const handleNextPage = () => {
    handleSwitchPage(currentPage + 1);
    const param = {
      id : id,
      data : {
        stateId : sequenceFromDatabase[currentPage+1],
        status:'Inprogress'
      }
    }
    dispatch(updateStatusAndState(param))
    // console.log(id)
    // console.log(formId)
    // console.log(sequenceFromDatabase[currentPage])
    // console.log(switchPage)
  };

  const handleProceed = () =>{
    setShowModal(true)
  }
  const handleClose = () =>{
    setShowModal(false)
  }
  const handleReqSubmit = (remark) =>{
    const param = {
      id : id,
      data : {
        remark : remark
      }
    }
    dispatch(updateRemark(param)).then(()=>{
      const param = {
        id : id,
        data : {
          stateId : 0,
          status:'Request More Info'
        }
      }
      dispatch(updateStatusAndState(param)).then(()=>{
        nav(-1)
        setTimeout(() => {
          // Code to execute after 1 second
          nav(-0)
        }, 50)}
      )
    })
  }

  const handleSubmit = (issue) =>{
    const param = {
      id : id,
      data : {
        stateId : sequenceFromDatabase[currentPage],
        status:issue?'Authorized':'Denied',
        approvedDate:moment().format('YYYY-MM-DD')
      }
    }
    dispatch(updateStatusAndState(param)).then(()=>{
      nav(-1)
      setTimeout(() => {
        // Code to execute after 1 second
        nav(-0)
      }, 50)}
      )
  }
  const handleNotifyConfirm = (value) =>{
    const param = {
      id : id,
      data : {
        stateId : sequenceFromDatabase[currentPage+1],
        status:'Inprogress'
      }
    }
    dispatch(updateStatusAndState(param))
    if(value){
      handleSwitchPage(currentPage + 1);
      toast.success("User Notified")
    }
    else{
      toast.success("User Notified")
      nav(-1)
    }
    setShowNotify(false);
  }


  return (
    <>

      <Row className=" p-3 h-100">
        <Col xl={"2"}>
          { sequenceFromDatabase.length > 0 &&
            sequenceFromDatabase[currentPage] === 0 ?
              <Card className="shadow mt-xl-0 mt-4">



            <CardHeader>
              <div className="d-flex justify-content-center flex-column">
                <FontAwesomeIcon icon={faRecycle} size ={'3x'}/>
                <h2 className="text-uppercase text-success text-center" ><Translate contentKey={'workflow.sequence'}/></h2>
              </div>
           </CardHeader>
            <CardBody>

              <span className="text-sm"><Translate contentKey={'workflow.sequenceInfo'}/></span>
            </CardBody>
          </Card>
              : sequenceFromDatabase[currentPage] === 1 ?
                <Card className="shadow mt-xl-0 mt-4">

                  <CardHeader>
                    <div className="d-flex justify-content-center flex-column">
                      <FontAwesomeIcon icon={faHourglassStart} size ={'3x'}/>
                      <h2 className="text-uppercase text-success text-center" >{translator("state",'Initial Review')}</h2>
                    </div>
                  </CardHeader>
                  <CardBody>

                    <span className="text-sm">{translator("licence.desc",'Initial Review')}</span>
                  </CardBody>
                </Card>
                :sequenceFromDatabase[currentPage] === 2 ?
                  <Card className="shadow mt-xl-0 mt-4">
                    <CardHeader>
                      <div className="d-flex justify-content-center flex-column">
                        <FontAwesomeIcon icon={faCog} size ={'3x'}/>
                        <h2 className="text-uppercase text-success text-center" >{translator("state",'Technical Review')}</h2>
                      </div>
                    </CardHeader>
                    <CardBody>
                      <span className="text-sm">{translator("licence.desc",'Technical Review')}</span>
                    </CardBody>
                  </Card>
                  :sequenceFromDatabase[currentPage] === 3 ?
                    <Card className="shadow mt-xl-0 mt-4">

                      <CardHeader>
                        <div className="d-flex justify-content-center flex-column">
                          <FontAwesomeIcon icon={faMoneyBillWaveAlt} size ={'3x'}/>
                          <h2 className="text-uppercase text-success text-center" >{translator("state",'Payment')}</h2>
                        </div>
                      </CardHeader>
                      <CardBody>

                        <span className="text-sm">{translator("licence.desc",'Payment')}</span>
                      </CardBody>
                    </Card>
                  :sequenceFromDatabase[currentPage] === 4 ?
                      <Card className="shadow mt-xl-0 mt-4">

                        <CardHeader>
                          <div className="d-flex justify-content-center flex-column">
                            <FontAwesomeIcon icon={faCloudSun} size ={'3x'}/>
                            <h2 className="text-uppercase text-success text-center" >{translator("state",'Decision Making')}</h2>
                          </div>
                        </CardHeader>
                        <CardBody>

                          <span className="text-sm">{translator("licence.desc",'Decision Making')}</span>
                        </CardBody>
                      </Card>:
                      <Card className="shadow mt-xl-0 mt-4">

                        <CardHeader>
                          <div className="d-flex justify-content-center flex-column">
                            <FontAwesomeIcon icon={faRecycle} size ={'3x'}/>
                            <h2 className="text-uppercase text-success text-center" ><Translate contentKey={'workflow.sequence'}/></h2>
                          </div>
                        </CardHeader>
                        <CardBody>

                          <span className="text-sm"><Translate contentKey={'workflow.sequenceInfo'}/></span>
                        </CardBody>
                      </Card>

          }

        </Col>
        <Col xl="9">
        <Card className="shadow">
          <CardHeader className="border-0">
            <div  className="row">
              <div className="row">
                <div className="col-2"></div>
                <div className="col-md-8">
                  <h1 className={"container"}>
                    {formId == 1 ?
                    <Translate contentKey={'licence.types.exploration'}/>
                      :
                      formId == 2 ?
                      <Translate contentKey={'licence.types.pipeline'}/>
                      :
                      formId == 3 ?
                        <Translate contentKey={'permit.types.air'}/>
                      :
                        <Translate contentKey={'permit.types.drilling'}/>
                    }
                  </h1>
                </div>
              </div>
              <div className="box col-md-8 order-md-2">
                <div className="steps">
                  <ul className="nav  ">
                    {pages.length > 0 ?
                      pages.map((page, index) => {
                      return <li  key={index} className={`${currentPage === index ? 'active' : ''} ${currentPage > index ? 'done' : ''}`}
                                  onClick={() => {if (currentPage>index) handleSwitchPage(index)}}
                                  >
                        <div >Step {index + 1}<br /><span> {trans("workflow",page?.props?.name)}</span></div>
                      </li>
                    }):
                      <h3 className="mb-0">NO WORKFLOW!</h3>
                    }
                  </ul>
                </div>
              </div>


              <div className="mt-2 col-12 col-sm-6 col-md-2 prev-button order-md-1">
                <Button className={"col-12 bg-translucent-dark"} onClick={handlePreviousPage} disabled={currentPage === 0} >
                  <Translate contentKey="workflow.previous"></Translate>
                </Button>
              </div>


              <div className="mt-2 col-12 col-sm-6 col-md-2  order-md-3">
              {!licencePayment &&
              <Button hidden={sequenceFromDatabase[currentPage+1] !== 3} disabled={sequenceFromDatabase[currentPage+1] !== 3}  className={ 'col-12 mr-4 mb-2 bg-translucent-light text-dark' } onClick={()=>{setShowNotify(true)}}>
                <Translate contentKey="workflow.notify"></Translate>
              </Button>}

              <Button className="col-12 bg-translucent-dark"  onClick={handleNextPage} hidden={(sequenceFromDatabase[currentPage+1] === 3 && !licencePayment) || currentPage === pages.length - 1} disabled={(sequenceFromDatabase[currentPage] === 3 && !licencePayment ) || currentPage === pages.length - 1}>

                <Translate contentKey="workflow.next"></Translate>
              </Button>

              <Button  className={ currentPage !== pages.length - 1 ? 'd-none' : 'col-12 mr-4 mb-2 bg-translucent-success text-success' } onClick={handleProceed} disabled={(sequenceFromDatabase[currentPage] === 3 && !licencePayment )}>
                <Translate contentKey="workflow.proceed"></Translate>
              </Button>

              </div>
            </div>
            &nbsp;
            {pages[currentPage]}

          </CardHeader>
        </Card>
      </Col>

    </Row>

      <IssuedOrDenied showModal={showModal} handleClose={handleClose} handleSubmit = {handleSubmit}/>
      <MoreRequestInfoModal showModal={sRM} handleClose={handleReqClose} handleSubmit = {handleReqSubmit}/>
      <Denied showModal={sDM} handleClose={handleDenClose} handleSubmit = {handleSubmit}/>
      <StayOrLeave showModal={showNotify} handleClose={()=>{setShowNotify(false)}} handleSubmit = {handleNotifyConfirm}/>
    </>

  );
};

export default PageSwitcher;
