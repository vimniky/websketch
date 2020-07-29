import { useHotkeys } from "react-hotkeys-hook";
import { useRecoilValue } from "recoil";
import { activeNodeState } from "./atoms";
import {
  useRemoveNode,
  useMoveNodeToLeft,
  useMoveNodeToRight,
} from "./useNodeActions";

const isInputableElement = (element) =>
  element instanceof HTMLInputElement ||
  element instanceof HTMLTextAreaElement ||
  element instanceof HTMLButtonElement;

const useEditHotkeys = (key, actionFn) => {
  const activeNode = useRecoilValue(activeNodeState);
  const hasActiveNode = !!activeNode;

  useHotkeys(
    key,
    (event, /* hotkey's custom event object*/ _) => {
      if (
        hasActiveNode &&
        event.type === "keyup" &&
        !isInputableElement(window.activeElement)
      ) {
        actionFn();
      }
    },
    { keyup: true },
    [activeNode, hasActiveNode, actionFn]
  );
};

export const useRegisterHotKeys = () => {
  const removeNode = useRemoveNode();
  const moveNodeToLeft = useMoveNodeToLeft();
  const moveNodeToRight = useMoveNodeToRight();
  // Edit actions
  useEditHotkeys("backspace", removeNode);
  useEditHotkeys("left", moveNodeToLeft);
  useEditHotkeys("up", moveNodeToLeft);
  useEditHotkeys("right", moveNodeToRight);
  useEditHotkeys("down", moveNodeToRight);
};
