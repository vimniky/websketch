import React, { useState, useMemo } from "react";
import FullScreen from "./FullScreen";
import { Radio } from "antd";
import { getRootNodes } from "../utils/editorLocalStore";

export default ({ toggleFullScreen }) => {
  const [activeKey, setActiveKey] = useState("template");

  const data = useMemo(() => {
    const rootNodes = getRootNodes();
    return {
      template: JSON.stringify(rootNodes, null, 2),
    };
  }, []);

  return (
    <FullScreen toggleFullScreen={toggleFullScreen}>
      <div>
        <Radio.Group
          value={activeKey}
          onChange={(e) => {
            setActiveKey(e.target.value);
          }}
        >
          <Radio.Button value="template">模板</Radio.Button>
        </Radio.Group>
        <div
          style={{
            width: 800,
            height: "calc(100vh - 140px)",
            overflow: "scroll",
            background: "#fff",
            padding: 10,
            borderRadius: 6,
            borderTopLeftRadius: 2,
          }}
        >
          <pre>{data[activeKey]}</pre>
        </div>
      </div>
    </FullScreen>
  );
};
