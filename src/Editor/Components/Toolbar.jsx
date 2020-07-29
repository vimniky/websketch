import React from "react";
import { Popover, Button } from "antd";
import materialMap from "../../../Materials";
import { useAddNode } from "../useNodeActions";
import { PlusOutlined } from "@ant-design/icons";

const MaterialList = () => {
  const addNode = useAddNode();
  return (
    <div>
      {Object.keys(materialMap).map((key) => (
        <p style={{ cursor: "pointer" }} key={key} onClick={() => addNode(key)}>
          {key}
        </p>
      ))}
    </div>
  );
};

export default ({ addNode }) => {
  return (
    <Popover content={<MaterialList onSelect={addNode} />}>
      <Button icon={<PlusOutlined />} size="small" type="primary" />
    </Popover>
  );
};
