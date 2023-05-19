import axios from "axios";
import {toast} from "react-toastify";
import {translate, Translate, ValidatedField, ValidatedForm} from "react-jhipster";
import {Button, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import React, {useState} from "react";

export const MakeInspection = ({show,refreshTable, handleClose, users,scheduleParams}) => {

  const handleSubmit = async (values) => {
    try {
      const res = await axios({
        method: 'put',
        url: `/api/compliance/complianceHistory/${scheduleParams.inspectionId}`,
        data: {
          date: values.inspectionDate
          ,inspectorId: values.inspectorId
          ,complianceId: scheduleParams.complianceId
          ,finding: values.finding
          ,status: values.status
          ,report:values.report
        }

      });
      if (res.status == 201) {
        toast.success(<Translate contentKey={'compliance.form.inspectionSaved'}/>);
        setTimeout(() => {
          handleClose();
          window.location.reload();
        }, 1000);

      }
    } catch (err) {
      toast.error(<Translate contentKey={'compliance.form.errorOccured'}/>);
    }
  }

  return (
    <Modal size={""} isOpen={show}>
      <ModalHeader><h2><Translate contentKey={"compliance.inspect"}/></h2></ModalHeader>
      <ModalBody>
        <ValidatedForm onSubmit={values => handleSubmit(values)}>
          <ValidatedField type="text" disabled={true} value={scheduleParams.licenceName} name="formId" required={true} label={translate('compliance.table.licenceType')}>
          </ValidatedField>
          <ValidatedField type="text" disabled={true} value={scheduleParams.companyName} name="userId" required={true} label={translate('compliance.companyName')}>
          </ValidatedField>
          <ValidatedField type="date" name="inspectionDate" defaultValue={scheduleParams.inspectionDate} required={true} label={translate('compliance.form.inspectionDate')}>
          </ValidatedField>
          <ValidatedField type="select" name="inspectorId" required={true} defaultValue={scheduleParams.inspectorId} label={translate('compliance.inspector')}
          >
            <option value="" key="">
              <Translate contentKey={"compliance.form.selectInspector"}/>
            </option>
            {users.map((f, i) => (
              f.authorities.includes('ROLE_ADMIN') && (
                <option value={f.id} key={f.id}>
                  {f.login}
                </option>
              )
            ))}
          </ValidatedField>
          <ValidatedField type="text" name="finding"  defaultValue={scheduleParams.finding} label={translate('compliance.table.findings')}>
          </ValidatedField>
          <ValidatedField type="select" name="status" required={true} defaultValue={scheduleParams.status}  label={translate('compliance.table.status')}>
            <option value="" key="">
              <Translate contentKey={"compliance.form.selectStatus"}/>
            </option>
            <option value="Not Inspected" key="Not Inspected">
              Not Inspected
            </option>
            <option value="Compliant" key="Compliant">
              Compliant
            </option>
            <option value="Non-Compliant" key="Non-Compliant">
            Non-Compliant
          </option>

          </ValidatedField>
          <ValidatedField type="textarea" name="report"  defaultValue={scheduleParams.report} label={translate('compliance.report')}>
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
