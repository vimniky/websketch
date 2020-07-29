import debounce from "lodash.debounce";
import localStore from "./localStore";

const version = "v2.0";
const ROO_NODES_KEY = `ROOT_NODES@${version}`;

export const getRootNodes = () => {
  return localStore.get(ROO_NODES_KEY) || [];
};
export const setRootNodes = (rootNodes) => {
  localStore.set(ROO_NODES_KEY, rootNodes);
};
export const setRootNodesDebounced = debounce(setRootNodes, 1000);

// CREATIVE_FORM
const CREATIVE_FORM = `CREATIVE_FORM@${version}`;
export const getCreativeForm = () => {
  return localStore.get(CREATIVE_FORM) || [];
};
export const setCreativeForm = (creativeForm) => {
  localStore.set(CREATIVE_FORM, creativeForm);
};
export const setCreativeFormDebounced = debounce(setCreativeForm, 1000);
