import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import { getForm } from 'app/modules/form/form.reducer';
import DynamicFields from 'app/shared/common/dynamicFields';
import { Button, Row, Col, FormText } from 'reactstrap';
const PipelineLicence = () => {
  const pageKey = 2;
  const dispatch = useAppDispatch();
  const form = useAppSelector(state => state.form.form);

  useEffect(() => {
    // @ts-ignore
    dispatch(getForm(pageKey));
  }, []);
  const handleSubmit = () => {};
  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h1>Create or edit Exploration Licence</h1>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          <DynamicFields fields={form.fields} handleSubmit={handleSubmit} />
        </Col>
      </Row>
    </div>
  );
};

export default PipelineLicence;
