import React, { useState } from 'react';
import {InitialReview} from "app/modules/administration/workflow/definedStatePages/initial-review";
import {DecisionMaking} from "app/modules/administration/workflow/definedStatePages/decision-making";
import {IssuedOrDenied} from "app/modules/administration/workflow/definedStatePages/issued-or-denied";
import {SpecializedReview} from "app/modules/administration/workflow/definedStatePages/specialized-review";
import {TechnicalReview} from "app/modules/administration/workflow/definedStatePages/technical-review";
import PageSequence from "app/modules/administration/workflow/pageSwitcher/pageSequence";
import FormEdit from "app/modules/administration/workflow/definedStatePages/formEdit";

const DynamicWorkFlow = (id) => {
  return(
    // Sequence Matter here toDo make it to not matter
    <PageSequence id={id}>
      <FormEdit/>
      <InitialReview/>
      <TechnicalReview/>
      <SpecializedReview/>
      <DecisionMaking/>
      <IssuedOrDenied/>
    </PageSequence>
  )
};

export default DynamicWorkFlow;
