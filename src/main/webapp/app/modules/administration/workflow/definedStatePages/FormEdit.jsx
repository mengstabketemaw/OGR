import React from 'react';
import FormDataUpdate from "app/shared/form/form-data-update";
import {Col} from "reactstrap";
import DynamicFields from "app/shared/common/dynamicFields";
import {formatValue} from "app/shared/common/formatValueWithCustomField";
import {Translate} from "react-jhipster";
import {trans} from "app/shared/common/translator";
 const FormEdit = (params) => {
   const {id :key,name} = params;
  return (

   <>
     <Col  md="8" className={"container"} >
       <div className="d-flex ">
         <h2> {trans("workflow",name)}</h2>
       </div>
       <FormDataUpdate seq={true}/>
     </Col>
   </>
  )
}

export default  FormEdit;
