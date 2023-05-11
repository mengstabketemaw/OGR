import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import { getForm } from 'app/modules/form/form.reducer';
import DynamicFields from 'app/shared/common/dynamicFields';
import { Button, Row, Col, FormText } from 'reactstrap';
import { formatValue } from 'app/modules/licence/formatValue';
import { createLicence } from 'app/modules/licence/license.reducer';
const PipelineLicence = () => {
  const pageKey = 2;
  const dispatch = useAppDispatch();
  const form = useAppSelector(state => state.form.form);
  const account = useAppSelector(state => state.authentication.account);

  useEffect(() => {
    // @ts-ignore
    dispatch(getForm(pageKey));
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
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h1>Create or edit Pipeline Licence</h1>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          <DynamicFields fields={form.fields} handleSubmit={handleSubmit} formatValue={formatValue} />
        </Col>
      </Row>
    </div>
  );
};

export default PipelineLicence;
