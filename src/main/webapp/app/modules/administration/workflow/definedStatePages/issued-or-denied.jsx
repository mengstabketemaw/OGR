import React, {useState} from 'react';
import {useAppSelector} from "app/config/store";
import {Button, Modal, ModalBody, ModalHeader} from "reactstrap";
import {translate, Translate, ValidatedField, ValidatedForm} from "react-jhipster";

export const IssuedOrDenied = (props) => {

  const { handleClose, showModal } = props;
  const fieldTypes = useAppSelector(state => state.form.fieldTypes);
  const handleSubmitField = value => {

  };


  return(
    <Modal isOpen={showModal} toggle={handleClose} backdrop="static" id="issue/deny" autoFocus={false} size="sm" centered>

      <ModalHeader id="field-title" data-cy="fieldTitle" toggle={handleClose}>
        <Translate contentKey={'workflow.issueordeny'}/>
      </ModalHeader>

      <ModalBody>

        <h4 className={""}><Translate contentKey={"workflow.infoPermit"}/> </h4>

            <Button color="secondary" onClick={handleClose} tabIndex={1}>
              <Translate contentKey="entity.action.cancel">Cancel</Translate>
            </Button>{' '}

            <Button className="bg-gradient-red text-white" >
              <Translate contentKey={'workflow.deny'}/>
            </Button>{' '}
            <Button className={'bg-gradient-green text-white'} type="submit" >
              <Translate contentKey={'workflow.authorize'}/>
            </Button>

      </ModalBody>


    </Modal>

  )
}
