import React from 'react';
import FormDataUpdate from "app/shared/form/form-data-update";
import {Col} from "reactstrap";
import DynamicFields from "app/shared/common/dynamicFields";
import {formatValue} from "app/shared/common/formatValueWithCustomField";
 const FormEdit = () => {
  return (

   <>
     <Col  md="8" className={"container"} >
       <div className="d-flex ">
         <h1> Edit Form</h1>
       </div>
       <FormDataUpdate seq={true}/>
     </Col>
   </>
  )
}

export default  FormEdit;
