import { atom, selector } from "recoil";
import { create } from "./utils/node";
import { getRootNodes } from "./utils/editorLocalStore";

const getDefaultRootNodes = () => {
  const rootNodes = getRootNodes();
  if (!rootNodes || !rootNodes.length) {
    return [
      create("Container", {
        attrs: { isRoot: true },
        style: {
          width: 660,
          height: 140,
        },
      }),
    ];
  }

  return rootNodes;
};

export const rootNodesState = atom({
  key: "rootNodes",
  default: getDefaultRootNodes(),
});

export const activeRootNodeIdState = atom({
  key: "activeRootNodeId",
  default: null,
});

export const activeRootNodeState = selector({
  key: "activeRootNode",
  get: ({ get }) => {
    const rootNodes = get(rootNodesState);
    const activeRootNodeId = get(activeRootNodeIdState);
    if (activeRootNodeId) {
      return rootNodes.find((n) => n.id === activeRootNodeId);
    } else {
      return rootNodes[0];
    }
  },
});

export const activeNodeState = atom({
  key: "activeNode",
  default: null,
});

export const activeNodeIdState = selector({
  key: "activeNodeId",
  get: ({ get }) => {
    const activeNode = get(activeNodeState);
    return activeNode ? activeNode.id : null;
  },
});

export const isCanAddNodeState = selector({
  key: "isCanAddNode",
  get: ({ get }) => {
    const activeNode = get(activeNodeState);
    return activeNode.name === "Container";
  },
});

// Editor State
export const isPreviewModeState = atom({
  key: "isPreviewMode",
  default: false,
});

export const isFullscreenModeState = atom({
  key: "isFullscreenMode",
  default: false,
});

export const showTemplateDataState = atom({
  key: "showTemplateData",
  default: false,
});

// Data Source
export const dataSourceSchemaState = atom({
  key: "dataSourceSchema",
  default: [],
});

// Click Dot
export const clickDotState = atom({
  key: "clickDot",
  default: {},
});

// Form Schema
export const formSchemaState = atom({
  key: "formSchema",
  default: [],
});

export const nodeInactiveStyleState = selector({
  key: "nodeInactiveStyle",
  get: ({ get }) => {
    const activeNode = get(activeNodeState);
    const hasActiveNode = !!activeNode;

    if (hasActiveNode) {
      return {};
    }

    return {
      pointerEvents: hasActiveNode ? "auto" : "none",
      filter: `grayscale(${hasActiveNode ? 0 : 1})`,
      opacity: hasActiveNode ? 1 : 0.4,
    };
  },
});
