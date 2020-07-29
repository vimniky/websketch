import React, { useState } from "react";
import { useRecoilValue } from "recoil";
import { CaretRightFilled } from "@ant-design/icons";

import { useUpdateNodeStyle } from "../useNodeActions";
import { activeNodeState } from "../atoms";
import Margin from "./Margin";
import Padding from "./Padding";
import Position from "./Position";
import { Select } from "antd";

export default ({ style = {} }) => {
  const updateNodeStyle = useUpdateNodeStyle();
  const activeNode = useRecoilValue(activeNodeState);
  let { $$style } = activeNode || {};
  $$style = $$style || {};
  const {
    marginTop,
    marginBottom,
    marginLeft,
    marginRight,

    paddingTop,
    paddingBottom,
    paddingLeft,
    paddingRight,

    position,
    zIndex,
    top,
    left,
    right,
    bottom,
  } = $$style;

  const [showMore, setShowMore] = useState(null);
  return (
    <div style={{ ...style }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div>
          <span>边距 </span>
          <CaretRightFilled
            style={{
              transform: `rotate(${showMore === "margin" ? "90deg" : "0"})`,
              transition: "transform 0.1s",
            }}
            onClick={() => setShowMore(showMore === "margin" ? null : "margin")}
          />
        </div>
        <div>
          <span>填充 </span>
          <CaretRightFilled
            style={{
              transform: `rotate(${showMore === "padding" ? "90deg" : "0"})`,
              transition: "transform 0.1s",
            }}
            onClick={() =>
              setShowMore(showMore === "padding" ? null : "padding")
            }
          />
        </div>
        <div>
          <span>定位</span>
          <Select
            size="small"
            style={{
              width: 80,
              transform: "scale(0.85)",
              transformOrigin: "center center",
            }}
            value={position}
            onChange={(position) => {
              updateNodeStyle({ position });
            }}
          >
            {[
              { label: "相对", value: "relative" },
              { label: "绝对", value: "absolute" },
            ].map((v) => (
              <Select.Option key={v.value} value={v.value}>
                {v.label}
              </Select.Option>
            ))}
          </Select>
          <CaretRightFilled
            style={{
              transform: `rotate(${showMore === "position" ? "90deg" : "0"})`,
              transition: "transform 0.1s",
              marginLeft: -4,
            }}
            onClick={() =>
              setShowMore(showMore === "position" ? null : "position")
            }
          />
        </div>
      </div>
      {showMore === "margin" && (
        <Margin
          {...{
            marginTop,
            marginBottom,
            marginLeft,
            marginRight,
            onChange: updateNodeStyle,
          }}
        />
      )}
      {showMore === "padding" && (
        <Padding
          {...{
            paddingTop,
            paddingBottom,
            paddingLeft,
            paddingRight,
            onChange: updateNodeStyle,
          }}
        />
      )}
      {showMore === "position" && (
        <Position
          {...{
            zIndex,
            top,
            left,
            right,
            bottom,
            onChange: updateNodeStyle,
          }}
        />
      )}
    </div>
  );
};
