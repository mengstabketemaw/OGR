import React, {useCallback, useEffect, useState} from 'react';
import ReactFlow, {addEdge, MarkerType, Panel, useEdgesState, useNodesState, useReactFlow} from "reactflow";
import {Button, Modal} from "reactstrap";
import {ValidateEdges} from "app/modules/administration/workflow/validateEdges";
import 'reactflow/dist/style.css';
import {Translate, ValidatedField} from "react-jhipster";
const ReactWorkFlow = (param) =>{
  const markEnd = {markerEnd: {
      type: MarkerType.ArrowClosed,
      width: 20,
      height: 20,
      color: '#FF0072',
    }}
  const getNodeId = () => `randomnode_${+new Date()}`;
  const flowKey = 'work-flow';
  const {formatedNode, initialEdges, handleSubmit} = param;
  const [rfInstance, setRfInstance] = useState(null);
  const { setViewport } = useReactFlow();
  const [nodes, setNodes, onNodesChange] = useNodesState(formatedNode);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const onConnect = useCallback((params) => setEdges((eds) => addEdge({...params,...markEnd}, eds)), [setEdges]);
  const [showModal,setShowModal] = useState(false);
  const [nodeName,setNodeName] = useState("Added node")
  const onSave = ()=>{

    if (rfInstance) {
      const flow = rfInstance.toObject();
      const edgeToSend = ValidateEdges(flow.edges);
      handleSubmit(edgeToSend || [])
        //localStorage.setItem(flowKey, JSON.stringify(flow));
    }
  }
  const connectionLineStyle = { stroke: '#fdf' };
  useEffect(()=>{
    setEdges(initialEdges || []);
  },[initialEdges])
  const onRestore = useCallback(() => {
    const restoreFlow = async () => {
      const flow = JSON.parse(localStorage.getItem(flowKey));

      if (flow) {
        const { x = 0, y = 0, zoom = 1 } = flow.viewport;
        setNodes(flow.nodes || []);
        setEdges(flow.edges || []);
        setViewport({ x, y, zoom });
      }
    };

    restoreFlow();
  }, [setNodes, setViewport, setEdges]);

  const onAdd = useCallback(() => {
    const newNode = {
      id: getNodeId(),
      data: { label: nodeName },
      position: {
        x: 100,
        y: 200,
      },
    };
    setNodes((nds) => nds.concat(newNode));
    setShowModal(false)
  }, [setNodes,nodeName]);
  return(
    <div style={{ height: 500 }}>
       <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onInit={setRfInstance}
        connectionLineStyle={connectionLineStyle}
        fitView
        snapToGrid={true}
      >
        <Panel position="bottom-left">

          <Button
            // color="primary"
            className="bg-translucent-primary text-primary"

                  type="submit" onClick={onSave}>
            <Translate contentKey="entity.action.save">Save</Translate>
          </Button>{' '}
          <Button color="danger"
                  className="bg-translucent-danger text-danger"
                  onClick={()=>{setShowModal(true)}} >
            <Translate contentKey={'workflow.addnode'} />
          </Button>
        </Panel>
      </ReactFlow>
      <Modal isOpen={showModal}  toggle={()=>{setShowModal(false)}} size={"sm"}   className="modal-dialog-centered modal-info"
             contentClassName="bg-white">

        <div className="modal-header">
          <h3 className="modal-title  text-dark" id="modal-title-denyIssue">
            <Translate contentKey={'workflow.nodeName'}/>
          </h3>
          <button
            aria-label="Close"
            className="close"
            data-dismiss="modal"
            type="button"
            onClick={()=>{setShowModal(false)}}
          >
            <span aria-hidden={true} className="text-black-50">×</span>
          </button>
        </div>
        <div className="modal-body">
          <div className="py-3 text-center text-black-50">
            <ValidatedField
              key = "node"
              name = "node"
              type="input"
              onChange={(e)=>setNodeName(e.target.value)}

            />
          </div>
        </div>
        <div className="modal-footer">

          <Button className={'bg-translucent-success text-success'} onClick={onAdd} >
            <Translate contentKey={'workflow.create'}/>
          </Button>
        </div>

      </Modal>
    </div>
  )
}
export default ReactWorkFlow;
