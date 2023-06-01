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
import './pageS.css'

const PageSwitcher = () => {
  const dispatch = useAppDispatch();
  const nav = useNavigate()
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
                      return <li className={""} key={index} className={`${currentPage === index ? 'active' : ''} ${currentPage > index ? 'done' : ''}`}
                                  onClick={() => handleSwitchPage(index)}
                                  >
                        <div >Step {index + 1}<br /><span> {page.props.name}</span></div>
                      </li>
                    }):
                      <h3 className="mb-0">NO WORKFLOW!</h3>
                    }
                  </ul>
                </div>
              </div>
              {/* {pages.map((page, index) => ( */}
              {/*   <Button  key={index}  disabled={sequenceFromDatabase[currentState.id] < index} */}
              {/*            onClick={() => handleSwitchPage(index)} className={currentPage === index ? "bg-blue text-white btn btn-secondary btn-sm":"bg-white text-blue btn btn-secondary btn-sm"}> */}

              {/*     <Translate contentKey={"workflow."+page.type.name}></Translate> */}
              {/*   </Button> */}
              {/* ))} */}

              <div className="mt-2 col-12 col-sm-6 col-md-2 prev-button order-md-1">
                <Button className={"col-12 bg-light"} onClick={handlePreviousPage} disabled={currentPage === 0} >
                  <Translate contentKey="workflow.previous"></Translate>
                </Button>
              </div>


              <div className="mt-2 col-12 col-sm-6 col-md-2  order-md-3">
              <Button className={"col-12 bg-light"}  onClick={handleNextPage} hidden={currentPage === pages.length - 1} disabled={currentPage === pages.length - 1}>

                <Translate contentKey="workflow.next"></Translate>
              </Button>
              <Button  className={ currentPage !== pages.length - 1 ? 'd-none' : 'col-12 mr-4 mb-2 bg-gradient-green text-white' } onClick={handleProceed}>
                <Translate contentKey="workflow.proceed"></Translate>
              </Button>
              </div>
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
    </Container>
      <IssuedOrDenied showModal={showModal} handleClose={handleClose} handleSubmit = {handleSubmit}/>
    </>

  );
};

export default PageSwitcher;
