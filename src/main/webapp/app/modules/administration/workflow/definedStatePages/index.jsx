import React, { useState } from 'react';
import {InitialReview} from "app/modules/administration/workflow/definedStatePages/initial-review";
import {DecisionMaking} from "app/modules/administration/workflow/definedStatePages/decision-making";
import {IssuedOrDenied} from "app/modules/administration/workflow/definedStatePages/issued-or-denied";
import {SpecializedReview} from "app/modules/administration/workflow/definedStatePages/specialized-review";
import {TechnicalReview} from "app/modules/administration/workflow/definedStatePages/technical-review";
import PageSequence from "app/modules/administration/workflow/pageSwitcher/pageSequence";
import FormEdit from "app/modules/administration/workflow/definedStatePages/formEdit";

const DynamicWorkFlow = (props) => {
  const {id, formId} = props;
  return(
    // Sequence Matter here toDo make it to not matter
    <PageSequence id={id} formId={formId}>
      <FormEdit name ="Form Edit" />
      <InitialReview name ="Initial Review"/>
      <TechnicalReview name ="Technical Review" />
      <SpecializedReview name ="Payment"/>
      <DecisionMaking name ="Decision Making" />
    </PageSequence >
  )
};

export default DynamicWorkFlow;
