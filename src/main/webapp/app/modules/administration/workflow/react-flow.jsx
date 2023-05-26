import React, {useCallback, useEffect, useState} from 'react';
import ReactFlow, {addEdge, MarkerType, Panel, useEdgesState, useNodesState, useReactFlow} from "reactflow";
import {Button} from "reactstrap";
import {ValidateEdges} from "app/modules/administration/workflow/validateEdges";
import 'reactflow/dist/style.css';
import {Translate} from "react-jhipster";
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
  }, [setNodes, setViewport]);

  const onAdd = useCallback(() => {
    const newNode = {
      id: getNodeId(),
      data: { label: 'Added node' },
      position: {
        x: 100,
        y: 200,
      },
    };
    setNodes((nds) => nds.concat(newNode));
  }, [setNodes]);
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

          <Button color="primary" type="submit" onClick={onSave}>
            <Translate contentKey="entity.action.save">Save</Translate>
          </Button>{' '}
          <Button color="danger" onClick={onAdd} >
            <Translate contentKey={'workflow.addnode'} />
          </Button>
        </Panel>
      </ReactFlow>
    </div>
  )
}
export default ReactWorkFlow;
