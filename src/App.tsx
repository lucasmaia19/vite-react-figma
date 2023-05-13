import "reactflow/dist/style.css";
import ReactFlow, {
  addEdge,
  Background,
  Connection,
  ConnectionMode,
  Controls,
  useEdgesState,
  useNodesState,
} from "reactflow";
import Square from "./components/nodes/Square";
import { useCallback } from "react";
import DefaultEdge from "./components/edges/DefaultEdge";
import * as ToolBar from "@radix-ui/react-toolbar";
import { Toolbar } from "@radix-ui/react-toolbar";

const NODE_TYPES = {
  square: Square,
};

const INITIAL_NODES = [
  {
    id: crypto.randomUUID(),
    type: "square",
    position: {
      x: 200,
      y: 400,
    },
    data: {},
  },
  {
    id: crypto.randomUUID(),
    type: "square",
    position: {
      x: 1000,
      y: 400,
    },
    data: {},
  },
] satisfies Node[];

const EDGE_TYPES = {
  default: DefaultEdge,
};

function App() {
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [nodes, setNodes, onNodesChange] = useNodesState(INITIAL_NODES);

  const onConnect = useCallback((connection: Connection) => {
    return setEdges((edges) => addEdge(connection, edges));
  }, []);

  function addSquareNode() {
    setNodes(nodes => [
      ...nodes,
      {
        id: crypto.randomUUID(),
        type: "square",
        position: {
          x: 750,
          y: 350,
        },
        data: {},
      },
    ])
  }

  return (
    <div className="w-screen h-screen">
      <ReactFlow
        edgeTypes={EDGE_TYPES}
        nodeTypes={NODE_TYPES}
        nodes={nodes}
        edges={edges}
        onEdgesChange={onEdgesChange}
        onNodesChange={onNodesChange}
        onConnect={onConnect}
        connectionMode={ConnectionMode.Loose}
        defaultEdgeOptions={{ type: "default" }}
      >
        <Background gap={12} size={2} color="#DDD"></Background>
        <Controls />
      </ReactFlow>

      {/* <Toolbar.Root className="fixed bottom-20 left-1/2 -translate-x-1/2 bg-write rounded-2xl shadow-lg border border-zinc-300 px-8 h-20 w-96 overflow-hidden">
        <Toolbar.Button></Toolbar.Button>
      </Toolbar.Root> */}
      
      <Toolbar className="fixed bottom-20 left-1/2 -translate-x-1/2 bg-write rounded-2xl shadow-lg border border-zinc-300 px-8 h-20 w-96 overflow-hidden">
        <Toolbar onClick={addSquareNode} className="w-32 h-32 bg-violet-500 mt-6 roudend transtion-transform hover:-translate-y-2"/>
      </Toolbar>

    </div>
  );
}

export default App;
