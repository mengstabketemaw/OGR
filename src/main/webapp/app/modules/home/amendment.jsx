import React, {useState} from 'react';
import {Button, Modal} from "reactstrap";
import {Translate, ValidatedField} from "react-jhipster";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCloud, faWarning} from '@fortawesome/free-solid-svg-icons';
import { updateAmendment} from "app/modules/administration/workflow/workflow.reducer";
import {useAppDispatch} from "app/config/store";
import {toast} from "react-toastify";
export const Amendment = (props) => {

  const { handleClose, showModal,id } = props;
  const [remark,setRemark] = useState('')
  const dispatch = useAppDispatch()
  const handleSubmit = (remark) =>{
    const param = {
      id : id,
      data : {
        amendment : remark
      }
    }
    dispatch(updateAmendment(param)).then(()=>{
      toast.success("Amendment saved")
      handleClose()
    })

  }



  return(
    <Modal isOpen={showModal} toggle={handleClose}  size={"sm"}   className="modal-dialog-centered modal-white"
           contentClassName="bg-gradient-white">

     <div className="modal-header">
        <h3 className="modal-title text-dark" id="modal-title-denyIssue">
          <Translate contentKey={'home.amendment'}/>
        </h3>
        <button
          aria-label="Close"
          className="close"
          data-dismiss="modal"
          type="button"
          onClick={handleClose}
        >
          <span className="text-dark" aria-hidden={true}>×</span>
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
        <div className="justify-content-center text-black">
          <ValidatedField

            type="textarea"
            onChange={(e)=>setRemark(e.target.value)}

          />
        </div>
      </div>
      <div className="modal-footer">
        <Button className={'bg-translucent-dark text-black'} onClick={handleClose
        } ><Translate contentKey={'entity.action.cancel'}/>

        </Button>
        <Button className={'bg-translucent-success text-success'} onClick={()=> {handleSubmit(remark)
        }} >

          <Translate contentKey={'home.sendAmendment'}/>
        </Button>
      </div>

    </Modal>

  )
}
