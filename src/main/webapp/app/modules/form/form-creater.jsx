import React, {useEffect, useState} from 'react';
// import {Input} from "app/shared/common/forms";
import FieldCreater from "./field-creater";
import { Button, Card, CardHeader, Col, Container, Modal, ModalBody, ModalFooter, ModalHeader, Row, Spinner, Table } from 'reactstrap';
import {isEmail, translate, Translate, ValidatedField, ValidatedForm} from "react-jhipster";
import {languages, locales} from "app/config/translation";
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useAppDispatch, useAppSelector} from "app/config/store";
import {getFormType, getFieldType, updateForm, getFormTypeByState} from "app/modules/form/form.reducer";
import {getState} from "app/modules/licence/license.reducer";
import {toast} from "react-toastify";

const FormCreater = () => {
  const dispatch = useAppDispatch();
  const form = useAppSelector(state => state.form.formTypes);
  const [formForEdit,setForm] = useState(null);
  const states = useAppSelector(state => state.licence.states);
  const [currentState,setCurrentState] = useState(0);
  useEffect(() => {
    dispatch(getFormType());
    dispatch(getFieldType());
    dispatch(getState());
  }, []);
  useEffect(() => {
    if(form.length > 0) {
      const ed = {...form[0]}
      ed.fields = ed.fields.filter((f)=>{return f.state.id === parseInt(currentState)})
      setForm(ed)

    }
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
    const ed = {...form.filter(f=> f.id == e.target.value)[0]}
    ed.fields = ed.fields.filter((f)=>{return f.state.id === parseInt(currentState)})
    setForm(ed);
  }
  const handleSelectState = (e) => {
    if(formForEdit){
    const ed = {...form.filter(f=> f.id == formForEdit?.id)[0]}
    ed.fields = ed.fields.filter((f)=>{return f.state.id === parseInt(e.target.value)})
    setForm(ed);
    setCurrentState(e.target.value);
    }
  }
  const handleSubmit = (values)=>{
    const forms = {...form.filter(f=> f.id == values.id)[0]}
    const otherStateFields = {...forms.fields.filter(f=>{return f.state.id !== parseInt(currentState)})}
    const valueToSend = {...values}
    valueToSend.fields = [...valueToSend.fields,...Object.values(otherStateFields)];
    dispatch(updateForm(valueToSend)).then(()=>{
      //dispatch(getFormType())
      toast.success("Form Saved")}
    );
  }

   return (
     <Row className="d-flex justify-content-center">
       <Col md="8">
         <Card className="shadow">
           <CardHeader className="border-0">
             <Row className="align-items-center">
               <div className="col">
                 <h3 className="mb-0"><Translate contentKey="form.edit"/></h3>
               </div>
             </Row>
           </CardHeader>

           {/*{loading ? (*/}
           {/*  <p>Loading...</p>*/}
           {/*) : (*/}
             <ValidatedForm onSubmit={()=>{}} defaultValues={formForEdit}>
               <Col md="8">
               <ValidatedField type="select" name="langKey" label={translate('form.fields.title')}
               onChange={handleSelectForm}
               >{form.map((f,i) => (
                   <option value={f.id} key={f.id}>
                     {f.title}
                   </option>
                 ))}
               </ValidatedField >
               </Col>
               <Col md="8">
                 <ValidatedField type="select" name="langKey" label={translate('form.state')}
                                 onChange={handleSelectState}
                 > <>

                   {states.map((f,i) => (
                   <option value={f.id} key={f.id}>
                     {f.name}
                   </option>
                 ))}
                 </>
                 </ValidatedField >
               </Col>
               <Col md="11">
                 {formForEdit &&
                <FieldCreater formForEdit={formForEdit} fields = {formForEdit.fields}
                              state={states?.filter((s)=>{return s.id === parseInt(currentState)})[0]}
                              handleFields={handleFields} handleDelete={handleDelete}/>}
               </Col>
               <div className="pb-4 pl-4">
                   <Button tag={Link} to="/admin/user-management" replace color="info">
                   <FontAwesomeIcon icon="arrow-left" />
                   &nbsp;
                   <span className="d-none d-md-inline">
                    <Translate contentKey="entity.action.back">Back</Translate>
                  </span>
                 </Button>
                 &nbsp;
                 <Button color="primary" onClick={()=>handleSubmit(formForEdit)} >
                   <FontAwesomeIcon icon="save" />
                   &nbsp;
                   <Translate contentKey="entity.action.save">Save</Translate>
                 </Button>
               </div>
             </ValidatedForm>
          </Card>
         </Col>
       </Row>
   )
};
export default FormCreater;
