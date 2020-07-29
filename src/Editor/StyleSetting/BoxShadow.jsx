import React from "react";
import CustomNumberInput from "../Components/CustomNumberInput";
import CustomColorPicker from "../Components/CustomColorPicker";
import Expandable from "../Components/Expandable";
import { Checkbox } from "antd";

export default ({ style = {}, boxShadow, onChange }) => {
  const {
    x,
    y,
    blur,
    spread,
    color = "rgba(0, 0, 0, 0.5)",
    disabled = true,
  } = boxShadow;

  return (
    <Expandable
      style={style}
      title={
        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <div style={{ marginRight: 10 }}>阴影</div>
          <CustomColorPicker
            rgbaColor={color}
            onChange={({ rgbaColor }) => {
              onChange({ rgbaColor, disabled: false, blur: blur || 4 });
            }}
          />
        </div>
      }
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginTop: 10,
        }}
      >
        <Checkbox
          style={{ marginRight: 10, alignSelf: "flex-start" }}
          checked={!disabled}
          onChange={(e) => {
            onChange({ disabled: !e.target.checked });
          }}
        />
        <div style={{ textAlign: "center" }}>
          <CustomNumberInput
            showInputNumberHandler={false}
            value={x}
            inputProps={{ size: "small", placeholder: 0 }}
            onChange={(x) => {
              onChange({ x, disabled: false });
            }}
          />
          <div style={{ color: "#999", fontSize: "0.8em" }}>X</div>
        </div>

        <div style={{ textAlign: "center" }}>
          <CustomNumberInput
            showInputNumberHandler={false}
            value={y}
            inputProps={{ size: "small", placeholder: 0 }}
            onChange={(y) => {
              onChange({ y, disabled: false });
            }}
          />
          <div style={{ color: "#999", fontSize: "0.8em" }}>Y</div>
        </div>
        <div style={{ textAlign: "center" }}>
          <CustomNumberInput
            showInputNumberHandler={false}
            value={blur}
            inputProps={{ size: "small", placeholder: 0 }}
            onChange={(blur) => {
              onChange({ blur, disabled: false });
            }}
          />
          <div style={{ color: "#999", fontSize: "0.8em" }}>模糊</div>
        </div>
        <div style={{ textAlign: "center" }}>
          <CustomNumberInput
            showInputNumberHandler={false}
            value={spread}
            inputProps={{ size: "small", placeholder: 0 }}
            onChange={(spread) => {
              onChange({ spread, disabled: false });
            }}
          />
          <div style={{ color: "#999", fontSize: "0.8em" }}>扩展</div>
        </div>
      </div>
    </Expandable>
  );
};
