import React, {useEffect} from 'react';
import DynamicWorkFlow from './definedStatePages/index'
import {useParams} from "react-router-dom";
import {useAppDispatch} from "app/config/store";
import {getWorkflowByForm,getState} from "app/modules/licence/license.reducer";
import {getStateOfLicence} from "app/modules/administration/workflow/workflow.reducer";

const SequenceLanding = () => {
   const { formId, id } = useParams();
   const dispatch = useAppDispatch();
   useEffect(() => {
     if(formId===-1)  return;
     // @ts-ignore
     dispatch(getWorkflowByForm(formId))
     dispatch(getStateOfLicence(id))
     dispatch(getState())
   }, [formId,id]);
   return (
    <DynamicWorkFlow id={id} formId={formId} />
   )
}
export default SequenceLanding;
