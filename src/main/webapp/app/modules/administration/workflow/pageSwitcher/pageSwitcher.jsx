import React, {useContext,useState} from "react";
import {PageContext} from './pageSequence'
import { Button, Card, CardHeader, Col, Container, Modal, ModalBody, ModalFooter, ModalHeader, Row, Spinner, Table} from "reactstrap";
import {Translate} from "react-jhipster";
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useAppSelector, useAppDispatch} from "app/config/store";
import {IssuedOrDenied} from "app/modules/administration/workflow/definedStatePages/issued-or-denied";
import {updateStatusAndState} from "app/modules/administration/workflow/workflow.reducer";

const PageSwitcher = () => {
  const dispatch = useAppDispatch();
  const { pages, currentPage, switchPage, id , formId } = useContext(PageContext);
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
        stateId : sequenceFromDatabase[currentPage],
        status:'Inprogress'
      }
    }
    dispatch(updateStatusAndState(param))
    console.log(id)
    console.log(formId)
    console.log(sequenceFromDatabase[currentPage])
    console.log(switchPage)
  };
  const handleProceed = () =>{
    setShowModal(true)
  }
  const handleClose = () =>{
    setShowModal(false)
  }

  return (
    <>
    <Row className="d-flex justify-content-center">
      <Col md="8">
        <Card className="shadow">
          <CardHeader className="border-0">
            {/* <Row className="align-items-center"> */}
            {/*   <div className="col"> */}
            {/*     <h3 className="mb-0"><Translate contentKey="form.edit"> Edit a form</Translate></h3> */}
            {/*   </div> */}
            {/* </Row> */}
            {/* Render the current page */}
            {pages[currentPage]}
            &nbsp;
            <div  className="d-flex justify-content-between pb-4 pl-4 pt-20">
              <Button onClick={handlePreviousPage} disabled={currentPage === 0} >

                <span className="d-none d-md-inline">
                    <Translate contentKey="workflow.previous"></Translate>
                  </span>
              </Button>
              &nbsp;
              {pages.map((page, index) => (
              <Button  key={index} onClick={() => handleSwitchPage(index)} className={currentPage === index ? "bg-cornsilk text-black btn btn-secondary":"bg-gray text-white btn btn-secondary"}>

                  <Translate contentKey={"workflow."+page.type.name}></Translate>
              </Button>
              ))}
              &nbsp;
              <Button onClick={handleNextPage} hidden={currentPage === pages.length - 1} disabled={currentPage === pages.length - 1}>

                <Translate contentKey="workflow.next"></Translate>
              </Button>
              <Button className={'mr-4 mb-2 bg-gradient-green text-white'} onClick={handleProceed} hidden={currentPage !== pages.length - 1} >

                <Translate contentKey="workflow.proceed"></Translate>
              </Button>

            </div>

          </CardHeader>
        </Card>
      </Col>
    </Row>
      <IssuedOrDenied showModal={showModal} handleClose={handleClose}/>
    </>

  );
};

export default PageSwitcher;
