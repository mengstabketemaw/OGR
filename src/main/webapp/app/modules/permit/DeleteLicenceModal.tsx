import React from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Translate } from 'react-jhipster';
import { Button, Modal } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons/faTrash';
import { useNavigate } from 'react-router-dom';

const DeleteLicenceModal = ({ id, show, handleClose, name, updateTable }) => {
  const nav = useNavigate();
  const handleSubmit = () => {
    axios
      .delete(`/api/licence/${id}`)
      .then(() => {
        toast.success(<Translate contentKey={'licence.deleted'} interpolate={{ name }} />);
        handleClose();
        updateTable();
      })
      .catch(e => {
        toast.error(e.message);
      });
  };

  return (
    <Modal className="modal-dialog-centered modal-danger" contentClassName="bg-gradient-danger" isOpen={show} size={'sm'}>
      <div className="modal-header">
        <h6 className="modal-title" id="modal-title-notification">
          <Translate contentKey={'compliance.attentionRequired'} />
        </h6>
        <button aria-label="Close" className="close" data-dismiss="modal" type="button" onClick={handleClose}>
          <span aria-hidden={true}>×</span>
        </button>
      </div>
      <div className="modal-body">
        <div className="py-3 text-center">
          <i className="ni ni-bell-55 ni-3x" />
          <FontAwesomeIcon icon={faTrash} />
          <h4 className="heading mt-4">
            <Translate contentKey={'compliance.readThis'} />
          </h4>
          <p>
            <Translate contentKey={'licence.delete'} interpolate={{ name }} />
          </p>
        </div>
      </div>
      <div className="modal-footer">
        <Button className="btn-white" color="default" type="button" onClick={handleClose}>
          <Translate contentKey={'compliance.noClose'} />
        </Button>
        <Button className="text-white ml-auto" color="link" data-dismiss="modal" type="button" onClick={handleSubmit}>
          <Translate contentKey={'compliance.yesDelete'} />
        </Button>
      </div>
    </Modal>
  );
};

export default DeleteLicenceModal;
