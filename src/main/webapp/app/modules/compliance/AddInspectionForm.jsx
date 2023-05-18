// Form is based on Formik
import React from "react";
import {Formik} from "formik";



export function AddInspectionForm() {
  return (
    <>
      <Formik
        enableReinitialize={true}
        onSubmit={(values) => {
          saveCar(values);
        }}
      >
        {({handleSubmit}) => (
          <>

          </>
        )}
      </Formik>
    </>
  );
}
