import React, {useEffect} from 'react';
import DynamicWorkFlow from './definedStatePages/index'
import {useParams} from "react-router-dom";
import {useAppDispatch} from "app/config/store";
import {getWorkflowByForm} from "app/modules/licence/license.reducer";
 const SequenceLanding = () => {
   const { formId, id } = useParams();
   const dispatch = useAppDispatch();
   useEffect(() => {
     if(formId===-1)  return;
     // @ts-ignore
     dispatch(getWorkflowByForm(formId))
   }, [formId]);
   return (
    <DynamicWorkFlow id={id} />
   )
}
export default SequenceLanding;
