import React, {useState} from 'react';
import {TextFormat, Translate} from "react-jhipster";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Badge, Button, Table} from "reactstrap";
import FieldCreaterModal from "app/modules/form/field-creater-modal";
import {nanoid} from "nanoid";

const FieldCreater = (param) =>{
  const [show,setShow] = useState(false);
  const {fields, handleFields, handleDelete} = param;
  const initalField = {
    "id":0,
    "label":"",
    "required":true,
    "placeholder":"",
    "fieldType":{},
    "options":[],
    "newId":nanoid()
  }
  const [selectedField,setField] = useState(initalField)
  const showModal = () => {
    setField(initalField);
    setShow(true);
  }
  const closeModal= () => {
    setShow(false);
  }


  const editField = (id) =>{
    if (fields.length > 0) {
      setField(fields.filter(f => f.id == id)[0]);
      setShow(true);
    }
  }
  return (
    <>
    <Table responsive striped>
      <thead>
      <tr>

        <th className="hand" onClick={}>
          <Translate contentKey="form.fields.label"></Translate>
          <FontAwesomeIcon icon="sort" />
        </th>
        <th className="hand" onClick={}>
          <Translate contentKey="form.fields.placeholder"></Translate>
          <FontAwesomeIcon icon="sort" />
        </th>

        <th className="hand" onClick={}>
          <Translate contentKey="form.fields.required"></Translate>
          <FontAwesomeIcon icon="sort" />
        </th>
        <th>
          <Translate contentKey="form.fields.type"></Translate>
        </th>

        <th />
      </tr>
      </thead>
      <tbody>
      {fields?.map( (field) =>(
          <tr id={field.id} key={field.id} onClick={()=>editField(field.id)}>
            <td>{field.label}</td>
            <td>{field.placeholder}</td>
            <td>{field.required ? (<Button color="success">
              TRUE
            </Button>):<Button color="success">
              FALSE
            </Button>}</td>
            <td>{field.fieldType.display}</td>
          </tr>
        )
      )}
      </tbody>

    </Table>
      <div className="d-flex justify-content-end">
        <Button color="primary" onClick={showModal} >
          <FontAwesomeIcon icon="add" />
          &nbsp;
          Add
        </Button>
      </div>
      <FieldCreaterModal showModal = {show}
                         handleClose = {closeModal}
                         field = {selectedField}
                         handleFields = {handleFields}
                         handleDelete={(value)=>{closeModal();handleDelete(value)}}
      />
    </>
  )
}

export default FieldCreater;
