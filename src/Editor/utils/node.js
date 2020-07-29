import { v4 as uuid } from "uuid";
import cloneDeep from "lodash/cloneDeep";

export const getInfo = (root, id) => {
  if (!root) return null;
  let found = null;

  const loop = (children, parent) => {
    if (found || !children || !children.length) {
      return null;
    }

    const len = children.length;

    for (let i = 0; i < len; i++) {
      const ithNode = children[i];
      if (ithNode.id === id) {
        found = {
          node: ithNode,
          parent,
          index: i,
          root,
        };
        return;
      }
    }

    for (let i = 0; i < len; i++) {
      if (found) return;
      loop(children[i].children, children[i]);
    }
  };

  loop(root.children, root);
  if (!found) {
    console.warn(`Can't find node: ${id}`, root);
  }
  return found;
};

export const replace = (root, id, newNode) => {
  if (root.id === id) {
    return newNode;
  }
  root = cloneDeep(root);
  const nodeInfo = getInfo(root, id);
  if (!nodeInfo) return root;
  const { parent, index } = nodeInfo;
  parent.children[index] = newNode;
  return root;
};

export const remove = (root, id) => {
  root = cloneDeep(root);
  const nodeInfo = getInfo(root, id);
  if (!nodeInfo) return root;
  let { parent } = nodeInfo;
  parent.children = parent.children.filter((c) => c.id !== id);
  return root;
};

export const moveToLeft = (root, id) => {
  root = cloneDeep(root);
  const nodeInfo = getInfo(root, id);
  if (!nodeInfo) return root;
  let { parent, index } = nodeInfo;
  const newIndex = index === 0 ? parent.children.length - 1 : index - 1;
  const tmp = parent.children[newIndex];
  parent.children[newIndex] = parent.children[index];
  parent.children[index] = tmp;
  return root;
};

export const moveToRight = (root, id) => {
  root = cloneDeep(root);
  const nodeInfo = getInfo(root, id);
  if (!nodeInfo) return root;
  let { parent, index } = nodeInfo;
  const newIndex = index === parent.children.length - 1 ? 0 : index + 1;
  const tmp = parent.children[newIndex];
  parent.children[newIndex] = parent.children[index];
  parent.children[index] = tmp;
  return root;
};

export const activateNext = (root, id) => {
  const nodeInfo = getInfo(root, id);
  if (!nodeInfo) return false;
  let { parent, index } = nodeInfo;
  if (index === parent.children.length - 1) return false;
  const newActiveNode = parent[index + 1];
  return newActiveNode;
};

export const activatePrev = (root, id) => {
  const nodeInfo = getInfo(root, id);
  if (!nodeInfo) return false;
  let { parent, index } = nodeInfo;
  if (index === 0) return parent;
  const newActiveNode = parent[index - 1];
  return newActiveNode;
};

export const create = (name, options = {}) => {
  const { style = {}, props = {}, attrs = {} } = options;
  let s = {
    display: "flex",
    flexWrap: "no-wrap",
    alignItems: "center",
    width: 100,
    height: 100,
  };

  if (name === "Text") {
    s = {
      fontSize: 14,
    };
  }

  return {
    id: uuid(),
    ...attrs,
    name,
    $$style: {
      position: "relative",
      ...s,
      ...style,
    },
    $$props: {
      ...props,
    },
  };
};
