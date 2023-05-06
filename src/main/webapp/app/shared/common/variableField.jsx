import React, {useState} from 'react';
import {Checkbox, HeaderCheckbox, Textarea, Input, Select, FormAlert, FieldFeedbackLabel, DatePickerField} from './forms'
import { Formik, Form, Field } from "formik";
const VariableField = (params) => {
  const [type,setType] = useState("input")

  const field = (type) => {
   switch (type){
     case 'input':
       return  <Input />
     case 'create':
       return  (<div>Create</div>)
   }
  }

  return (
      field(type)
      )

};
export default VariableField;
