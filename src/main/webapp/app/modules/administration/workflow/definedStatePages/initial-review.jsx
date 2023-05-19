import React, {useContext, useEffect} from "react";
import {getFieldsByState} from "app/modules/administration/workflow/workflow.reducer";
import {useParams} from "react-router-dom";
import {PageContext} from "app/modules/administration/workflow/pageSwitcher/pageSequence";
import {useAppDispatch, useAppSelector} from "app/config/store";
import DynamicFields from "app/shared/common/dynamicFields";

export const InitialReview = (params) => {
  const stateKey = 1;
  const dispatch = useAppDispatch();
  const { formId, id} = useContext(PageContext);
  const {key} = params;
  const fields = useAppSelector(state=> state.workflow.currentFields);
  //const { formId, id } = useParams();
  useEffect(() => {
    const params = {
      id: parseInt(formId),
      state_id: stateKey,
    };
    dispatch(getFieldsByState(params));
  }, []);
  return (

    <>InitialReview
      <DynamicFields fields={fields} />
    </>

  )
}
