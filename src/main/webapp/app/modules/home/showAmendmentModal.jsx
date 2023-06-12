import React, {useState} from 'react';
import {Button, Modal} from "reactstrap";
import {Translate, ValidatedField} from "react-jhipster";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCloud, faWarning} from '@fortawesome/free-solid-svg-icons';
import {updateAmendment, updateStatusAndState} from "app/modules/administration/workflow/workflow.reducer";
import {useAppDispatch} from "app/config/store";
import {useNavigate} from "react-router-dom";
export const ShowAmendmentModal = (props) => {

  const { handleClose, showModal, content, id } = props;
  const dispatch = useAppDispatch();
  const nav = useNavigate()
  const handl = () =>{
    const param = {
      id : id,
      data : {
        stateId : 0,
        status:'Inprogress'
      }
    }
    const params = {
      id : id,
      data : {
        amendment : ''
      }
    }
    dispatch(updateAmendment(params))
    dispatch(updateStatusAndState(param)).then(()=>{
      nav(0)
      handleClose()
    })

  }

  return(
    <Modal isOpen={showModal} toggle={handleClose}  size={"md"}   className="modal-dialog-centered text-dark"
           contentClassName="text-dark">

      <div className="modal-header">
        <h3 className="modal-title" id="modal-title-denyIssue">
          <Translate contentKey={'home.amendment'}/>
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
      <div className="modal-footer">
        <Button className={'bg-translucent-dark text-black'} onClick={handleClose
        } ><Translate contentKey={'home.ignore'}/>

        </Button>
        <Button className={'bg-translucent-success text-success'} onClick={handl
        } >

          <Translate contentKey={'home.acceptAmendment'}/>
        </Button>
      </div>

    </Modal>

  )
}
