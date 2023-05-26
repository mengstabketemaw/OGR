import React, {useState} from 'react';
import {Alert, Button, Col, Form, Modal, ModalBody, ModalFooter, ModalHeader, Row} from "reactstrap";
import {translate, Translate, ValidatedField, ValidatedForm} from "react-jhipster";
import {Link} from "react-router-dom";
import {useAppSelector} from "app/config/store";

const FieldCreaterModal=(props)=>{
  const { handleClose, field, handleFields, handleDelete } = props;
  const fieldTypes = useAppSelector(state => state.form.fieldTypes);

  const handleSubmitField = value => {
    let valueToSend = {...value}
    valueToSend.options = value.options.split("\n").filter(e=>e !== "").map((e,id)=>({id:null, name:e.trim()}))
    valueToSend.fieldType = JSON.parse(valueToSend.fieldType)
    handleFields(valueToSend);
    handleClose();
  };

  const defaultValue = () => {
    return {...field, fieldType: JSON.stringify(field.fieldType), options: field.options.map(op=>op.name).join("\n") }
  }

  return(
    <Modal isOpen={props.showModal} toggle={handleClose} backdrop="static" id="form-page" autoFocus={false}>

        <ModalHeader id="field-title" data-cy="fieldTitle" toggle={handleClose}>
          <Translate contentKey={'formModal.fieldCreater'}/>
        </ModalHeader>

        <ModalBody>
          <ValidatedForm onSubmit={handleSubmitField} defaultValues={defaultValue()} >
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

              <ValidatedField type="select" name="fieldType" label={translate('formModal.fieldType')}
              >
                {fieldTypes.map((f,i) => (
                  <option value={JSON.stringify(f)} key={f.id}>
                    <Translate contentKey={"fieldstype."+f.display}></Translate>
                  </option>
                ))}
              </ValidatedField >
              <ValidatedField type={"textarea"} name="options" label={translate('formModal.option')} placeholder={translate("formModal.optionPlaceHolder")} />
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
