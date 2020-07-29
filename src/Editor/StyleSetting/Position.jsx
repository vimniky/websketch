import React from "react";
import DirectionInput from "../Components/DirectionNumberInput";
import CustomNumberInput from "../Components/CustomNumberInput";

export default ({ zIndex, top, bottom, right, left, onChange }) => {
  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <div style={{ paddingTop: 8 }}>z Index</div>
        <CustomNumberInput
          style={{ marginTop: 10, width: 80 }}
          value={zIndex}
          onChange={(zIndex) => {
            onChange({ zIndex });
          }}
        />
      </div>
      <DirectionInput
        {...{
          label: "定位",
          top,
          bottom,
          left,
          right,
          onChange,
        }}
      />
    </div>
  );
};
