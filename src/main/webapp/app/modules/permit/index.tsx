// @ts-ignore

import React, { useEffect, useState } from 'react';
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
import DynamicFields from 'app/shared/common/dynamicFields';
import { formatValue } from 'app/shared/common/formatValue';
import { createLicence } from 'app/modules/licence/license.reducer';
import { toast } from 'react-toastify';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import { getForm } from 'app/modules/form/form.reducer';
import { Translate } from 'react-jhipster';
import ApplyPermit from 'app/modules/permit/ApplyPermit';
import AskQuestion from 'app/modules/informationPages/askQuestion';
import LicenceLanding from 'app/modules/licence/licenceLanding';

const Permit = () => {
  const [params] = useSearchParams();
  const nav = useNavigate();
  const form = useAppSelector(state => state.form.form);
  const account = useAppSelector(state => state.authentication.account);
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector(state => state.authentication.isAuthenticated);
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

  useEffect(() => {
    if (isAuthenticated) {
      // @ts-ignore
      dispatch(getForm(params.get('pageKey')));
    }
  }, [, isAuthenticated]);

  const handleSubmit = values => {
    const valueToSend = {
      form: form,
      user: account,
      data: values,
    };
    console.log(valueToSend);
    // @ts-ignore

    dispatch(createLicence(valueToSend)).then(
      // @ts-ignore
      toast.success('Saved Successfully')
    );
  };

  const [startProcess, setStartProcess] = useState(false);

  return (
    <>
      <div className="p-1 p-md-5">
        <div className="row p-0">
          <div className="col-xl-8 col-12 d-flex justify-content-between">
            <h1 className={'text-uppercase pl-3 mr-4 '}>{params.get('name')}</h1>
            <>
              <Button
                className="mb-1 mr-1 btn btn-success text-uppercase ml--2 ml-md-0"
                onClick={() => {
                  nav('/apply-permit?name=' + params.get('name') + '&pageKey=' + params.get('pageKey'));
                }}
              >
                <Translate contentKey={'form.loginFirst'} />
              </Button>
            </>
          </div>
        </div>

        <div className="header pb-8 pt-1 pt-md-">
          <Container fluid>
            {startProcess && (
              <div className="header-body mb-5">
                {/* Card stats */}
                <LicencesHeader />
              </div>
            )}

            <Row>
              <Col xl={8}>
                <Card>
                  {' '}
                  <CardBody>
                    <LicenceLanding />
                  </CardBody>{' '}
                </Card>
              </Col>

              <Col xl={4}>
                <LicencesFaq />

                <Card>
                  {' '}
                  <CardBody>
                    <AskQuestion />
                  </CardBody>{' '}
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
        {/*<Button onClick={() => nav('/apply-permit?name=' + params.get('name') + '&pageKey=' + params.get('pageKey'))}>Apply</Button>*/}
      </div>
    </>
  );
};

export default Permit;
