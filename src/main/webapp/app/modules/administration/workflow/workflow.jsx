import React, { useState, useCallback, useEffect ,useMemo } from 'react';
import ReactFlow, {
  ReactFlowProvider,
  useNodesState,
  useEdgesState,
  addEdge,
  useReactFlow,
  Panel,
} from 'reactflow';
import 'reactflow/dist/style.css';
import {Translate, translate, ValidatedField} from "react-jhipster";
import {useAppDispatch,useAppSelector} from "app/config/store";
import { Button, Card, CardHeader, Col, Container, Modal, ModalBody, ModalFooter, ModalHeader, Row, Spinner, Table } from 'reactstrap';
import { toast } from 'react-toastify';
import {getWorkflowByForm,createWorkflow,updateWorkflow,getState} from "app/modules/licence/license.reducer";
import {getFieldType, getFormType} from "app/modules/form/form.reducer";
import {formatReactFlow, formatWorkFlowSequences, formatEdge} from "app/modules/administration/workflow/format-react-flow";
import ReactWorkFlow from "app/modules/administration/workflow/react-flow";
import {useSelector} from "react-redux";


const Workflow = () => {


  const dispatch = useAppDispatch();
  const form = useAppSelector(state => state.form.formTypes);
  const states = useAppSelector(state => state.licence.states);
  const [formForEdit,setEditForm] = useState({});
  const wf = useSelector(state => state.licence.workflow);
  const [workflowForEdit,setWorkflowForEdit] = useState(null);
  const formatedNode = formatReactFlow(states);
  const fromatedEdge = formatEdge(wf?.workFlowSequences)//[{ id: '1', source: '4', target: '1' }]//formatEdge(workflowForEdit?.workFlowSequences) || []
  useEffect(()=>{
    dispatch(getState());
    dispatch(getFormType());
  },[])

  useEffect(() => {
    if(form.length > 0) {
      setEditForm(form[0]);
    }
  }, [form]);

  useEffect(() => {
    if(formForEdit.id != undefined){
      dispatch(getWorkflowByForm(formForEdit.id))
    }
  }, [formForEdit]);
  const handleSelectForm = (e) => {
    setEditForm(form.filter(f=> f.id == e.target.value)[0]);
  }
  const handleSubmit =  (value) =>{
    const valueToSend = {...wf};
    valueToSend.customForm = {...formForEdit}
    valueToSend.workFlowSequences = formatWorkFlowSequences(value,states)
    valueToSend.name = valueToSend.name ? valueToSend.name : formForEdit.title + ' Licence'
    valueToSend.id=0
    dispatch(createWorkflow(valueToSend)).then(
      toast.success("Workflow Saved")
    );
  }

  return (
    <Row className="d-flex justify-content-center">
      <Col md="8">
        <Card className="shadow">
          <Panel position="top-left">
            <ValidatedField type="select" name="langKey"
                            onChange={handleSelectForm}
            > {form.map((f,i) => (
              <option value={f.id} key={f.id}>
                {f.title}
              </option>
            ))}

            </ValidatedField >
          </Panel>
          {formatedNode.length>0 && fromatedEdge &&
          <ReactWorkFlow formatedNode={formatedNode}
                         initialEdges={fromatedEdge}
                         handleSubmit={handleSubmit}
                         /> }
        </Card>
      </Col>
    </Row>
  );
};

export default () => (
  <ReactFlowProvider>
    <Workflow />
  </ReactFlowProvider>
);
