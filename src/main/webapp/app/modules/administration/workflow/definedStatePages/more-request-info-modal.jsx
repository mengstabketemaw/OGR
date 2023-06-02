import React, {useState} from 'react';
import {Button, Modal} from "reactstrap";
import {Translate, ValidatedField} from "react-jhipster";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCloud, faWarning} from '@fortawesome/free-solid-svg-icons';
export const MoreRequestInfoModal = (props) => {

  const { handleClose, showModal, handleSubmit } = props;
  const [remark,setRemark] = useState('')

  return(
    <Modal isOpen={showModal} toggle={handleClose}  size={"sm"}   className="modal-dialog-centered modal-"
           contentClassName="">

     <div className="modal-header">
        <h3 className="modal-title" id="modal-title-denyIssue">
          <Translate contentKey={'workflow.moreReq'}/>
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
        {/* <div className="py-3 text-center"> */}
        {/*   <i className="ni ni-bell-55 ni-3x" /> */}
        {/*   <FontAwesomeIcon icon={faWarning} size={"2x"}/> */}
        {/*   <h4 className="heading mt-4"><Translate contentKey={'compliance.readThis'}/></h4> */}
        {/*   <p> */}
        {/*     <Translate contentKey={"workflow.infoPermit"}/> */}
        {/*   </p> */}
        {/* </div> */}
        <div className="justify-content-center">
          <ValidatedField

            type="textarea"
            onChange={(e)=>setRemark(e.target.value)}

          />
        </div>
      </div>
      <div className="modal-footer">
        <Button className={'bg-gradient-warning text-white'} onClick={()=> {handleSubmit(remark)
        }} >
          <FontAwesomeIcon icon="arrow-left" />
          <Translate contentKey={'workflow.backToUser'}/>
        </Button>
      </div>

    </Modal>

  )
}
