import React from "react";
import ColorPicker from "rc-color-picker";
import { hexToRgba, rgbaToHex } from "../utils/color";

export default ({
  rgbaColor = "rgba(255, 255, 255, 0)",
  onChange,
  ...props
}) => {
  // const background;
  const { hex, alpha } = rgbaToHex(rgbaColor);
  return (
    <ColorPicker
      alpha={alpha * 100}
      color={hex}
      onChange={({ color, alpha }) => {
        const rgba = hexToRgba(color, alpha / 100);
        onChange({
          rgbaColor: rgba,
          alpha,
          hexColor: color,
        });
      }}
      {...props}
    />
  );
};
