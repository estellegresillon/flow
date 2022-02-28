import React, { useEffect, useRef, useState } from "react";
import ReactFlow, {
  addEdge,
  Background,
  Controls,
  MiniMap,
  ReactFlowProvider,
  removeElements,
} from "react-flow-renderer";
import styled from "styled-components";

import { INITIAL_DATA } from "utils/initialData";
import {
  getAllFlowsFromLocalStorage,
  getDocumentFromLocalStorage,
  removeFlowFromLocalStorage,
  saveDocumentInLocalStorage,
  saveNewFlowInLocalStorage,
} from "utils/localStorage";

import Sidebar from "./Sidebar";

let id = 0;
const getId = () => `dndnode_${id++}`;
const style = { border: "none", boxShadow: "0 1px 4px 1px rgb(0 0 0 / 8%)" };

const Flow = () => {
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [newNodeName, setNewNodeName] = useState("");
  const [options, setOptions] = useState([]);
  const [selectedFlow, setSelectedFlow] = useState("");
  const [elements, setElements] = useState([]);
  const onConnect = (params) => setElements((els) => addEdge(params, els));
  const onElementsRemove = (elementsToRemove) =>
    setElements((els) => removeElements(elementsToRemove, els));

  const onLoad = (_reactFlowInstance) =>
    setReactFlowInstance(_reactFlowInstance);

  const onDragOver = (event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  };

  const onDrop = (event) => {
    event.preventDefault();

    const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
    const type = event.dataTransfer.getData("application/reactflow");
    const position = reactFlowInstance.project({
      x: event.clientX - reactFlowBounds.left,
      y: event.clientY - reactFlowBounds.top,
    });
    const newNode = {
      data: { label: newNodeName },
      id: getId(),
      position,
      type,
      style,
    };

    setElements((es) => es.concat(newNode));
  };

  const onClean = () => {
    setElements([]);
  };

  const onInputChange = (e) => {
    setNewNodeName(e.target.value);
  };

  const onRemoveFlow = (flow) => {
    setElements([]);
    const filteredOptions = options.filter((opt) => opt !== flow);
    setOptions(filteredOptions);
    removeFlowFromLocalStorage(flow);
  };

  const onSelectChange = (e) => {
    const selectedFlow = e.target.value;
    setSelectedFlow(selectedFlow);
    setElements(getDocumentFromLocalStorage(selectedFlow));
  };

  useEffect(() => {
    const flows = getAllFlowsFromLocalStorage() || [];

    if (flows.length > 0) {
      setSelectedFlow(flows[0]);
      setElements(getDocumentFromLocalStorage(flows[0]));
      setOptions(flows);
      return;
    }

    setSelectedFlow("default");
    saveNewFlowInLocalStorage("default");
    saveDocumentInLocalStorage("default", INITIAL_DATA);
    setElements(INITIAL_DATA);
    setOptions(["default"]);
  }, []);

  return (
    <FlowWrapper>
      <ReactFlowProvider>
        <Sidebar
          elements={elements}
          newNodeName={newNodeName}
          onClean={onClean}
          onInputChange={onInputChange}
          onRemoveFlow={onRemoveFlow}
          onSelectChange={onSelectChange}
          options={options}
          selectedFlow={selectedFlow}
          setElements={setElements}
          setOptions={setOptions}
          setSelectedFlow={setSelectedFlow}
        />
        <div className="reactflow-wrapper" ref={reactFlowWrapper}>
          <ReactFlow
            elements={elements}
            onConnect={onConnect}
            onElementsRemove={onElementsRemove}
            onLoad={onLoad}
            onDrop={onDrop}
            onDragOver={onDragOver}
            snapToGrid={true}
            snapGrid={[15, 15]}
          >
            <MiniMap
              nodeStrokeColor={(n) => {
                if (n.style?.background) return n.style.background;
                if (n.type === "input") return "#0041d0";
                if (n.type === "output") return "#ff0072";
                if (n.type === "default") return "#1a192b";

                return "#eee";
              }}
              nodeColor={(n) => {
                if (n.style?.background) return n.style.background;

                return "#fff";
              }}
              nodeBorderRadius={2}
            />
            <Controls />
            <Background color="#aaa" gap={16} />
          </ReactFlow>
        </div>
      </ReactFlowProvider>
    </FlowWrapper>
  );
};

export default Flow;

const FlowWrapper = styled.div`
  align-items: center;
  display: flex;
  height: 100vh;
  position: relative;
  width: 100%;

  .reactflow-wrapper {
    height: 100%;
    width: calc(100% - 200px);
  }
`;
