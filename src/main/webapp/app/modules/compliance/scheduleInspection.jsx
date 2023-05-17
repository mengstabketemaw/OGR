import axios from "axios";
import {toast} from "react-toastify";
import {translate, Translate, ValidatedField, ValidatedForm} from "react-jhipster";
import {Button, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import React, {useState} from "react";

export const ScheduleInspection = ({show, handleClose, form, users,scheduleParams}) => {
  const handleSubmit = async (values) => {
    try {
      const res = await axios({
        method: 'post',
        url: '/api/compliance/complianceHistory',
        data: {
          date: values.inspectionDate
          ,inspectorId: values.inspectorId
          ,complianceId: scheduleParams.complianceId
          ,finding: ""
          ,status:"Not Inspected"
          ,report:""
        }

      });
      if (res.status == 201) {
        handleClose();
        toast.success(<Translate contentKey={'compliance.form.scheduleCreated'}/>);
      }
    } catch (err) {
      toast.error(<Translate contentKey={'compliance.form.errorOccured'}/>);
    }
  }

  return (
    <Modal size={""} isOpen={show}>
      <ModalHeader><h2><Translate contentKey={"compliance.scheduleInspection"}/></h2></ModalHeader>
      <ModalBody>
        <ValidatedForm onSubmit={values => handleSubmit(values)}>
          <ValidatedField type="text" disabled={true} value={scheduleParams.licenceName} name="formId" required={true} label={translate('compliance.table.licenceType')}>
          </ValidatedField>
          <ValidatedField type="text" disabled={true} value={scheduleParams.companyName} name="userId" required={true} label={translate('compliance.companyName')}>
          </ValidatedField>
          <ValidatedField type="date" name="inspectionDate" required={true} label={translate('compliance.form.inspectionDate')}>
          </ValidatedField>
          <ValidatedField type="select" name="inspectorId" required={true} label={translate('compliance.inspector')}
          >
            <option value="" key="">
              <Translate contentKey={"compliance.form.selectUser"}/>
            </option>
            {users.map((f, i) => (
              f.authorities.includes('ROLE_ADMIN') && (
                <option value={f.id} key={f.id}>
                  {f.login}
                </option>
              )
            ))}
          </ValidatedField>

          <Button color="primary" type="submit">
            <FontAwesomeIcon icon="save"/>
            &nbsp;
            <Translate contentKey="entity.action.save"/>
          </Button>
        </ValidatedForm>
      </ModalBody>
      <ModalFooter>
        <Button className={"bg-gradient-red"} onClick={handleClose}><Translate
          contentKey={"compliance.close"}/></Button>
      </ModalFooter>
    </Modal>
  );
};
