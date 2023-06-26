import React, {useState} from 'react';
import {useNavigate, useSearchParams} from 'react-router-dom';
import {
  Accordion, AccordionBody,
  AccordionHeader,
  AccordionItem,
  Button,
  Card,
  CardBody, CardFooter,
  CardTitle,
  Col,
  Container, Modal, ModalBody, ModalFooter, ModalHeader,
  Row
} from 'reactstrap';
import {Translate} from "react-jhipster";

const LicencesHeader = () => {
  const [params] = useSearchParams();
  const nav = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission logic here
  };

  const [open, setOpen] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [modalText, setModalText] = useState(0);


  const toggle = (id) => {
    if (open === id) {
      setOpen('');
    } else {
      setOpen(id);
    }
  };

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <>
      {/* Card stats */}
      <Row className={"equal-height-cards"}>
        <Col lg="6" xl="3">
          <Card className="h-100  card-stats mb-4 mb-xl-0" style={{backgroundColor:"#2dce89"}}>
            <CardBody>
              <Row>
                <div className="col">
                  <CardTitle
                    tag="h5"
                    className="text-white text-uppercase text-muted mb-0"
                  >
                  </CardTitle>
                  <span className="text-white h2 font-weight-bold mb-0 text-uppercase">
                          {params.get('name')}
                        </span>
                </div>
                <Col className="col-auto">
                  <div className="icon icon-shape bg-gradient-info opacity-0 text-white rounded-circle shadow">
                  </div>
                </Col>
              </Row>

            </CardBody>
            <CardFooter className="border-top-0 pt-0 pl-3" style={{backgroundColor:"#2dce89"}}>
              <p className="mb-0 text-muted text-sm">
                      <span className="text-white mr-2">
                      </span>{" "}
                <span className="text-white text-wrap">
                        <Translate contentKey={`information.pageKey.${params.get('pageKey')}.titleShort`}/>
                      </span>
                <a className=" btn-link text-white pl-0" onClick={() => {
                  setModalOpen(true);
                  setModalText(1)
                }}>

                  <Translate contentKey={"information.more"}/>
                </a>
              </p>
            </CardFooter>
          </Card>
        </Col>
        <Col lg="6" xl="3">
          <Card className="h-100   card-stats mb-4 mb-xl-0" style={{backgroundColor:"#2dcecc"}}>
            <CardBody>
              <Row>
                <div className="col">
                  <CardTitle
                    tag="h5"
                    className="text-white text-uppercase text-muted mb-0"
                  >
                  </CardTitle>
                  <span className="text-white h2 font-weight-bold mb-0 text-uppercase">
                          <Translate contentKey={'information.titles.process'}/>
                        </span>
                </div>
                <Col className="col-auto">
                  <div className="icon icon-shape bg-gradient-purple opacity-0 text-white rounded-circle shadow">

                  </div>
                </Col>
              </Row>
            </CardBody>
            <CardFooter className="border-top-0 pt-0 pl-3" style={{backgroundColor:"#2dcecc"}}>
              <p className=" mb-0 text-muted  text-sm">
                      <span className="text-white mr-2">
                      </span>{" "}
                <span className="text-white text-wrap ">
                        <Translate contentKey={`information.pageKey.${params.get('pageKey')}.processShort`}/>
                      </span>
                <a className=" btn-link text-white pl-0" onClick={() => {
                  setModalOpen(true);
                  setModalText(2)
                }}>

                  <Translate contentKey={"information.more"}/>
                </a>
              </p>
            </CardFooter>
          </Card>
        </Col>
        <Col lg="6" xl="3">
          <Card className="h-100    card-stats mb-4 mb-xl-0" style={{backgroundColor:"#2dce89"}}>
            <CardBody>
              <Row>
                <div className="col">
                  <CardTitle
                    tag="h5"
                    className="text-white text-uppercase text-muted mb-0"
                  >
                  </CardTitle>
                  <span className="text-white text-uppercase h2 font-weight-bold mb-0">
                          <Translate contentKey={"information.titles.requirements"}/>
                        </span>
                </div>
                <Col className="col-auto">
                  <div className="icon icon-shape bg-gradient-warning opacity-0 text-white rounded-circle shadow">
                  </div>
                </Col>
              </Row>

            </CardBody>
            <CardFooter className="border-top-0 pt-0 pl-3" style={{backgroundColor:"#2dce89"}}>
              <p className=" mb-0 text-muted text-sm">
                      <span className="text-white mr-2">
                      </span>{" "}
                <span className="text-white text-wrap">
                        <Translate contentKey={`information.pageKey.${params.get('pageKey')}.requirementsShort`}/>
                      </span>
                <a className=" btn-link text-white pl-0" onClick={() => {
                  setModalOpen(true);
                  setModalText(3)
                }}>

                  <Translate contentKey={"information.more"}/>
                </a>
              </p>
            </CardFooter>
          </Card>
        </Col>
        <Col lg="6" xl="3">
          <Card className="h-100  text-white  card-stats mb-4 mb-xl-0" style={{backgroundColor:"#2dcecc"}}>
            <CardBody>
              <Row>
                <div className="col">
                  <CardTitle
                    tag="h5"
                    className="text-white text-uppercase text-white text-muted mb-0"
                  >
                  </CardTitle>
                  <span className="text-white h2  text-uppercase font-weight-bold mb-0">
                            <Translate contentKey={"information.titles.regulations"}/>
                          </span>
                </div>
                <Col className="col-auto">
                  <div className="icon icon-shape bg-gradient-danger opacity-0 text-white rounded-circle shadow">
                    <i className="fas fa-percent"/>
                  </div>
                </Col>
              </Row>

            </CardBody>
            <CardFooter className="border-top-0 pt-0 pl-3" style={{backgroundColor:"#2dcecc"}}>
              <p className=" mb-0 text-muted text-sm">
                      <span className="text-white mr-2">
                      </span>{" "}
                <span className="text-white text-wrap">
                        <Translate contentKey={`information.pageKey.${params.get('pageKey')}.regulationsShort`}/>
                      </span>
                <a className=" btn-link text-white pl-0" onClick={() => {
                  setModalOpen(true);
                  setModalText(4)
                }}>

                  <Translate contentKey={"information.more"}/>
                </a>
              </p>
            </CardFooter>
          </Card>
        </Col>
      </Row>


      <Modal isOpen={modalOpen} toggle={closeModal} backdrop={true}>
        <ModalHeader toggle={closeModal}><Translate contentKey={'licence.fullText'}/> </ModalHeader>
        <ModalBody>
          <p className="text-black text-justify">
            {
              modalText == 1 ?
                <Translate contentKey={`information.pageKey.${params.get('pageKey')}.title`}/>
                :
                modalText == 2 ?
                  <Translate contentKey={`information.pageKey.${params.get('pageKey')}.process`}/>
                  :
                  modalText == 3 ?
                    <Translate contentKey={`information.pageKey.${params.get('pageKey')}.requirements`}/>
                    :
                    modalText == 4 ?
                      <Translate contentKey={`information.pageKey.${params.get('pageKey')}.regulations`}/>
                      :
                      <span>No Data</span>
            }
          </p>
        </ModalBody>
        <ModalFooter><Button color="primary" onClick={closeModal}>Close</Button></ModalFooter>
      </Modal>
    </>
  );
};

export default LicencesHeader;
