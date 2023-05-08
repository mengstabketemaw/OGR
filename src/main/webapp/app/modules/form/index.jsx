import React from 'react';
import ErrorBoundaryRoutes from "app/shared/error/error-boundary-routes";
import FormCreater from "app/modules/form/form-creater";
import FieldCreaterModal from "app/modules/form/field-creater-modal";
import {Route} from "react-router-dom";
const FormRoutes = () =>{
  return(
    <div>
      <ErrorBoundaryRoutes>
        <Route path="create" element={<FormCreater/>}/>
      </ErrorBoundaryRoutes>
    </div>
  )
}

export default FormRoutes;
