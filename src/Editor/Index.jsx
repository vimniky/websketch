import React from "react";

import Canvas from "./Canvas";
import LeftSidebar from "./LeftSidebar";
import RightSidebar from "./RightSidebar";
import { calcHeight, calcWidth } from "./utils/cssCalc";
import { useSetRecoilState } from "recoil";
import { activeNodeState } from "./atoms";
import { useRegisterHotKeys } from "./useHotkeys";

const leftSidebarWidth = 240;
const headerHeight = 36;
const rightSidebarWidth = 260;
const marginTop = 4;
const mainMarginX = 20;
const mainPadding = 20;
const contentHeight = calcHeight(headerHeight + marginTop);
const mainWidth = calcWidth(
  leftSidebarWidth + rightSidebarWidth + mainMarginX * 2
);
const canvasWidth = calcWidth(
  leftSidebarWidth + rightSidebarWidth + mainMarginX * 2 + mainPadding * 2
);

export default () => {
  const setActiveNode = useSetRecoilState(activeNodeState);
  useRegisterHotKeys();
  return (
    <div className="page-editor" style={{ display: "flex", marginTop }}>
      <aside
        style={{
          flexGrow: 0,
          flexShrink: 0,
          width: leftSidebarWidth,
          boxShadow: "0px 0px 2px #ccc",
          background: "#F2F2F2",
        }}
      >
        <LeftSidebar occupiedHeight={headerHeight + marginTop} />
      </aside>
      <main
        style={{
          flexGrow: 1,
          flexShrink: 1,
          margin: `0 ${mainMarginX}px`,
          width: mainWidth,
          height: contentHeight,
          overflow: "scroll",
          padding: 20,
          borderRadius: 4,
        }}
        onClick={() => {
          setActiveNode(null);
        }}
      >
        <Canvas style={{ width: canvasWidth }} />
      </main>
      <aside
        style={{
          flexGrow: 0,
          flexShrink: 0,
          width: rightSidebarWidth,
          boxShadow: "0px 0px 2px #ccc",
          background: "#F2F2F2",
        }}
      >
        <RightSidebar occupiedHeight={headerHeight + marginTop} />
      </aside>
    </div>
  );
};
