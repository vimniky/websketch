import React from "react";
import { rootNodesState, activeNodeState } from "./atoms";
import { useRecoilValue, useRecoilState } from "recoil";
import { useReplaceNode } from "./useNodeActions";
import {
  FolderOpenOutlined,
  CaretRightOutlined,
  CaretDownOutlined,
  FolderOutlined,
} from "@ant-design/icons";
import EditableText from "./Components/EditableText";

const getNodeStyle = (isActive) => {
  return {
    display: "flex",
    alignItems: "center",
    height: 28,
    cursor: "pointer",
    background: isActive ? "#1890ff" : "transparent",
    color: isActive ? "#FFF" : "#333",
    padding: "0 8px",
    borderRadius: 4,
  };
};

const iconStyle = {
  marginRight: 6,
  transform: "scale(1.3)",
};

const TreeNode = ({ rootNode, node }) => {
  const { id, children, name, displayName, $$layerState } = node;
  const [activeNode, setActiveNode] = useRecoilState(activeNodeState);
  const replaceNode = useReplaceNode();
  const activeNodeId = activeNode && activeNode.id;
  const title = displayName || name;
  const isActive = activeNodeId === id;

  const { collapsed } = $$layerState || {};

  const onClick = (e) => {
    e.stopPropagation();
    e.preventDefault();
    if (!isActive) setActiveNode(node);
  };

  const editableText = (
    <EditableText
      text={title}
      style={{ flexGrow: 1, flexShrink: 1 }}
      onChange={(title) => {
        replaceNode(node, { ...node, displayName: title });
      }}
    />
  );
  if (!children || !children.length)
    return (
      <div style={getNodeStyle(isActive)} onClick={onClick}>
        {editableText}
      </div>
    );
  return (
    <div>
      <div onClick={onClick} style={getNodeStyle(isActive)}>
        <div>
          {collapsed ? (
            <>
              <CaretRightOutlined
                style={iconStyle}
                onClick={(e) => {
                  e.stopPropagation();
                  replaceNode(node, {
                    ...node,
                    $$layerState: { ...$$layerState, collapsed: false },
                  });
                }}
              />
              <FolderOutlined style={iconStyle} />
            </>
          ) : (
            <>
              <CaretDownOutlined
                style={iconStyle}
                onClick={(e) => {
                  e.stopPropagation();
                  replaceNode(node, {
                    ...node,
                    $$layerState: { ...$$layerState, collapsed: true },
                  });
                }}
              />
              <FolderOpenOutlined style={iconStyle} />
            </>
          )}
        </div>
        {editableText}
      </div>
      {!collapsed && (
        <div style={{ paddingLeft: 15 }}>
          {children.map((node) => (
            <TreeNode key={node.id} node={node} rootNode={rootNode} />
          ))}
        </div>
      )}
    </div>
  );
};

export default () => {
  const rootNodes = useRecoilValue(rootNodesState);
  return rootNodes.map((rootNode) => {
    return (
      <div
        key={rootNode.id}
        style={{
          padding: 10,
          marginBottom: 20,
          // fontSize: 13,
        }}
      >
        <TreeNode rootNode={rootNode} node={rootNode} />
      </div>
    );
  });
};
