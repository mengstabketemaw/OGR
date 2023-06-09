import React, { useState } from 'react';
import PageSequence from "app/modules/administration/workflow/pageSwitcher/pageSequence";
import {useAppSelector} from "app/config/store";

const DynamicWorkFlow = (props) => {
  const {id, formId} = props;
  const states = useAppSelector(states => states.licence.states)
  const renderStateComponents = () =>{
    return states.map((state) => {
      const Component = require(`app/modules/administration/workflow/definedStatePages/${state.pageName}`).default;
      return <Component name={state.name} id={state.id} key={state.id} />;
    });
  }
  return(
    // Sequence Matter here toDo make it to not matter
    <PageSequence id={id} formId={formId}>
      {renderStateComponents()}
    </PageSequence >
  )
};

export default DynamicWorkFlow;
