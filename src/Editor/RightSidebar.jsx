import React, { useState } from "react";
import { Button } from "antd";

import StyleSetting from "./StyleSetting/Index";
import PropsSetting from "./PropsSetting/Index";
import { calcHeight } from "./utils/cssCalc";

export default ({ occupiedHeight }) => {
  // const [activeKey, setActiveKey] = useState("styleSetting");
  const [activeKey, setActiveKey] = useState("propsSetting");
  const isStyleSetting = activeKey === "styleSetting";

  const style = {
    padding: 10,
    height: calcHeight(occupiedHeight + 24),
    overflow: "scroll",
  };
  return (
    <div>
      <div style={{ display: "flex" }} value={activeKey}>
        <Button
          size="small"
          onClick={() => setActiveKey("styleSetting")}
          type={isStyleSetting ? "primary" : undefined}
          style={{
            width: "50%",
            borderLeft: 0,
            borderTopRightRadius: 0,
            borderBottomRightRadius: 0,
            border: "none",
          }}
        >
          样式
        </Button>
        <Button
          size="small"
          onClick={() => setActiveKey("propsSetting")}
          type={!isStyleSetting ? "primary" : undefined}
          style={{
            width: "50%",
            borderRadius: 0,
            border: "none",
          }}
        >
          属性
        </Button>
      </div>
      {isStyleSetting ? (
        <StyleSetting style={style} />
      ) : (
        <PropsSetting style={style} occupiedHeight={occupiedHeight + 24 + 20} />
      )}
    </div>
  );
};
