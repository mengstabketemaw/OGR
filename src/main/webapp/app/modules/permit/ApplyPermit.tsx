import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import { getForm } from 'app/modules/form/form.reducer';
import { createLicence } from 'app/modules/licence/license.reducer';
import { Col, Row } from 'reactstrap';
import DynamicFields from 'app/shared/common/dynamicFields';
import { formatValue } from 'app/shared/common/formatValue';

const ApplyPermit = () => {
  const [params] = useSearchParams();
  const dispatch = useAppDispatch();
  const form = useAppSelector(state => state.form.form);
  const account = useAppSelector(state => state.authentication.account);

  useEffect(() => {
    // @ts-ignore
    dispatch(getForm(params.get('pageKey')));
  }, []);
  const handleSubmit = values => {
    const valueToSend = {
      form: form,
      user: account,
      data: values,
    };
    console.log(valueToSend);
    // @ts-ignore
    dispatch(createLicence(valueToSend));
  };
  return (
    <div className="">
      <Row className="justify-content-center ">
        <Col md="6">
          <h1 className="">Application Form for {params.get('name')}</h1>
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
  );
};

export default ApplyPermit;
