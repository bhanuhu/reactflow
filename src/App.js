import { useState, useCallback, useEffect } from "react";
import ReactFlow, {
  Controls,
  Background,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
  getIncomers,
  getOutgoers,
  getConnectedEdges,
} from "reactflow";

import { FaTrashAlt, FaEdit } from "react-icons/fa";

import "reactflow/dist/style.css";

function Flow() {

  const initialNodes = [
    {
      id:"1",
      data: {
        label: (
          <div className="node-label">
            <span>Hello</span>
            
          </div>
        ),
      },
      position: { x: 0, y: 0 },
      type: "input",
      className : "hover_node",
    },
    {
      id:"2",
      data: {
        label: (
          <div className="node-label">
            <span>World</span>
            
          </div>
        ),
      },
      position: { x: 100, y: 100 },
      className : "hover_node",
    },
  ];
  
  const initialEdges = [{id: 'e1-2', source: '1', target: '2', className:"hover_edge" }];

  const [nodes, setNodes] = useState(initialNodes);
  const [curnodes, setCurNodes] = useState(initialNodes);
  const [nodeName, setNodeName] = useState('Node 1');
  const [nodeBg, setNodeBg] = useState('#eee');
  const [nodeHidden, setNodeHidden] = useState(false);
  
  const [edges, setEdges] = useState(initialEdges);
  const [height, setHeight] = useState(200);
  const [width, setWidth] = useState(200);
  const [current, setCurrent] = useState(-1);

  const onNodesChange = useCallback((changes) => setNodes((nds) => applyNodeChanges(changes, nds)), []);
  const onEdgesChange = useCallback((changes) => setEdges((eds) => applyEdgeChanges(changes, eds)), []);


  const addNodes = () => {
    const id = Math.random().toString()
    setNodes((nds) => [
      ...nds,
      {
        id:id,
        data: {
          label: (
            <div className="node-label">
              <span>Hello</span>
            </div>
          ),
        },
        position: { x: height, y: width },
        className : "hover_node",
      },
    ]);
    setHeight(height + 100);
    setWidth(width + 100);
  };

  const onEdit = (event, node) => {
    // Handle edit action
    console.log("Edit node:", node);
  };

  useEffect(() => {
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === '1') {
          // it's important that you create a new object here
          // in order to notify react flow about the change
          node.data = {
            ...node.data,
            label: nodeName,
          };
        }

        return node;
      })
    );
  }, [nodeName, setNodes]);

  useEffect(() => {
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === '1') {
          // it's important that you create a new object here
          // in order to notify react flow about the change
          node.style = { ...node.style, backgroundColor: nodeBg };
        }

        return node;
      })
    );
  }, [nodeBg, setNodes]);

  useEffect(() => {
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === '1') {
          // when you update a simple type you can just update the value
          node.hidden = nodeHidden;
        }

        return node;
      })
    );
    setEdges((eds) =>
      eds.map((edge) => {
        if (edge.id === 'e1-2') {
          edge.hidden = nodeHidden;
        }

        return edge;
      })
    );
  }, [nodeHidden, setNodes, setEdges]);


  
  useEffect(() => {
    setNodes(nodes);
  }, [nodes, edges]);
  
  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    []
    );
    

const onNodesDelete = useCallback(
  (deleted) => {
    console.log("deleted: ", deleted);
    setEdges(
      deleted.reduce((acc, node) => {
        const incomers = getIncomers(node, nodes, edges);
        const outgoers = getOutgoers(node, nodes, edges);
        const connectedEdges = getConnectedEdges([node], edges);

        const remainingEdges = acc.filter((edge) => !connectedEdges.includes(edge));

        const createdEdges = incomers.flatMap(({ id: source }) =>
          outgoers.map(({ id: target }) => ({ id: `${source}->${target}`, source, target }))
        );

        return [...remainingEdges, ...createdEdges];
      }, edges)
    );
  },
  [nodes, edges]
);




const clickHandle=(e)=>{
    console.log(e._targetInst.return.index);
    setCurrent(e._targetInst.return.index);
    setCurNodes(nodes)
  }

  return (
    <div style={{ height: "100%" }}>
      <button onClick={addNodes} style={{margin:"2rem", padding:"0.5rem", borderRadius:"5px" ,backgroundColor:"#4a86e8", color:"white"}}>Create Node</button>
      <ReactFlow
        nodes={nodes}
        onNodesDelete = {onNodesDelete}
        onNodeMouseEnter={clickHandle}
        onNodesChange={onNodesChange}
        edges={edges}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
      >
        <Background />
        <Controls />

        <div className="updatenode__controls">
        <label>label:</label>
        <input value={nodeName} onChange={(evt) => setNodeName(evt.target.value)} />
    
      </div>

      </ReactFlow>
    </div>
  );
}

export default Flow;


