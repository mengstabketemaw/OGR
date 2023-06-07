import React, {useState} from 'react';
import {Button, Modal} from "reactstrap";
import {Translate, ValidatedField} from "react-jhipster";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCloud, faWarning} from '@fortawesome/free-solid-svg-icons';
export const ShowRemarkModal = (props) => {

  const { handleClose, showModal, content } = props;


  return(
    <Modal isOpen={showModal} toggle={handleClose}  size={"md"}   className="modal-dialog-centered text-dark"
           contentClassName="text-dark">

      <div className="modal-header">
        <h3 className="modal-title" id="modal-title-denyIssue">
          <Translate contentKey={'workflow.weNeed'}/>
        </h3>
        <button
          aria-label="Close"
          className="close"
          data-dismiss="modal"
          type="button"
          onClick={handleClose}
        >
          <span aria-hidden={true}>×</span>
        </button>
      </div>
      <div className="modal-body">
        <div className="py-3 text-center">
          <ValidatedField
          type="textarea"
            value={content}
          />
        </div>
      </div>


    </Modal>

  )
}
