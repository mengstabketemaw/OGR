import React, {useEffect, useState} from 'react';
// import {Input} from "app/shared/common/forms";
import FieldCreater from "./field-creater";
import {Button, Col, FormGroup, FormText, Input, Label, Row} from "reactstrap";
import {isEmail, translate, Translate, ValidatedField, ValidatedForm} from "react-jhipster";
import {languages, locales} from "app/config/translation";
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useAppDispatch, useAppSelector} from "app/config/store";
import {getFormType, getFieldType, updateForm} from "app/modules/form/form.reducer";

const FormCreater = () => {
  const dispatch = useAppDispatch();
  const form = useAppSelector(state => state.form.formTypes);
  const [formForEdit,setForm] = useState([]);

  useEffect(() => {
    dispatch(getFormType());
    dispatch(getFieldType());
  }, []);
  useEffect(() => {
    if(form.length > 0) setForm(form[0]);
  }, [form]);
  const handleFields = (fields) => {
    console.log(fields);
    if (fields.newId){
      const editedFields = [...formForEdit.fields,fields]
      setForm((prevState)=>({...prevState,fields:editedFields}));
    }else{
      const editform = {...formForEdit};
      editform.fields = editform.fields.map(f=>{if(f.id==fields.id){return fields} return f})
      setForm(editform);
    }
  }
  const handleDelete= (id) =>{
    const editform = {...formForEdit};
    editform.fields = editform.fields.filter(f=> {return f.id !=id})
    setForm(editform);
  }
  const handleSelectForm = (e) => {
    setForm(form.filter(f=> f.id == e.target.value)[0]);
  }
  const handleSubmit = (values)=>{
    dispatch(updateForm(values))
  }

   return (
     <div>
       <Row className="justify-content-center">
         <Col md="8">
           <h1>
             <Translate contentKey="form.edit"> Edit a form</Translate>
           </h1>
         </Col>
       </Row>
       <Row className="justify-content-center">
         <Col md="8">
           {/*{loading ? (*/}
           {/*  <p>Loading...</p>*/}
           {/*) : (*/}
             <ValidatedForm onSubmit={handleSubmit} defaultValues={formForEdit}>

               <ValidatedField type="select" name="langKey" label={translate('form.fields.title')}
               onChange={handleSelectForm}
               >

                 {form.map((f,i) => (
                   <option value={f.id} key={f.id}>
                     {f.title}
                   </option>
                 ))}
               </ValidatedField >

                <FieldCreater fields={formForEdit.fields} handleFields={handleFields} handleDelete={handleDelete}/>
               <Button tag={Link} to="/admin/user-management" replace color="info">
                 <FontAwesomeIcon icon="arrow-left" />
                 &nbsp;
                 <span className="d-none d-md-inline">
                  <Translate contentKey="entity.action.back">Back</Translate>
                </span>
               </Button>
               &nbsp;
               <Button color="primary" type="submit" >
                 <FontAwesomeIcon icon="save" />
                 &nbsp;
                 <Translate contentKey="entity.action.save">Save</Translate>
               </Button>
             </ValidatedForm>

         </Col>
       </Row>
     </div>
   )
};
export default FormCreater;
