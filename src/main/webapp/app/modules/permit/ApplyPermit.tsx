import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import { getForm } from 'app/modules/form/form.reducer';
import { createLicence } from 'app/modules/licence/license.reducer';
import { Col, Row } from 'reactstrap';
import DynamicFields from 'app/shared/common/dynamicFields';
import { formatValue } from 'app/shared/common/formatValue';
import { Translate } from 'react-jhipster';
import LicenceLanding from 'app/modules/licence/licenceLanding';

const ApplyPermit = ({ startProcess }) => {
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
      {!startProcess ? (
        <LicenceLanding />
      ) : (
        isAuthenticated && (
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
        )
      )}
    </>
  );
};

export default ApplyPermit;
