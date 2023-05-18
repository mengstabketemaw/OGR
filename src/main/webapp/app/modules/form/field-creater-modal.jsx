import React, {useState} from 'react';
import {Alert, Button, Col, Form, Modal, ModalBody, ModalFooter, ModalHeader, Row} from "reactstrap";
import {translate, Translate, ValidatedField, ValidatedForm} from "react-jhipster";
import {Link} from "react-router-dom";
import {useAppSelector} from "app/config/store";

const FieldCreaterModal=(props)=>{
  const [dropDown, setDropdown] = useState({show: false, value:""});

  const { handleClose, field, handleFields, handleDelete } = props;
  const fieldTypes = useAppSelector(state => state.form.fieldTypes);
  const handleSubmitField = value => {
    let valueToSend = {...value}
    valueToSend.fieldType = JSON.parse(valueToSend.fieldType)
    handleFields({...valueToSend, options: dropDown.value.split("\n").map((e,id)=>({id, name:e.trim()}))});
    handleClose();
  };

  const handleFieldTypesClick = (e) => {
    setDropdown((prev)=>({...prev, show: JSON.parse(e.target.value)?.name === "select"}));
  }


  return(
    <Modal isOpen={props.showModal} toggle={handleClose} backdrop="static" id="form-page" autoFocus={false}>

        <ModalHeader id="field-title" data-cy="fieldTitle" toggle={handleClose}>
          Field Creater
        </ModalHeader>

        <ModalBody>
          <ValidatedForm onSubmit={handleSubmitField} defaultValues={field} >
          <ValidatedField
                type="text"
                name="label"
                label="Label"//{translate('global.form.username.label')}
                //placeholder="add label"//{translate('global.form.username.placeholder')}
                required

              />
              <ValidatedField
                type="text"
                name="placeholder"
                label="Placeholder"//{translate('login.form.password')}
                //placeholder="add placeholder"
                required
              />
              <ValidatedField
                name="required"
                type="checkbox"
                check
                label="Required"//{translate('login.form.rememberme')}
                value={true}

              />
              <ValidatedField type="select" name="fieldType" label="Field Type" onChange={handleFieldTypesClick}
              >
                {fieldTypes.map((f,i) => (
                  <option value={JSON.stringify(f)} key={f.id}>
                    {f.display}
                  </option>
                ))}
              </ValidatedField >
            {dropDown.show &&
              <ValidatedField type={"textarea"} draggable={true} value={dropDown.value} onChange={e=>setDropdown({show: true, value: e.target.value})}>

              </ValidatedField>
            }
            <Button color="secondary" onClick={handleClose} tabIndex={1}>
              <Translate contentKey="entity.action.cancel">Cancel</Translate>
            </Button>{' '}
            <Button color="primary" type="submit" >
              Add
            </Button>{' '}
            <Button color="danger" onClick={()=>handleDelete(field.id)}>
              Delete
            </Button>
          </ValidatedForm>


        </ModalBody>


    </Modal>
  )
}
export default FieldCreaterModal;
