import React from "react";
import ColorPicker from "rc-color-picker";
import CustomNumberInput from "../Components/CustomNumberInput";
import { Radio } from "antd";

export default ({
  borderWidth,
  borderColor = "#000",
  borderStyle = "solid",
  borderRadius,
  onChange,
  style = {},
}) => {
  return (
    <div style={style}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 8,
          userSelect: "none",
        }}
      >
        <span>边框</span>
        {/* solid */}
        <div
          onClick={() => {
            onChange({ borderStyle: "solid", borderWidth: borderWidth || 1 });
          }}
          style={{
            marginLeft: 20,
            flexGrow: 1,
            display: "flex",
            alignItems: "center",
            marginRight: 10,
            cursor: "pointer",
          }}
        >
          <Radio checked={borderStyle !== "dashed"} />
          <div
            style={{
              flexGrow: 1,
              borderTop: "2px solid #000",
              marginTop: 1,
            }}
          />
        </div>
        {/* dashed */}
        <div
          onClick={() => {
            onChange({ borderStyle: "dashed", borderWidth: borderWidth || 1 });
          }}
          style={{
            marginLeft: 10,
            marginRight: 10,
            flexGrow: 1,
            display: "flex",
            alignItems: "center",
            cursor: "pointer",
          }}
        >
          <Radio checked={borderStyle === "dashed"} />
          <div
            style={{
              flexGrow: 1,
              marginTop: 1,
              borderTop: "2px dashed #000",
            }}
          />
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div
          style={{
            alignSelf: "flex-end",
            marginRight: 10,
            position: "relative",
          }}
        >
          <ColorPicker
            color={borderColor || "#000"}
            onChange={({ color }) => {
              onChange({
                borderColor: color,
                borderStyle,
                borderWidth: borderWidth || 1,
              });
            }}
          />
        </div>
        <CustomNumberInput
          inputPrefix="W"
          inputStyle={{ paddingLeft: 10 }}
          value={borderWidth}
          onChange={(borderWidth) => {
            onChange({
              borderWidth,
              borderStyle,
              borderColor: borderColor || "#000",
            });
          }}
        />
        <CustomNumberInput
          inputPrefix="R"
          inputStyle={{ paddingLeft: 8 }}
          value={borderRadius}
          onChange={(borderRadius) => {
            onChange({ borderRadius });
          }}
        />
      </div>
    </div>
  );
};
