import React, { useState } from 'react';
import {InitialReview} from "app/modules/administration/workflow/definedStatePages/initial-review";
import {DecisionMaking} from "app/modules/administration/workflow/definedStatePages/decision-making";
import {Denied} from "app/modules/administration/workflow/definedStatePages/denied";
import {Issued} from "app/modules/administration/workflow/definedStatePages/issued";
import {SpecializedReview} from "app/modules/administration/workflow/definedStatePages/specialized-review";
import {TechnicalReview} from "app/modules/administration/workflow/definedStatePages/technical-review";
import PageSequence from "app/modules/administration/workflow/pageSwitcher/pageSequence";

const dynamicWorkFlow = () => {
  return(
    <PageSequence>
      <InitialReview/>
      <DecisionMaking/>
      <Denied/>
      <Issued/>
      <SpecializedReview/>
      <TechnicalReview/>
    </PageSequence>
  )
};

export default dynamicWorkFlow;
