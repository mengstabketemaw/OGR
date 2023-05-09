import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import { getForm } from 'app/modules/form/form.reducer';
import {createLicence} from 'app/modules/licence/license.reducer';
import DynamicFields from 'app/shared/common/dynamicFields';
import { Button, Row, Col, FormText } from 'reactstrap';
import {formatValue} from "./formatValue";

const ExplorationLicence = () => {
  const pageKey = 1;
  const dispatch = useAppDispatch();
  const form = useAppSelector(state => state.form.form);
  const account = useAppSelector(state => state.authentication.account);

  useEffect(() => {
    dispatch(getForm(pageKey));
  }, []);
  const handleSubmit = (values) => {
    const valueToSend = {
      "form":form,
      "user":account,
      "data":values,
    }
    console.log(valueToSend)
    dispatch(createLicence(valueToSend));
  };
  return (
    <div className="">
      <Row className="justify-content-center ">
        <Col md="4" >
          <h1 className="">Create or edit Exploration Licence</h1>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="4">
          <DynamicFields fields={form.fields} handleSubmit={handleSubmit} formatValue={formatValue} />
        </Col>
      </Row>
    </div>
  );
};

export default ExplorationLicence;
