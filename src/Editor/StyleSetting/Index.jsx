import React from "react";
import { useRecoilValue } from "recoil";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import "rc-color-picker/dist/rc-color-picker.min.css";
import { v4 as uuid } from "uuid";

import {
  useUpdateNodeStyle,
  useUpdateNodeCustomStyle,
  useUpdateNodeBoxShadow,
} from "../useNodeActions";
import { activeNodeState, nodeInactiveStyleState } from "../atoms";
import Background from "./Background";
import Expandable from "../Components/Expandable";
import CheckableKeyValueInputList from "../Components/CheckableKeyValueInputList.jsx";
import Border from "./Border";
import Layout from "./Layout";
import BoxShadow from "./BoxShadow";
import TextSetting from "./TextSetting";
import MarginPaddingPosition from "./MarginPaddingPosition";
import WidthHeight from "./WidthHeight";

const sectionStyle = {
  marginBottom: 10,
  paddingBottom: 10,
  borderBottom: "1px solid #DBDBDB",
};

export default ({ style = {} }) => {
  const updateNodeStyle = useUpdateNodeStyle();
  const updateNodeCustomStyle = useUpdateNodeCustomStyle();
  const updateNodeBoxShadow = useUpdateNodeBoxShadow();
  const activeNode = useRecoilValue(activeNodeState);
  const nodeInactiveStyle = useRecoilValue(nodeInactiveStyleState);

  let { $$style, $$customStyle, $$boxShadow, name } = activeNode || {};
  const isText = name === "Text";
  $$style = $$style || {};
  $$customStyle = $$customStyle || [];
  $$boxShadow = $$boxShadow || {};

  const {
    width,
    height,

    flexDirection,
    alignItems,
    justifyContent,

    // Text
    fontSize,
    fontWeight,
    color,
    textAlign,
    lineHeight,

    background,

    borderWidth,
    borderColor,
    borderRadius,
    borderStyle,
  } = $$style;
  return (
    <div
      style={{
        ...style,
        ...nodeInactiveStyle,
      }}
    >
      <WidthHeight
        {...{ style: sectionStyle, width, height, onChange: updateNodeStyle }}
      />
      {isText ? (
        <TextSetting
          {...{
            fontSize,
            fontWeight,
            color,
            textAlign,
            lineHeight,
            sectionStyle,
            onChange: (textProps) => {
              updateNodeStyle(textProps);
            },
          }}
        />
      ) : (
        <Layout
          {...{
            style: sectionStyle,
            flexDirection,
            alignItems,
            justifyContent,
            onChange: (layoutProps) => {
              updateNodeStyle(layoutProps);
            },
          }}
        />
      )}

      <MarginPaddingPosition style={sectionStyle} />

      <Background
        {...{
          style: sectionStyle,
          background,
          onChange: ({ background }) => {
            updateNodeStyle({ background });
          },
        }}
      />
      <Border
        {...{
          borderWidth,
          borderColor,
          borderStyle,
          onChange: updateNodeStyle,
          style: sectionStyle,
          borderRadius,
        }}
      />
      <BoxShadow
        {...{
          style: sectionStyle,
          boxShadow: $$boxShadow,
          onChange: (boxShadow) => {
            updateNodeBoxShadow({ ...$$boxShadow, ...boxShadow });
          },
        }}
      />
      <Expandable
        title="自定义样式"
        maxHeight={130}
        style={sectionStyle}
        disableExpand={!$$customStyle.length}
        icons={[
          $$customStyle.some((item) => !!item.disabled) && (
            <DeleteOutlined
              onClick={() => {
                const nextCustomStyle = $$customStyle.filter(
                  (item) => !item.disabled
                );
                updateNodeCustomStyle(nextCustomStyle);
              }}
            />
          ),
          <PlusOutlined
            onClick={() => {
              updateNodeCustomStyle([...$$customStyle, { id: uuid() }]);
            }}
            style={{ cursor: "pointer" }}
          />,
        ]}
      >
        <CheckableKeyValueInputList
          {...{
            list: $$customStyle,
            keyLabel: "样式属性",
            valueLabel: "样式取值",
            onChange: (customStyle) => {
              updateNodeCustomStyle(customStyle);
            },
          }}
        />
      </Expandable>
    </div>
  );
};
