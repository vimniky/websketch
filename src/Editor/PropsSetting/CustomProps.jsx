import React from "react";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import { v4 as uuid } from "uuid";

import Expandable from "../Components/Expandable";
import PrimitiveTypeInput from "../Components/PrimitiveTypeInput";
import { useRecoilValue } from "recoil";
import { activeNodeState } from "../atoms";
import { useUpdateNodeCustomProps } from "../useNodeActions";
import replaceWhile from "../utils/replaceWhile";

export default ({ style = {} }) => {
  const activeNode = useRecoilValue(activeNodeState);
  const updateNodeCustomProps = useUpdateNodeCustomProps();
  let { $$customProps } = activeNode || {};
  $$customProps = $$customProps || [];

  return (
    <Expandable
      style={style}
      title="自定义属性"
      disableExpand={!$$customProps.length}
      maxHeight={180}
      icons={[
        $$customProps.some((item) => !!item.disabled) && (
          <DeleteOutlined
            onClick={() => {
              const nextCustomProps = $$customProps.filter(
                (item) => !item.disabled
              );
              updateNodeCustomProps(nextCustomProps);
            }}
          />
        ),
        <PlusOutlined
          style={{ cursor: "pointer" }}
          onClick={() => {
            updateNodeCustomProps([...$$customProps, { id: uuid() }]);
          }}
        />,
      ]}
    >
      <div style={{ marginTop: 10 }}>
        {$$customProps.map((item, idx) => (
          <PrimitiveTypeInput
            index={idx}
            keyLabel="属性名"
            valueLabel="属性值"
            style={{
              marginTop: 10,
              borderTop: style.borderBottom,
              paddingTop: 10,
            }}
            onChange={(item) => {
              const nextCustomProps = replaceWhile(
                $$customProps,
                item,
                (ithItem) => ithItem.id === item.id
              );
              updateNodeCustomProps(nextCustomProps);
            }}
            key={item.id}
            data={item}
          />
        ))}
      </div>
    </Expandable>
  );
};
