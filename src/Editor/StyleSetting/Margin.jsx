import React from "react";
import DirectionInput from "../Components/DirectionNumberInput";

export default ({
  marginTop,
  marginBottom,
  marginRight,
  marginLeft,
  onChange,
}) => {
  return (
    <DirectionInput
      {...{
        label: "边距",
        top: marginTop,
        bottom: marginBottom,
        left: marginLeft,
        right: marginRight,
        onChange: ({ top, left, right, bottom }) => {
          if (top !== undefined) {
            onChange({ marginTop: top });
          } else if (left !== undefined) {
            onChange({ marginLeft: left });
          } else if (right !== undefined) {
            onChange({ marginRight: right });
          } else if (bottom !== undefined) {
            onChange({ marginBottom: bottom });
          }
        },
      }}
    />
  );
};
