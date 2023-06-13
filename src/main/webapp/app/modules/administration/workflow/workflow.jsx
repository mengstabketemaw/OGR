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
import {
  Accordion, AccordionBody, AccordionHeader, AccordionItem,
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader, Nav, NavItem, NavLink,
  Row,
  Spinner,
  Table
} from 'reactstrap';
import { toast } from 'react-toastify';
import {getWorkflowByForm,createWorkflow,updateWorkflow,getState} from "app/modules/licence/license.reducer";
import {getFieldType, getFormType} from "app/modules/form/form.reducer";
import {formatReactFlow, formatWorkFlowSequences, formatEdge} from "app/modules/administration/workflow/format-react-flow";
import ReactWorkFlow from "app/modules/administration/workflow/react-flow";
import {useSelector} from "react-redux";
import reactFlowGif from "../../../../content/images/reactFlow2.gif"


const Workflow = () => {


  const dispatch = useAppDispatch();
  const form = useAppSelector(state => state.form.formTypes);
  const states = useAppSelector(state => state.licence.states);
  const [formForEdit,setEditForm] = useState({});
  const wf = useSelector(state => state.licence.workflow);
  const sequence = useSelector(state => state.licence.currentSequence);
  const [formatedNode,setformatedNode] = useState(null);
  const [open, setOpen] = useState('');
  const [currentForm,setCurrentForm] = useState(0)
  //const formatedNode = formatReactFlow(states,sequence);
  const fromatedEdge = formatEdge(wf?.workFlowSequences)//[{ id: '1', source: '4', target: '1' }]//formatEdge(workflowForEdit?.workFlowSequences) || []
  useEffect(()=>{
    dispatch(getState());
    dispatch(getFormType());
  },[])

  useEffect(() => {
    setformatedNode(formatReactFlow(states,sequence))
  }, [sequence]);


  useEffect(() => {
    if(form.length > 0) {
      setEditForm(form[0]);
      setCurrentForm(form[0]?.id)
    }
  }, [form]);

  useEffect(() => {
    if(formForEdit.id != undefined){
      dispatch(getWorkflowByForm(formForEdit.id))
    }
  }, [formForEdit]);
  const handleSelectForm = (e) => {

    setEditForm(form.filter(f=> f.id == e)[0]);
    setCurrentForm(e)
  }
  const handleSubmit =  (value) =>{
    if(value.length > 0){
    const valueToSend = {...wf};
    valueToSend.customForm = {...formForEdit}
    valueToSend.workFlowSequences = formatWorkFlowSequences(value,states)
    valueToSend.name = valueToSend.name ? valueToSend.name : formForEdit.title + ' Licence'
    valueToSend.id=0
    dispatch(createWorkflow(valueToSend)).then(
      toast.success(<Translate contentKey={'workflow.saved'}/>)
    );
    }else{
      toast.error(<Translate contentKey={'workflow.notSaved'}/>)
    }
  }

  return (
    <Row className=" p-3 h-100">
      <Col xl="8">
        <Card className="shadow">
          <Panel position="top-right">
            <Nav vertical style={{marginBottom: '30px',cursor: 'pointer'}}
                 className="nav nav-pills  flex-column flex-sm-column justify-content-end ">
              {form.map((f,i) => (
                <NavItem  className="w-100 pr-0  pt-0" onClick={()=>{handleSelectForm(f.id)}}>
                  <NavLink className={currentForm===f.id ? "mb-2 mt-2 mt-lg-3 w-100 mr-2 mr-sm-0 mb-md-0 bg-light text-dark card-hover2 ":"mb-sm-2 mr-2 w-100 mr-sm-0 mt-2 mt-lg-3 mb-md-0 text-dark card-hover2"}  >
                    <Translate contentKey={"licence."+f.title}></Translate>
                  </NavLink>
                </NavItem>
              ))}

            </Nav>

          </Panel>
          {formatedNode && formatedNode.length>0 && fromatedEdge &&
          <ReactWorkFlow formatedNode={formatedNode}
                         initialEdges={fromatedEdge}
                         handleSubmit={handleSubmit}
                         /> }
        </Card>
      </Col>
      <Col xl={"4"}>
        <Card className="shadow mt-xl-0 mt-4">
          <CardHeader>
            <h2 className="text-uppercase text-success" ><Translate contentKey={'workflow.faq.tip'}/></h2>
          </CardHeader>
          <CardBody>
            <img src={reactFlowGif} style={{width:"80%", height:"50%" }} />
          </CardBody>
        </Card>

        <Card className="shadow mt-4">
        <CardBody>
          <h2 className={"text-uppercase text-success"}><Translate  contentKey={"information.titles.faq"}/></h2>
          <Accordion className={"text-justify"} open={open}>
            <AccordionItem onClick={() => {
              open == '1' ? setOpen('') : setOpen("1")
            }}>
              <AccordionHeader targetId="1">
              <Translate contentKey={"workflow.faq.1q"}/>
              </AccordionHeader>
              <AccordionBody accordionId="1">
                <Translate contentKey={"workflow.faq.1a"}/>

              </AccordionBody>
            </AccordionItem>
            <AccordionItem onClick={() => {
              open == '2' ? setOpen('') : setOpen("2")
            }}>
              <AccordionHeader targetId="2">
                <Translate contentKey={"workflow.faq.2q"}/>
              </AccordionHeader>
              <AccordionBody accordionId="2">
                <Translate contentKey={"workflow.faq.2a"}/>
              </AccordionBody>
            </AccordionItem>
            <AccordionItem onClick={() => {
              open == '3' ? setOpen('') : setOpen("3")
            }}>
              <AccordionHeader targetId="3">
                <Translate contentKey={"workflow.faq.3q"}/>
              </AccordionHeader>
              <AccordionBody accordionId="3">
                <Translate contentKey={"workflow.faq.3a"}/>

              </AccordionBody>
            </AccordionItem>
            <AccordionItem onClick={() => {
              open == '4' ? setOpen('') : setOpen("4")
            }}>
              <AccordionHeader targetId="4">
                <Translate contentKey={"workflow.faq.4q"}/>
              </AccordionHeader>
              <AccordionBody accordionId="4">
                <Translate contentKey={"workflow.faq.4a"}/>

              </AccordionBody>
            </AccordionItem>
            <AccordionItem onClick={() => {
              open == '5' ? setOpen('') : setOpen("5")
            }}>
              <AccordionHeader targetId="5">
                <Translate contentKey={"workflow.faq.5q"}/>
              </AccordionHeader>
              <AccordionBody accordionId="5">
                <Translate contentKey={"workflow.faq.5a"}/>

              </AccordionBody>
            </AccordionItem>
          </Accordion>
        </CardBody>
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
