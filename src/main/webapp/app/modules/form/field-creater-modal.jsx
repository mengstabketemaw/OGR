import React from 'react';
import {Alert, Button, Col, Form, Modal, ModalBody, ModalFooter, ModalHeader, Row} from "reactstrap";
import {translate, Translate, ValidatedField, ValidatedForm} from "react-jhipster";
import {Link} from "react-router-dom";
import {useAppSelector} from "app/config/store";

const FieldCreaterModal=(props)=>{
  const { handleClose, field, handleFields } = props;
  const fieldTypes = useAppSelector(state => state.form.fieldTypes);
  const handleSubmit = value => {
    handleFields(value);
  };
  return(
    <Modal isOpen={props.showModal} toggle={handleClose} backdrop="static" id="form-page" autoFocus={false}>

        <ModalHeader id="field-title" data-cy="fieldTitle" toggle={handleClose}>
          Field Creater
        </ModalHeader>

        <ModalBody>
          <ValidatedForm onSubmit={handleSubmit} defaultValues={field} >
          <ValidatedField
                type="text"
                name="label"
                label="Label"//{translate('global.form.username.label')}
                placeholder="add label"//{translate('global.form.username.placeholder')}
                required

              />
              <ValidatedField
                type="text"
                name="placeholder"
                label="Placeholder"//{translate('login.form.password')}
                placeholder="add placeholder"
                required
              />
              <ValidatedField
                name="required"
                type="checkbox"
                check
                label="Required"//{translate('login.form.rememberme')}
                value={true}

              />
              <ValidatedField type="select" name="langKey" label="Field Type"//{translate('form.fields.title')}
              >
                {fieldTypes.map((f,i) => (
                  <option value={f.id} key={f.id}>
                    {f.names}
                  </option>
                ))}
              </ValidatedField >
            <Button color="secondary" onClick={handleClose} tabIndex={1}>
              <Translate contentKey="entity.action.cancel">Cancel</Translate>
            </Button>{' '}
            <Button color="primary" type="submit" data-cy="submit">
              Add
            </Button>
          </ValidatedForm>


        </ModalBody>


    </Modal>
  )
}
export default FieldCreaterModal;
