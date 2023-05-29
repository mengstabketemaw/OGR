import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  AccordionItem,
  Button,
  Card,
  CardBody,
  CardTitle,
  Col,
  Container,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
} from 'reactstrap';
import LicencesHeader from 'app/modules/informationPages/licencesHeader';
import LicencesFaq from 'app/modules/informationPages/licencesFaq';
const Permit = () => {
  const [params] = useSearchParams();
  const nav = useNavigate();

  const handleSubmit = event => {
    event.preventDefault();
    // Handle form submission logic here
  };

  const [open, setOpen] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [modalText, setModalText] = useState('' + '');

  const toggle = id => {
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

  const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) {
      return text;
    }
    return text.substr(0, maxLength) + '...';
  };

  const fullText = `An Exploration Licence grants permission to explore and evaluate the potential presence of oil and gas resources in a specific area.
 It is a crucial step in the process of identifying and harnessing valuable energy resources.`;

  const truncatedText = truncateText(fullText, 35);

  return (
    <>
      <div className="p-1 p-md-5">
        <h1 className={'text-uppercase'}>{params.get('name')}</h1>

        <div className="header pb-8 pt-1 pt-md-">
          <Container fluid>
            <div className="header-body mb-5">
              {/* Card stats */}
              <LicencesHeader />
            </div>

            <Row>
              <Col md={8}>
                <Card>
                  {' '}
                  <CardBody></CardBody>{' '}
                </Card>
              </Col>

              <Col md={4}>
                <LicencesFaq />

                <Card>
                  {' '}
                  <CardBody>
                    <div className="feedback-form">
                      <h3>Any Questions?</h3>
                      <form onSubmit={handleSubmit}>
                        <div className="form-group">
                          <label htmlFor="name">Name:</label>
                          <input type="text" id="name" className="form-control" />
                        </div>
                        <div className="form-group">
                          <label htmlFor="email">Email:</label>
                          <input type="email" id="email" className="form-control" />
                        </div>
                        <div className="form-group">
                          <label htmlFor="message">Message:</label>
                          <textarea id="message" className="form-control" rows={4}></textarea>
                        </div>
                        <button type="submit" className="btn btn-primary">
                          Submit
                        </button>
                      </form>
                    </div>
                  </CardBody>{' '}
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
        <Button onClick={() => nav('/apply-permit?name=' + params.get('name') + '&pageKey=' + params.get('pageKey'))}>Apply</Button>
      </div>
    </>
  );
};

export default Permit;
