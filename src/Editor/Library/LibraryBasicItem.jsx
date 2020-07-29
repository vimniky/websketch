import React from "react";
import { useAddNode } from "../useNodeActions";
import { PlusOutlined } from "@ant-design/icons";
import { useRecoilValue } from "recoil";
import { activeNodeState } from "../atoms";

export default ({ icon, title, name, shortcut, style = {}, ...props }) => {
  const activeNode = useRecoilValue(activeNodeState) || {};
  const addNode = useAddNode();
  const canAddNode = activeNode.name === "Container";
  return (
    <div
      style={{
        userSelect: "none",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        position: "relative",
        opacity: canAddNode ? 1 : 0.4,
        filter: `grayscale(${canAddNode ? 0 : 1})`,
        cursor: canAddNode ? "pointer" : "not-allowed",
        ...style,
      }}
      {...props}
      onClick={() => {
        if (canAddNode) {
          addNode(name);
        }
      }}
    >
      <div className="library-item-overlay">
        <PlusOutlined />
      </div>
      <div style={{ display: "flex", alignItems: "center" }}>
        <span
          style={{
            fontSize: "1.1em",
            fontWeight: 200,
            width: 30,
          }}
        >
          {icon}
        </span>
        <span style={{ paddingBottom: 2 }}>{title}</span>
      </div>
      <div>{shortcut}</div>
    </div>
  );
};
