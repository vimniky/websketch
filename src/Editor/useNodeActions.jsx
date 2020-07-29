import objectFilter from "./utils/objectFilter";
import { useSetRecoilState, useRecoilState, useRecoilValue } from "recoil";
import { rootNodesState, activeNodeState, activeRootNodeState } from "./atoms";
import { create, replace, remove, moveToLeft, moveToRight } from "./utils/node";
import replaceWhile from "./utils/replaceWhile";
import { setRootNodesDebounced } from "./utils/editorLocalStore";
import importTemplate from "./utils/importTemplate";

export const useReplaceRootNode = () => {
  const [rootNodes, setRootNodes] = useRecoilState(rootNodesState);
  return (rootNode) => {
    const nextRootNodes = replaceWhile(
      rootNodes,
      rootNode,
      (ithRootNode) => ithRootNode.id === rootNode.id
    );
    setRootNodes(nextRootNodes);

    // save to localStorage
    setRootNodesDebounced(nextRootNodes);
  };
};

export const useReplaceNode = () => {
  const activeRootNode = useRecoilValue(activeRootNodeState);
  const replaceRootNode = useReplaceRootNode();
  return (node, newNode) => {
    const nextRootNode = replace(activeRootNode, node.id, newNode);
    replaceRootNode(nextRootNode);
  };
};

export const useAddNode = () => {
  const setActiveNode = useSetRecoilState(activeNodeState);
  const replaceNode = useReplaceNode();
  return (name, options = {}) => {
    const newNode = create(name, options);
    setActiveNode((activeNode) => {
      const nextActiveNode = {
        ...activeNode,
        children: [...(activeNode.children || []), newNode],
      };
      replaceNode(activeNode, nextActiveNode);
      return nextActiveNode;
    });
  };
};

export const useUpdateNode = () => {
  const replaceNode = useReplaceNode();
  const [activeNode, setActiveNode] = useRecoilState(activeNodeState);
  return (nodeProps) => {
    const nextNode = {
      ...activeNode,
      ...nodeProps,
    };
    setActiveNode(nextNode);
    replaceNode(activeNode, nextNode);
  };
};

export const useEmptyNode = () => {
  const replaceNode = useReplaceNode();
  const [activeNode, setActiveNode] = useRecoilState(activeNodeState);
  return () => {
    const nextNode = {
      ...activeNode,
      children: [],
    };
    setActiveNode(nextNode);
    replaceNode(activeNode, nextNode);
  };
};

const NODE_CMD = {
  REMOVE: "REMOVE",
  MOVE_TO_LEFT: "MOVE_TO_LEFT",
  MOVE_TO_RIGHT: "MOVE_TO_RIGHT",
  ACTIVATE_NEXT: "ACTIVATE_NEXT",
  ACTIVATE_PREV: "ACTIVATE_PREV",
};
const useNodeCmd = (cmd) => {
  const activeRootNode = useRecoilValue(activeRootNodeState);
  const [activeNode, setActiveNode] = useRecoilState(activeNodeState);
  const replaceRootNode = useReplaceRootNode();

  if (!activeNode) return;

  return (id = activeNode.id) => {
    let nextRootNode;
    if (cmd === NODE_CMD.REMOVE) {
      nextRootNode = remove(activeRootNode, id);
      setActiveNode(null);
    } else if (cmd === NODE_CMD.MOVE_TO_LEFT) {
      nextRootNode = moveToLeft(activeRootNode, id);
    } else if (cmd === NODE_CMD.MOVE_TO_RIGHT) {
      nextRootNode = moveToRight(activeRootNode, id);
    }
    replaceRootNode(nextRootNode);
  };
};
export const useRemoveNode = () => useNodeCmd(NODE_CMD.REMOVE);
export const useMoveNodeToLeft = () => useNodeCmd(NODE_CMD.MOVE_TO_LEFT);
export const useMoveNodeToRight = () => useNodeCmd(NODE_CMD.MOVE_TO_RIGHT);

export const useUpdateNodeStyle = () => {
  const updateNode = useUpdateNode();
  const activeNode = useRecoilValue(activeNodeState);
  return (style) => {
    updateNode({
      $$style: objectFilter({ ...(activeNode.$$style || {}), ...style }),
    });
  };
};

export const useUpdateNodeBoxShadow = () => {
  const updateNode = useUpdateNode();
  const activeNode = useRecoilValue(activeNodeState);
  return (boxShadow) => {
    updateNode({
      $$boxShadow: {
        ...(activeNode.$$boxShadow || {}),
        ...boxShadow,
      },
    });
  };
};

export const useUpdateNodeCustomStyle = () => {
  const updateNode = useUpdateNode();
  return ($$customStyle) => {
    updateNode({
      $$customStyle,
    });
  };
};

export const useUpdateNodeProps = () => {
  const updateNode = useUpdateNode();
  return ($$props) => {
    updateNode({
      $$props,
    });
  };
};

export const useUpdateNodeCustomProps = () => {
  const updateNode = useUpdateNode();
  return ($$customProps) => {
    updateNode({
      $$customProps,
    });
  };
};

export const useUpdateNodeClickDot = () => {
  const updateNode = useUpdateNode();
  return ($$clickDot) => {
    updateNode({
      $$clickDot,
    });
  };
};

export const useUpdateNodeLayerState = () => {
  const updateNode = useUpdateNode();
  const activeNode = useRecoilValue(activeNodeState);
  return ($$layerState) => {
    updateNode({
      $$layerState: {
        ...(activeNode && activeNode.$$layerState
          ? activeNode.$$layerState
          : {}),
        ...$$layerState,
      },
    });
  };
};

export const useImportTemplate = () => {
  const setRootNodes = useSetRecoilState(rootNodesState);
  return () => {
    importTemplate((rootNodes) => {
      setRootNodes(rootNodes);
    });
  };
};
