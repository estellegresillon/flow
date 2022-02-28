import { useState } from "react";
import styled from "styled-components";

import IconPlus from "components/common/IconPlus";
import Input from "components/common/Input";
import Select from "components/common/Select";
import SmallModal from "components/SmallModal";
import {
  saveDocumentInLocalStorage,
  saveNewFlowInLocalStorage,
} from "utils/localStorage";

const Sidebar = ({
  elements,
  newNodeName,
  onClean,
  onInputChange,
  onRemoveFlow,
  onSelectChange,
  options,
  selectedFlow,
  setOptions,
  setSelectedFlow,
  setElements,
}) => {
  const [isCreateFlowOpen, setIsCreateFlowOpen] = useState(false);
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  const handleSaveDocument = () => {
    saveDocumentInLocalStorage(selectedFlow, elements);
  };

  const onCreateFlow = (flowName) => {
    const newOptions = [...options, flowName];
    setOptions(newOptions);
    saveNewFlowInLocalStorage(flowName);
    setSelectedFlow(flowName);
    setElements([]);
  };

  return (
    <SideBarWrapper>
      <div className="flow-selector">
        <Select
          name="flow-selector"
          onChange={onSelectChange}
          options={options.length > 0 ? options : []}
          placeholder="Select a saved flow"
          value={selectedFlow}
        />
        <div className="actions">
          <div className="action save" onClick={handleSaveDocument}>
            Save
          </div>
          <div
            className="action remove"
            onClick={() => onRemoveFlow(selectedFlow)}
          >
            Remove flow
          </div>
        </div>
      </div>
      <div className="nodes">
        <div className="description">
          You can drag these nodes to the workspace and connect them by clicking
          on the circular handles.
        </div>
        <Input
          name="node-name"
          onChange={onInputChange}
          placeholder="New node name"
          value={newNodeName}
        />
        <div
          className="dndnode input"
          onDragStart={(event) => onDragStart(event, "input")}
          draggable
        >
          Input Node
        </div>
        <div
          className="dndnode"
          onDragStart={(event) => onDragStart(event, "default")}
          draggable
        >
          Default Node
        </div>
        <div
          className="dndnode output"
          onDragStart={(event) => onDragStart(event, "output")}
          draggable
        >
          Output Node
        </div>
      </div>
      <div className="actions">
        <div className="action new" onClick={() => setIsCreateFlowOpen(true)}>
          <IconPlus /> New
        </div>
        {isCreateFlowOpen && (
          <SmallModal
            hasButton
            name="flow"
            onValidate={onCreateFlow}
            onClose={() => setIsCreateFlowOpen(false)}
          />
        )}
        <div className="action clean" onClick={onClean}>
          Clean workspace
        </div>
        {/* <div className="import-export-wrapper">
          <span className="action import">Import</span> /{" "}
          <span className="action export">Export</span> file
        </div> */}
      </div>
    </SideBarWrapper>
  );
};

export default Sidebar;

const SideBarWrapper = styled.div`
  box-shadow: 0 1px 30px 0 rgb(69 129 192 / 20%);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  height: calc(100% - 60px);
  padding: 30px;
  width: 170px;

  .nodes {
    input {
      margin-bottom: 10px;
    }
  }

  .description {
    font-size: 12px;
    margin-bottom: 20px;
  }

  .actions {
    font-size: 14px;
    font-weight: bolder;

    .new {
      display: flex;

      svg {
        width: 16px;
        height: 16px;
        margin-right: 5px;
      }
    }

    .action {
      cursor: pointer;
      margin-bottom: 20px;
      white-space: nowrap;

      &:hover {
        color: #0041d0;
      }
    }
  }

  .flow-selector {
    select {
      margin-bottom: 20px;
    }
  }

  .dndnode {
    background: white;
    border-color: black;
    border-radius: 3px;
    border-style: solid;
    border-width: 1px;
    color: #222;
    cursor: grab;
    font-size: 12px;
    margin-bottom: 10px;
    padding: 10px;
    text-align: center;
    width: 150px;

    &:hover {
      box-shadow: 0 1px 4px 1px rgb(0 0 0 / 8%);
    }

    &.input {
      border-color: #0041d0;
    }

    &.output {
      border-color: #ff0072;
    }
  }
`;
