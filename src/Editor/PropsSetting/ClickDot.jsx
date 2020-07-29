import React, { useState } from "react";
import { v4 as uuid } from "uuid";
import {
  SettingOutlined,
  PlusOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { useRecoilValue } from "recoil";

import { activeNodeState } from "../atoms";
import CheckableKeyValueInputList from "../Components/CheckableKeyValueInputList.jsx";
import { useUpdateNodeClickDot } from "../useNodeActions";
import Expandable from "../Components/Expandable";

const EditClickDotModal = () => <div>TODO: Edit Click Dot Modal</div>;

export default (style = {}) => {
  const [editClickDot, setEditClickDot] = useState(undefined);
  const activeNode = useRecoilValue(activeNodeState);
  const updateClickDot = useUpdateNodeClickDot();

  let { $$clickDot } = activeNode || {};
  $$clickDot = $$clickDot || [];

  return (
    <>
      {editClickDot !== undefined && (
        <EditClickDotModal modalProps={{ visible: editClickDot }} />
      )}
      <Expandable
        style={style}
        maxHeight={130}
        title={
          <>
            <SettingOutlined onClick={() => setEditClickDot(true)} />
            <span> 打点</span>
          </>
        }
        disableExpand={!$$clickDot.length}
        icons={[
          $$clickDot.some((item) => !!item.disabled) && (
            <DeleteOutlined
              onClick={() => {
                const nextClickDot = $$clickDot.filter(
                  (item) => !item.disabled
                );
                updateClickDot(nextClickDot);
              }}
            />
          ),
          <PlusOutlined
            onClick={() => {
              updateClickDot([...$$clickDot, { id: uuid() }]);
            }}
            style={{ cursor: "pointer" }}
          />,
        ]}
      >
        <CheckableKeyValueInputList
          {...{
            keyLabel: "参数Key",
            valueLabel: "参数Value",
            list: $$clickDot,
            onChange: (clickDot) => {
              updateClickDot(clickDot);
            },
          }}
        />
      </Expandable>
    </>
  );
};
