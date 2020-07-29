import React from "react";
import Expandable from "../Components/Expandable";
import { Radio } from "antd";
import LayoutDiagram from "./LayoutDiagram";

export default ({
  style = {},
  flexDirection = "row",
  justifyContent = "flex-start",
  alignItems = "center",
  onChange,
}) => {
  const isRow = flexDirection === "row";
  return (
    <Expandable
      defaultExpand
      style={style}
      title={
        <div style={{ display: "flex", alignItems: "center" }}>
          <div style={{ marginRight: 20, marginTop: 2 }}>排列 & 分布</div>
          <div
            style={{ marginRight: 10 }}
            onClick={() => {
              onChange({
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "flex-start",
              });
            }}
          >
            行 <Radio checked={isRow} />
          </div>
          <div
            style={{ marginRight: 10 }}
            onClick={() => {
              onChange({
                flexDirection: "column",
                alignItems: "flex-start",
                justifyContent: "center",
              });
            }}
          >
            列 <Radio checked={!isRow} />
          </div>
        </div>
      }
    >
      <div
        style={{
          display: "flex",
          marginTop: 10,
          justifyContent: "space-around",
        }}
      >
        <div
          style={{
            transformOrigin: "center, center",
            transform: `rotate(${!isRow ? "90deg" : 0})`,
            transition: "transform 0.1s",
            height: 100,
            display: "flex",
            flexDirection: !isRow ? "column-reverse" : "column",
          }}
        >
          {[
            { justifyContent: "flex-start" },
            { justifyContent: "center" },
            { justifyContent: "space-between" },
            { justifyContent: "space-around" },
            { justifyContent: "space-evenly" },
            { justifyContent: "flex-end" },
          ].map((style, idx) => (
            <LayoutDiagram
              key={style.justifyContent}
              index={idx}
              style={{
                ...style,
                flexDirection: "row",
                width: 100,
                height: 10,
                marginTop: isRow ? (idx === 0 ? 0 : 8) : idx === 5 ? 0 : 8,
              }}
              isActive={style.justifyContent === justifyContent}
              onClick={() => {
                onChange({ justifyContent: style.justifyContent });
              }}
            />
          ))}
        </div>
        <div style={{ borderLeft: "1px solid #DBDBDB" }} />

        <div
          style={{
            transformOrigin: "center, center",
            transform: `rotate(${flexDirection === "column" ? "-90deg" : 0})`,
            transition: "transform 0.1s",
          }}
        >
          {[
            { alignItems: "flex-start" },
            { alignItems: "center" },
            { alignItems: "flex-end" },
          ].map((style, idx) => (
            <LayoutDiagram
              key={style.alignItems}
              style={{
                ...style,
                height: 26,
                width: 100,
                marginTop: idx === 0 ? 0 : 11,
              }}
              isActive={style.alignItems === alignItems}
              onClick={() => {
                onChange({ alignItems: style.alignItems });
              }}
            />
          ))}
        </div>
      </div>
    </Expandable>
  );
};
