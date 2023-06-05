import React, {useContext,useState} from "react";
import {PageContext} from './pageSequence'
import { Button, Card, CardHeader, Col, Container, Modal, ModalBody, ModalFooter, ModalHeader, Row, Spinner, Table} from "reactstrap";
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

const PageSwitcher = () => {
  const dispatch = useAppDispatch();
  const nav = useNavigate()
  const { pages, currentPage, switchPage, id , formId, showReqModal, handleReqClose, sRM } = useContext(PageContext);
  const sequenceFromDatabase = useAppSelector(state => state.licence.currentSequence);
  const [showModal,setShowModal] = useState(false)
  const handleSwitchPage = (pageNumber) => {

    if (pageNumber >= 0 && pageNumber < pages.length) {
      switchPage(pageNumber);
    }
  };
  const handlePreviousPage = () => {
    handleSwitchPage(currentPage - 1);
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
        status:issue?'Authorized':'Denied'
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
  const handleNotify = () =>{
    toast.success("User Notified")
    nav(-1)
  }

  return (
    <>
    <Container >
        <Card className="shadow">
          <CardHeader className="border-0">
            <div  className="row">
              <div className="row">
                <div className="col-2"></div>
                <div className="col-md-8">
                  <h2 className={"container"}>
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
                  </h2>
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
                        <div >Step {index + 1}<br /><span> <Translate contentKey={"workflow." + page.props.name}></Translate></span></div>
                      </li>
                    }):
                      <h3 className="mb-0">NO WORKFLOW!</h3>
                    }
                  </ul>
                </div>
              </div>


              <div className="mt-2 col-12 col-sm-6 col-md-2 prev-button order-md-1">
                <Button className={"col-12 bg-light"} onClick={handlePreviousPage} disabled={currentPage === 0} >
                  <Translate contentKey="workflow.previous"></Translate>
                </Button>
              </div>


              <div className="mt-2 col-12 col-sm-6 col-md-2  order-md-3">

              <Button hidden={sequenceFromDatabase[currentPage] !== 3} disabled={sequenceFromDatabase[currentPage] !== 3}  className={ 'col-12 mr-4 mb-2 bg-orange text-white' } onClick={handleNotify}>
                <Translate contentKey="workflow.notify"></Translate>
              </Button>

              <Button className={"col-12 bg-light"}  onClick={handleNextPage} hidden={sequenceFromDatabase[currentPage] === 3 || currentPage === pages.length - 1} disabled={sequenceFromDatabase[currentPage] === 3 || currentPage === pages.length - 1}>

                <Translate contentKey="workflow.next"></Translate>
              </Button>

              <Button  className={ currentPage !== pages.length - 1 ? 'd-none' : 'col-12 mr-4 mb-2 bg-gradient-green text-white' } onClick={handleProceed}>
                <Translate contentKey="workflow.proceed"></Translate>
              </Button>

              </div>
            </div>
            &nbsp;
            {pages[currentPage]}

          </CardHeader>
        </Card>
    </Container>
      <IssuedOrDenied showModal={showModal} handleClose={handleClose} handleSubmit = {handleSubmit}/>
      <MoreRequestInfoModal showModal={sRM} handleClose={handleReqClose} handleSubmit = {handleReqSubmit}/>
    </>

  );
};

export default PageSwitcher;
