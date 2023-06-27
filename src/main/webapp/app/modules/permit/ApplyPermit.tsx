import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import { getForm } from 'app/modules/form/form.reducer';
import { createLicence } from 'app/modules/licence/license.reducer';
import { Button, Card, CardBody, Col, Container, Row } from 'reactstrap';
import DynamicFields from 'app/shared/common/dynamicFields';
import { formatValue } from 'app/shared/common/formatValue';
import { Translate } from 'react-jhipster';
import LicenceLanding from 'app/modules/licence/licenceLanding';
import LicencesHeader from 'app/modules/informationPages/licencesHeader';
import LicencesFaq from 'app/modules/informationPages/licencesFaq';
import AskQuestion from 'app/modules/informationPages/askQuestion';

const ApplyPermit = () => {
  const nav = useNavigate();
  const [params] = useSearchParams();
  const dispatch = useAppDispatch();
  const form = useAppSelector(state => state.form.form);
  const account = useAppSelector(state => state.authentication.account);
  const isAuthenticated = useAppSelector(state => state.authentication.isAuthenticated);

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

    dispatch(createLicence(valueToSend)).then(() => {
      nav('/home');
    });
  };
  // @ts-ignore
  return (
    <>
      <div className="p-1 p-md-5">
        <div className="row p-0">
          <div className="col-xl-8 col-12 d-flex justify-content-between">
            <h1 className={'text-uppercase pl-3 mr-4 '}>{params.get('name')}</h1>
          </div>
        </div>

        <div className="header pb-8 pt-1 pt-md-">
          <Container fluid>
            <div className="header-body mb-5">
              {/* Card stats */}
              <LicencesHeader />
            </div>
            <Row>
              <Col xl={8}>
                <Card>
                  {' '}
                  <CardBody>
                    {isAuthenticated && (
                      <div className="">
                        <Row className="justify-content-center">
                          <Col md="6">
                            <h1 className="">
                              <Translate contentKey={'form.for'} /> {params.get('name')}
                            </h1>
                          </Col>
                        </Row>
                        <Row className="justify-content-center">
                          <Col md="6">
                            <DynamicFields
                              fields={form.fields?.filter(f => {
                                return f.state.id === 0;
                              })}
                              handleSubmit={handleSubmit}
                              formatValue={formatValue}
                            />
                          </Col>
                        </Row>
                      </div>
                    )}
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

export default ApplyPermit;
