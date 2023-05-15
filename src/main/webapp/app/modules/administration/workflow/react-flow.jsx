import React, {useCallback, useEffect, useState} from 'react';
import ReactFlow,{addEdge, Panel, useEdgesState, useNodesState, useReactFlow} from "reactflow";
import {Button} from "reactstrap";

const ReactWorkFlow = (param) =>{
  const getNodeId = () => `randomnode_${+new Date()}`;
  const flowKey = 'work-flow';
  const {formatedNode, initialEdges, handleSubmit} = param;
  const [rfInstance, setRfInstance] = useState(null);
  const { setViewport } = useReactFlow();
  const [nodes, setNodes, onNodesChange] = useNodesState(formatedNode);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), [setEdges]);
  const onSave = ()=>{
    if (rfInstance) {
      const flow = rfInstance.toObject();
      handleSubmit(flow.edges || [])
        //localStorage.setItem(flowKey, JSON.stringify(flow));
    }
  }
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
        x: Math.random() * window.innerWidth - 100,
        y: Math.random() * window.innerHeight,
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
      >
        <Panel position="top-right">
          <Button color="secondary" onClick={onRestore} tabIndex={1}>
            restore
          </Button>{' '}
          <Button color="primary" type="submit" onClick={onSave}>
            save
          </Button>{' '}
          <Button color="danger" onClick={onAdd} disabled={true}>
            add node
          </Button>
        </Panel>
      </ReactFlow>
    </div>
  )
}
export default ReactWorkFlow;
