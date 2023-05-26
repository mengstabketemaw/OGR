import React, {useContext,useState} from "react";
import {PageContext} from './pageSequence'
import { Button, Card, CardHeader, Col, Container, Modal, ModalBody, ModalFooter, ModalHeader, Row, Spinner, Table} from "reactstrap";
import {Translate} from "react-jhipster";
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useAppSelector, useAppDispatch} from "app/config/store";
import {IssuedOrDenied} from "app/modules/administration/workflow/definedStatePages/issued-or-denied";
import {updateStatusAndState} from "app/modules/administration/workflow/workflow.reducer";
import {useNavigate} from "react-router-dom";

const PageSwitcher = () => {
  const dispatch = useAppDispatch();
  const nav = useNavigate()
  const { pages, currentPage, switchPage, id , formId } = useContext(PageContext);
  const sequenceFromDatabase = useAppSelector(state => state.licence.currentSequence);
  const [showModal,setShowModal] = useState(false)
  const currentState = useAppSelector(state => state.workflow.currentState);
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
        stateId : sequenceFromDatabase[currentPage],
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

  const handleSubmit = (issue) =>{
    const param = {
      id : id,
      data : {
        stateId : sequenceFromDatabase[currentPage],
        status:issue?'Authorized':'Denied'
      }
    }
    dispatch(updateStatusAndState(param)).then(
      nav(-1)
    )
  }

  return (
    <>
    <Row className="d-flex justify-content-center">
      <Col md="8">
        <Card className="shadow">
          <CardHeader className="border-0">
            <div  className="d-flex justify-content-between pb-4 pl-4 pt-20">
              <Button onClick={handlePreviousPage} disabled={currentPage === 0} >

                <span className="d-none d-md-inline">
                    <Translate contentKey="workflow.previous"></Translate>
                  </span>
              </Button>
              &nbsp;
              {pages.map((page, index) => (
                <Button  key={index}  disabled={sequenceFromDatabase[currentState.id] < index}
                         onClick={() => handleSwitchPage(index)} className={currentPage === index ? "bg-blue text-white btn btn-secondary btn-sm":"bg-white text-blue btn btn-secondary btn-sm"}>

                  <Translate contentKey={"workflow."+page.type.name}></Translate>
                </Button>
              ))}

              <Button onClick={handleNextPage} hidden={currentPage === pages.length - 1} disabled={currentPage === pages.length - 1}>

                <Translate contentKey="workflow.next"></Translate>
              </Button>
              <Button className={'mr-4 mb-2 bg-gradient-green text-white'} onClick={handleProceed} hidden={currentPage !== pages.length - 1} >

                <Translate contentKey="workflow.proceed"></Translate>
              </Button>

            </div>
            &nbsp;
            {/* <Row className="align-items-center"> */}
            {/*   <div className="col"> */}
            {/*     <h3 className="mb-0"><Translate contentKey="form.edit"> Edit a form</Translate></h3> */}
            {/*   </div> */}
            {/* </Row> */}
            {/* Render the current page */}
            {pages[currentPage]}



          </CardHeader>
        </Card>
      </Col>
    </Row>
      <IssuedOrDenied showModal={showModal} handleClose={handleClose} handleSubmit = {handleSubmit}/>
    </>

  );
};

export default PageSwitcher;
