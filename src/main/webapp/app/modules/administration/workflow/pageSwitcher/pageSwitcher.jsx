import React, {useContext} from "react";
import {PageContext} from './pageSequence'
import { Button, Card, CardHeader, Col, Container, Modal, ModalBody, ModalFooter, ModalHeader, Row, Spinner, Table} from "reactstrap";
import {Translate} from "react-jhipster";
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
const PageSwitcher = () => {
  const { pages, currentPage, switchPage } = useContext(PageContext);

  const handleSwitchPage = (pageNumber) => {
    // Check if the pageNumber is within the range of available pages
    if (pageNumber >= 0 && pageNumber < pages.length) {
      switchPage(pageNumber);
    }
  };
  const handlePreviousPage = () => {
    handleSwitchPage(currentPage - 1);
  };
  const handleNextPage = () => {
    handleSwitchPage(currentPage + 1);
  };

  return (
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
                    Previous Page
                  </span>
              </Button>
              &nbsp;
              {pages.map((page, index) => (
              <Button  key={index} onClick={() => handleSwitchPage(index)} className={currentPage === index ? "bg-green text-black btn btn-secondary":"bg-gray text-white btn btn-secondary"}>

                  {page.type.name}
              </Button>
              ))}
              &nbsp;
              <Button onClick={handleNextPage} disabled={currentPage === pages.length - 1}>

                Next Page
              </Button>
            </div>

          </CardHeader>
        </Card>
      </Col>
    </Row>


  );
};

export default PageSwitcher;
