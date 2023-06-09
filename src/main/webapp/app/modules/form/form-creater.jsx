import React, {useEffect, useState} from 'react';
// import {Input} from "app/shared/common/forms";
import FieldCreater from "./field-creater";
import {
  Button,
  Card, CardBody,
  CardHeader, CardText, CardTitle,
  Col,
  Container,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader, Nav, NavItem,
  NavLink,
  Row,
  Spinner,
  Table
} from 'reactstrap';
import {isEmail, translate, Translate, ValidatedField, ValidatedForm} from "react-jhipster";
import {languages, locales} from "app/config/translation";
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useAppDispatch, useAppSelector} from "app/config/store";
import {getFormType, getFieldType, updateForm, getFormTypeByState} from "app/modules/form/form.reducer";
import {getState} from "app/modules/licence/license.reducer";
import {toast} from "react-toastify";
import {trans as translator} from "app/shared/common/translator";

const FormCreater = () => {
  const dispatch = useAppDispatch();
  const form = useAppSelector(state => state.form.formTypes);
  const [allForm,setAllForm] = useState(null)
  const [formForEdit,setForm] = useState(null);
  const states = useAppSelector(state => state.licence.states);
  const [currentState,setCurrentState] = useState(0);
  const [currentForm,setCurrentForm] = useState(1)
  const [currentFormName,setCurrentFormName] = useState(null);
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
      setAllForm(form);
      setCurrentFormName(ed?.title)
    }
  }, [form]);
  const handleFields = (fields) => {
    console.log(fields);
    if (fields.newId){
      const editedFields = [...formForEdit.fields,fields]
      setForm((prevState)=>({...prevState,fields:editedFields}));
      const allFields = [...allForm.filter((f)=>{return f.id === formForEdit.id})[0]?.fields,fields]
      const newForm = {...formForEdit,fields:allFields}
      const allf = [...allForm.map(f=>{if(f.id===newForm.id){ return newForm}  return f})]
      setAllForm(allf);
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
    const ed = {...allForm.filter(f=> f.id == e)[0]}
    ed.fields = ed.fields.filter((f)=>{return f.state.id === parseInt(currentState)})
    setForm(ed);
    setCurrentForm(ed?.id);
    setCurrentFormName(ed?.title)
  }
  const handleSelectState = (e) => {
    if(formForEdit){
    const ed = {...allForm.filter(f=> f.id == formForEdit?.id)[0]}
    ed.fields = ed.fields.filter((f)=>{return f.state.id === parseInt(e)})
    setForm(ed);
    setCurrentState(e);
    }
  }
  const handleSubmit = (values)=>{
    const forms = {...allForm.filter(f=> f.id == values.id)[0]}
    const otherStateFields = {...forms.fields.filter(f=>{return f.state.id !== parseInt(currentState)})}
    const valueToSend = {...values}
    valueToSend.fields = [...valueToSend.fields,...Object.values(otherStateFields)];
    dispatch(updateForm(valueToSend)).then(()=>{
      //dispatch(getFormType())
      const allf = [...allForm.map(f=>{if(f.id===valueToSend.id){ return valueToSend}  return f})]
      setAllForm(allf);
      toast.success("Form Saved")}
    );
  }
  const trans = (v) =>{
    const returnValue =  translate("state."+v);
    return returnValue.startsWith('translation-not-found[') ? v : returnValue;
  }

   return (
     <Row className="d-flex justify-content-center">
       <Col md={"4"}>
         <Nav style={{marginBottom: '30px',cursor: 'pointer'}}
              className="nav nav-pills nav-fill flex-row flex-sm-row justify-content-start ">
           {form.map((f,i) => (
           <NavItem  onClick={()=>{handleSelectForm(f.id)}}>
             <NavLink className={currentForm===f.id ? "mb-3 mt-3 mt-lg-3 mr-3 mr-sm-0 mb-md-0 bg-light text-dark ":"mb-sm-3 mr-3 mr-sm-0 mt-3 mt-lg-3 mb-md-0 text-dark"}  >
               <Translate contentKey={"licence."+f.title}></Translate>
             </NavLink>
           </NavItem>
           ))}

         </Nav>

         <div className="d-flex flex-wrap justify-content-between  " style={{maxHeight :"72vh",overflowY :'scroll'}}>
           {states.map((f,i) => (
           <Card
             className="my-2 card-hover2"
             color={currentState===f.id ? "light":"secondary"}
             style={{
               width: '18rem'
             }}
             onClick={()=>{handleSelectState(f.id)}}

           >
             <CardHeader tag="h4" className="d-flex justify-content-center">
               {trans(f.name)}
             </CardHeader>
             <CardBody>
               <CardTitle tag="h6">
                 Description
               </CardTitle>
               <CardText className="text-xs">
                 {translator("licence.desc",f.name)}
               </CardText>
             </CardBody>
           </Card>
           ))}

         </div>

       </Col>
       <Col md="8">
         <Card className="shadow">
           <CardHeader className="border-0">
             <Row className="align-items-center">
               <div className="col">
                 <h2 className="mb-0">{currentFormName && translator("licence",currentFormName)}</h2>
               </div>
             </Row>
           </CardHeader>


             <ValidatedForm onSubmit={()=>{}} defaultValues={formForEdit}>

               <Col md="11" >
                 {formForEdit &&
                <FieldCreater formForEdit={formForEdit} fields = {formForEdit.fields}
                              state={states?.filter((s)=>{return s.id === parseInt(currentState)})[0]}
                              states={parseInt(currentState) !==0 ? [] : states }
                              handleFields={handleFields} handleDelete={handleDelete}/>}
               </Col>
               <div className="pb-4 pl-4">
                 <Button
                   // color="primary"
                   className="bg-translucent-success text-success"
                   onClick={()=>handleSubmit(formForEdit)} >
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
