import React, {useState} from 'react';
import {Alert, Button, Col, Form, Modal, ModalBody, ModalFooter, ModalHeader, Row} from "reactstrap";
import {translate, Translate, ValidatedField, ValidatedForm} from "react-jhipster";
import {Link} from "react-router-dom";
import {useAppSelector} from "app/config/store";

const FieldCreaterModal=(props)=>{
  let { handleClose, field, handleFields, handleDelete } = props;
  const [fState, setFState] = useState(field.fieldType);
  const fieldTypes = useAppSelector(state => state.form.fieldTypes);
  const isSelectField = field.fieldType.name === "select";
  const optionsValue = field.options.map(option=>option.name).join("\n");

  const [dropDown, setDropdown] = useState({ show: isSelectField, value: optionsValue });

  const handleSubmitField = value => {
    let valueToSend = {...value}
    valueToSend.fieldType = JSON.parse(valueToSend.fieldType)
    handleFields({...valueToSend, options: dropDown.value.split("\n").map((e,id)=>({id, name:e.trim()}))});
    handleClose();
  };

  const handleFieldTypesClick = (e) => {
    setDropdown((prev)=>({...prev, show: JSON.parse(e.target.value)?.name === "select"}));
    setFState(JSON.parse(e.target.value))
  }

  const defaultValue = () => {
    return {...field, fieldType: field.fieldType.id}
  }

  return(
    <Modal isOpen={props.showModal} toggle={handleClose} backdrop="static" id="form-page" autoFocus={false}>

        <ModalHeader id="field-title" data-cy="fieldTitle" toggle={handleClose}>
          <Translate contentKey={'formModal.fieldCreater'}/>
        </ModalHeader>

        <ModalBody>
          <ValidatedForm onSubmit={handleSubmitField} defaultValues={{...field, fieldType: JSON.stringify(fState)}} >
          <ValidatedField
                type="text"
                name="label"
                label={translate('form.fields.label')}
                //placeholder="add label"//{translate('global.form.username.placeholder')}
                required

              />
              <ValidatedField
                type="text"
                name="placeholder"
                label={translate('form.fields.placeholder')}
                //placeholder="add placeholder"

              />
              <ValidatedField
                name="orderNum"
                type="number"
                label={translate('formModal.order')}

              />
              <ValidatedField
                name="required"
                type="checkbox"
                check
                label={translate('form.fields.required')}
                value={true}

              />

              <ValidatedField type="select" name="fieldType" label={translate('formModal.fieldType')} onChange={handleFieldTypesClick}
              >
                {fieldTypes.map((f,i) => (
                  <option value={JSON.stringify(f)} key={f.id}>
                    <Translate contentKey={"fieldstype."+f.display}></Translate>
                  </option>
                ))}
              </ValidatedField >
              <ValidatedField type={"textarea"} hidden={!dropDown.show} value={dropDown.value} onChange={e=>setDropdown({show: true, value: e.target.value})}>

              </ValidatedField>
            <Button color="secondary" onClick={handleClose} tabIndex={1}>
              <Translate contentKey="entity.action.cancel">Cancel</Translate>
            </Button>{' '}
            <Button color="primary" type="submit" >
              <Translate contentKey={'form.add'}/>
            </Button>{' '}
            <Button color="danger" onClick={()=>handleDelete(field.id)}>
              <Translate contentKey={'form.delete'}/>
            </Button>
          </ValidatedForm>


        </ModalBody>


    </Modal>
  )
}
export default FieldCreaterModal;
