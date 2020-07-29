import React, { useState } from "react";
import { Button } from "antd";

import Library from "./Library/Index";
import { calcHeight } from "./utils/cssCalc";
import Layer from "./Layer";

export default ({ occupiedHeight }) => {
  const [activeKey, setActiveKey] = useState("treeView");
  const isLibraryActive = activeKey === "library";

  const style = {
    height: calcHeight(occupiedHeight + 24),
    overflow: "scroll",
    padding: 10,
  };
  return (
    <div>
      <div style={{ display: "flex" }} value={activeKey}>
        <Button
          size="small"
          onClick={() => setActiveKey("library")}
          type={isLibraryActive ? "primary" : undefined}
          style={{
            width: "50%",
            borderLeft: 0,
            boxShadow: "none",
            border: "none",
            borderRadius: 0,
          }}
        >
          组件
        </Button>
        <Button
          size="small"
          onClick={() => setActiveKey("treeView")}
          style={{
            width: "50%",
            borderRight: 0,
            borderTopLeftRadius: 0,
            borderBottomLeftRadius: 0,
            boxShadow: "none",
            border: "none",
          }}
          type={!isLibraryActive ? "primary" : undefined}
        >
          图层
        </Button>
      </div>
      {isLibraryActive ? <Library style={style} /> : <Layer style={style} />}
    </div>
  );
};
