import React, {useContext, useEffect} from "react";
import {
  getFieldsByState,
  getFieldsDataByLicenceTR,
  createTechnicalReview
} from "app/modules/administration/workflow/workflow.reducer";
import {Link, useParams} from "react-router-dom";
import {PageContext} from "app/modules/administration/workflow/pageSwitcher/pageSequence";
import {useAppDispatch, useAppSelector} from "app/config/store";
import DynamicFields from "app/shared/common/dynamicFields";
import {formatValue,getFieldValue} from "app/shared/common/formatValueWithCustomField";
import {Button, Col, Spinner} from "reactstrap";
import {toast} from "react-toastify";
import {Translate} from "react-jhipster";

export const TechnicalReview = (params) => {
  const stateKey = 2;
  const dispatch = useAppDispatch();
  const { formId} = useContext(PageContext);
  const {key} = params;
  const fields = useAppSelector(state=> state.workflow.currentFields);
  const fields_data = useAppSelector(state=> state.workflow.currentFieldData);
  const {  id } = useParams();
  const fieldDateFormated = fields_data && getFieldValue(fields_data);
  useEffect(() => {
    const params = {
      id: parseInt(formId),
      state_id: stateKey,
    };
    dispatch(getFieldsByState(params));
    dispatch(getFieldsDataByLicenceTR(parseInt(id)));
  }, []);
  const handleSumbit = (values) =>{
    console.log(values)
    dispatch(createTechnicalReview(values)).then(
      toast.success("Tech Review Saved")
    )
  }
  return (

    <>
      <Col  md="8" className={"container"} >
        <div className="d-flex ">
          <h1> <Translate contentKey="workflow.technicalreview"></Translate></h1>
        </div>
        <DynamicFields fields={fields} handleSubmit={handleSumbit} formatValue = {formatValue}
                       defaultValue = {fieldDateFormated}
                       licence_id ={parseInt(id)}
                       backButtonShow = {false}
                       currentFields = {fields_data}
                       saveButtonName = "form.submit"
                       saveButtonClass = "bg-gradient-green text-white"
        />
      </Col>
    </>

  )
}
