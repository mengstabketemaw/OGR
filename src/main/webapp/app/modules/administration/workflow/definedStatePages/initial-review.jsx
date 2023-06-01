import React, {useContext, useEffect, useState} from "react";
import {
  getFieldsByState,
  getFieldsDataByLicence,
  createInitialReview, updateStatusAndState
} from "app/modules/administration/workflow/workflow.reducer";
import {Link, useNavigate, useParams} from "react-router-dom";
import {PageContext} from "app/modules/administration/workflow/pageSwitcher/pageSequence";
import {useAppDispatch, useAppSelector} from "app/config/store";
import DynamicFields from "app/shared/common/dynamicFields";
import {formatValue,getFieldValue,formatDisplayOn} from "app/shared/common/formatValueWithCustomField";
import {Button, Col, Spinner} from "reactstrap";
import {toast} from "react-toastify";
import {Translate} from "react-jhipster";
import DisplayData from "app/shared/common/displayDynamicData";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
  faAnglesDown,
  faAnglesUp,
  faCircleMinus,
  faCodePullRequest,
  faPlugCircleMinus
} from "@fortawesome/free-solid-svg-icons";

export const InitialReview = (params) => {
  const nav = useNavigate();
  const stateKey = 1;
  const dispatch = useAppDispatch();
  const { formId, currentPage , sequenceFromDatabase, showReqModal ,pages, switchPage} = useContext(PageContext);
  const {key} = params;
  const fields = useAppSelector(state=> state.workflow.currentFields);
  const fields_data = useAppSelector(state=> state.workflow.currentFieldData);
  const {  id } = useParams();
  const fieldDateFormated = fields_data && getFieldValue(fields_data);
  const formData = useAppSelector(state=> state.licence.license.data);
  const formFields = useAppSelector(state=> state.licence.license.form.fields);
  const data = formatDisplayOn(getFieldValue(formData)
    ,[...formFields.filter(f=>f.state.id===0)]
    ,stateKey)
  const [collapse,setCollapse] = useState(false);
  useEffect(() => {
    const params = {
      id: parseInt(formId),
      state_id: stateKey,
    };
    dispatch(getFieldsByState(params));
    dispatch(getFieldsDataByLicence(parseInt(id)));
  }, []);
  const handleSwitchPage = (pageNumber) => {

    if (pageNumber >= 0 && pageNumber < pages.length) {
      switchPage(pageNumber);
    }
  };
  const handleSumbit = (values) =>{

    console.log(values)
    dispatch(createInitialReview(values)).then( () =>{
      toast.success("Initial Review Saved")
       handleSwitchPage(currentPage+1)
    }
    )
  }
   const handleValue = (issue) =>{
    const param = {
      id : id,
      data : {
        stateId : sequenceFromDatabase[currentPage],
        status:issue?'Authorized':'Denied'
      }
    }
    dispatch(updateStatusAndState(param)).then(()=>{
      nav(-1)
      setTimeout(() => {
        // Code to execute after 1 second
        nav(-0)
      }, 50)}
    )
  }


  return (

    <>
      <Col  md="8" className={"container"} >
        <div className="d-flex justify-content-between">
          <h1>  <Translate contentKey="workflow.initialreview"></Translate> {'  '}
            </h1>
          <div >
          {collapse ? <FontAwesomeIcon icon={faAnglesDown} onClick={()=>setCollapse(!collapse)} />
          :<FontAwesomeIcon icon={faAnglesUp} onClick={()=>setCollapse(!collapse)} />}
          </div>
        </div>
        <DisplayData data={data} collapse={collapse}/>

        <DynamicFields fields={fields} handleSubmit={handleSumbit} formatValue = {formatValue}
                       defaultValue = {fieldDateFormated}
                       licence_id ={parseInt(id)}
                       currentFields = {fields_data}
                       backButtonShow = {true}
                       backButtonName = 'workflow.deny'
                       backButtonIcon = {faCircleMinus}
                       backButtonClass = "bg-gradient-danger text-white"
                       backButtonAction = {()=>{handleValue(false)}}
                       saveButtonName = "form.submit"
                       saveButtonClass = "bg-gradient-green text-white"
                       moreReqButtonShow = {true}
                       moreReqButtonName = 'workflow.moreReq'
                       moreReqButtonIcon = {faCodePullRequest}
                       moreReqButtonClass = "bg-gradient-info text-white"
                       moreReqButtonAction = {showReqModal}

        />
      </Col>
    </>

  )
}
