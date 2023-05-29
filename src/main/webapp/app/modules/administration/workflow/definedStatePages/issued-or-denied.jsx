import React, {useState} from 'react';
import {Button, Modal} from "reactstrap";
import { Translate } from "react-jhipster";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCloud, faWarning} from '@fortawesome/free-solid-svg-icons';
export const IssuedOrDenied = (props) => {

  const { handleClose, showModal, handleSubmit } = props;


  return(
    <Modal isOpen={showModal} toggle={handleClose}  size={"sm"}   className="modal-dialog-centered modal-info"
           contentClassName="bg-gradient-info">

     <div className="modal-header">
        <h6 className="modal-title" id="modal-title-denyIssue">
          <Translate contentKey={'workflow.issueordeny'}/>
        </h6>
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
          <i className="ni ni-bell-55 ni-3x" />
          <FontAwesomeIcon icon={faWarning} size={"2x"}/>
          <h4 className="heading mt-4"><Translate contentKey={'compliance.readThis'}/></h4>
          <p>
            <Translate contentKey={"workflow.infoPermit"}/>
          </p>
        </div>
      </div>
      <div className="modal-footer">
        <Button className="bg-gradient-red text-white" onClick={()=> handleSubmit(false)}>
          <Translate contentKey={'workflow.deny'}/>
        </Button>
        <Button className={'bg-gradient-green text-white'} onClick={()=> handleSubmit(true)} >
          <Translate contentKey={'workflow.authorize'}/>
        </Button>
      </div>

    </Modal>

  )
}
