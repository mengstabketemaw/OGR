import React, {useEffect, useState} from 'react';
import {TextFormat, Translate} from "react-jhipster";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Badge, Button, Table} from "reactstrap";
import FieldCreaterModal from "app/modules/form/field-creater-modal";
import {nanoid} from "nanoid";
import {getFieldType, getFormType, getFormTypeByState} from "app/modules/form/form.reducer";
import {getState} from "app/modules/licence/license.reducer";
import {useAppDispatch, useAppSelector} from "app/config/store";

const FieldCreater = (param) =>{
  const [show,setShow] = useState(false);
  const dispatch = useAppDispatch();
  const {formForEdit, state, fields, handleFields, handleDelete} = param;
  //const fields = useAppSelector(state => state.form.fieldsForEdit);
  const initalField = {
    "id":0,
    "label":"",
    "required":true,
    "placeholder":"",
    "fieldType":{},
    "state": {...state},
    "orderNum":null,
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
  // useEffect(() => {
  //   const params = {
  //     id: formForEdit?.id,
  //     state_id: state,
  //   };
  //   dispatch(getFormTypeByState(params))
  // }, [state,formForEdit]);

  const editField = (id) =>{
    if (fields.length > 0) {
      setField(fields.filter(f => f.id == id)[0]);
      setShow(true);
    }
  }
  return (
    <>
    <Table className="align-items-center table-flush" responsive>
      <thead className="thead-light">
      <tr>

        <th  scope="col" >
          <Translate contentKey="form.fields.label"></Translate>
          <FontAwesomeIcon icon="sort" />
        </th>
        <th  scope="col">
          <Translate contentKey="form.fields.placeholder"></Translate>
          <FontAwesomeIcon icon="sort" />
        </th>

        <th  scope="col">
          <Translate contentKey="form.fields.required"></Translate>
          <FontAwesomeIcon icon="sort" />
        </th>
        <th scope="col">
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
            <td><Translate contentKey={"fieldstype."+field.fieldType.display}></Translate></td>
          </tr>
        )
      )}
      </tbody>

    </Table>
      <div className="d-flex justify-content-end">
        <Button color="primary mt-3" onClick={showModal} >
          <FontAwesomeIcon icon="add" />
          &nbsp;
          <Translate contentKey={'form.add'} />
        </Button>
      </div>
      {show&&<FieldCreaterModal showModal={show}
                          handleClose={closeModal}
                          field={selectedField}
                          handleFields={handleFields}
                          handleDelete={(value) => {
                            closeModal();
                            handleDelete(value)
                          }}
      />}
    </>
  )
}

export default FieldCreater;
