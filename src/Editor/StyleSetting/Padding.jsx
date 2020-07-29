import React from "react";
import DirectionInput from "../Components/DirectionNumberInput";

export default ({
  paddingTop,
  paddingBottom,
  paddingRight,
  paddingLeft,
  onChange,
}) => {
  return (
    <DirectionInput
      {...{
        top: paddingTop,
        bottom: paddingBottom,
        left: paddingLeft,
        right: paddingRight,
        onChange: ({ top, left, right, bottom }) => {
          if (top !== undefined) {
            onChange({ paddingTop: top });
          } else if (left !== undefined) {
            onChange({ paddingLeft: left });
          } else if (right !== undefined) {
            onChange({ paddingRight: right });
          } else if (bottom !== undefined) {
            onChange({ paddingBottom: bottom });
          }
        },
      }}
    />
  );
};
