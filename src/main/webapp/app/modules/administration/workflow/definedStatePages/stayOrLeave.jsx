import React, {useState} from 'react';
import {Button, Modal} from "reactstrap";
import { Translate } from "react-jhipster";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCloud, faWarning} from '@fortawesome/free-solid-svg-icons';
export const StayOrLeave = (props) => {

  const { handleClose, showModal, handleSubmit } = props;


  return(
    <Modal isOpen={showModal} toggle={handleClose}  size={"sm"}   className="modal-dialog-centered modal-info"
           contentClassName="bg-gradient-white">

     <div className="modal-header">
        <h3 className="modal-title  text-dark" id="modal-title-denyIssue">
          <Translate contentKey={'workflow.stay'}/>?
        </h3>
        <button
          aria-label="Close"
          className="close"
          data-dismiss="modal"
          type="button"
          onClick={handleClose}
        >
          <span aria-hidden={true} className="text-black-50">×</span>
        </button>
      </div>
      <div className="modal-body">
        <div className="py-3 text-center text-black-50">
          <p>
            <Translate contentKey={"workflow.stayOrLeave"}/>?
          </p>
        </div>
      </div>
      <div className="modal-footer">
        <Button className={'bg-translucent-dark text-black'} onClick={()=> handleSubmit(false)
        } ><Translate contentKey={'workflow.leave'}/>

        </Button>
        <Button className={'bg-translucent-dark text-black'} onClick={()=> handleSubmit(true)} >
          <Translate contentKey={'workflow.stay'}/>
        </Button>
      </div>

    </Modal>

  )
}
