import React, { useState } from "react";
import { materialMap } from "./Materials";
import {
  styleParser,
  customStyleParser,
  clickDotParser,
  parseBoxShadow,
  customPropsParser,
} from "./utils/NodeDataParser";

const RenderNode = ({ node, activeNodeId, setActiveNode, isDesignMode }) => {
  const [hovering, setHovering] = useState(false);
  const {
    name,
    children,
    $$props,
    $$customProps,
    $$style,
    $$customStyle,
    $$clickDot,
    $$boxShadow,
  } = node;
  const Node = materialMap[name];
  const isActive = activeNodeId === node.id;
  const boxShadow = parseBoxShadow($$boxShadow);
  const style = {
    cursor: "pointer",
    boxShadow,
    outline: isDesignMode
      ? `dashed 1px ${hovering || isActive ? "blue" : "#ccc"}`
      : "none",
    ...styleParser($$style),
    ...customStyleParser($$customStyle),
  };

  const props = {
    ...($$props || {}),
    ...customPropsParser($$customProps),
    // $$clickDot: clickDotParser($$clickDot),
  };

  const onClick = (e) => {
    e.stopPropagation();
    e.preventDefault();
    if (node.id !== activeNodeId) {
      setActiveNode(node);
    }
    return false;
  };

  return (
    <Node
      onMouseOver={(e) => {
        e.stopPropagation();
        setHovering(true);
      }}
      onMouseOut={(e) => {
        e.stopPropagation();
        setHovering(false);
      }}
      onClick={onClick}
      {...props}
      style={{ ...style }}
    >
      {children &&
        !!children.length &&
        children.map((child) => (
          <RenderNode
            key={child.id}
            node={child}
            isDesignMode={isDesignMode}
            activeNodeId={activeNodeId}
            setActiveNode={setActiveNode}
          />
        ))}
    </Node>
  );
};

export default RenderNode;
