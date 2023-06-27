import React, {useState} from 'react';
import {Alert, Button, Col, Form, Modal, ModalBody, ModalFooter, ModalHeader, Row} from "reactstrap";
import {translate, Translate, ValidatedField, ValidatedForm} from "react-jhipster";
import {Link} from "react-router-dom";
import {useAppSelector} from "app/config/store";

const FieldCreaterModal=(props)=>{
  const { handleClose, field, handleFields, handleDelete, states } = props;
  const fieldTypes = useAppSelector(state => state.form.fieldTypes);

  const handleSubmitField = value => {
    let valueToSend = {...value}
    valueToSend.options = value.options.split("\n").filter(e=>e !== "").map((e,id)=>({id:null, name:e.trim()}))
    valueToSend.fieldType = JSON.parse(valueToSend.fieldType)
    valueToSend.displayOn = JSON.parse(valueToSend.displayOn)
    handleFields(valueToSend);
    handleClose();
  };
  const trans = (v) =>{
    const returnValue =  translate("state."+v);
    return returnValue.startsWith('translation-not-found[') ? v : returnValue;
  }

  const defaultValue = () => {
    return {...field, fieldType: JSON.stringify(field.fieldType),
      displayOn: JSON.stringify(field.displayOn)||null
      , options: field.options.map(op=>op.name).join("\n") }
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
              name="portugueseLabel"
              label={translate('form.fields.portugueseLabel')}
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

              <ValidatedField required
                type="select" name="fieldType" label={translate('formModal.fieldType')}
              >
                {fieldTypes.map((f,i) => (
                  <option value={JSON.stringify(f)} key={f.id}>
                    <Translate contentKey={"fieldstype."+f.display}></Translate>
                  </option>
                ))}
              </ValidatedField >
            {states.length > 0 &&
            <ValidatedField
              type="select" name="displayOn"
              label={translate('formModal.displayOn')}
            >
              <option value={JSON.stringify({})} key={0}>

              </option>
              { states.map((f,i) => (
                <option value={JSON.stringify(f)} key={f.id}>
                  {trans(f.name)}
                </option>
              ))}
            </ValidatedField >}
              <ValidatedField type={"textarea"} name="options" label={translate('formModal.option')} placeholder={translate("formModal.optionPlaceHolder")} />
            <Button
              // color="secondary"
              className="bg-translucent-light text-dark"
              onClick={handleClose} tabIndex={1}>
              <Translate contentKey="entity.action.cancel">Cancel</Translate>
            </Button>{' '}
            <Button
              // color="primary"
              className="bg-translucent-primary text-primary"
              type="submit" >
              <Translate contentKey={'form.add'}/>
            </Button>{' '}
            <Button
              // color="danger"
              className="bg-translucent-danger text-danger"
              onClick={()=>handleDelete(field.id)}>
              <Translate contentKey={'form.delete'}/>
            </Button>
          </ValidatedForm>


        </ModalBody>


    </Modal>
  )
}
export default FieldCreaterModal;
