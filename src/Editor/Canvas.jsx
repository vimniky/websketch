import React from "react";
import { useSetRecoilState, useRecoilValue, useRecoilState } from "recoil";

import {
  rootNodesState,
  activeNodeIdState,
  activeNodeState,
  isFullscreenModeState,
  isPreviewModeState,
} from "./atoms";
import RenderNode from "./RenderNode";
import FullScreen from "./Components/FullScreen";

export default () => {
  const activeNodeId = useRecoilValue(activeNodeIdState);
  const setActiveNode = useSetRecoilState(activeNodeState);
  const [isFullscreenMode, setIsFullscreenMode] = useRecoilState(
    isFullscreenModeState
  );
  const isPreviewMode = useRecoilValue(isPreviewModeState);
  const rootNodes = useRecoilValue(rootNodesState);

  if (isFullscreenMode) {
    return (
      <FullScreen
        toggleFullScreen={() => {
          setIsFullscreenMode(!isFullscreenMode);
        }}
      >
        {rootNodes.map((node) => (
          <RenderNode
            key={node.id}
            node={node}
            activeNodeId={activeNodeId}
            setActiveNode={setActiveNode}
            isDesignMode={false}
          />
        ))}
      </FullScreen>
    );
  }

  return rootNodes.map((node) => (
    <RenderNode
      key={node.id}
      node={node}
      activeNodeId={activeNodeId}
      setActiveNode={setActiveNode}
      isDesignMode={!isPreviewMode}
    />
  ));
};
