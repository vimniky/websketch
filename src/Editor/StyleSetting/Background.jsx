import React from "react";
import CustomColorPicker from "../Components/CustomColorPicker";

export default ({
  background = "rgba(255,255,255,1)",
  onChange,
  style = {},
}) => {
  return (
    <div style={{ ...style, display: "flex", alignItems: "center" }}>
      <span style={{ marginRight: 10 }}>背景</span>
      <CustomColorPicker
        rgbaColor={background}
        onChange={({ rgbaColor }) => {
          onChange({
            background: rgbaColor,
          });
        }}
      />
    </div>
  );
};
