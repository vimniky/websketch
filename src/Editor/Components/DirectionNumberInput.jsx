import React from "react";
import CustomNumberInput from "./CustomNumberInput";

const width = 72;
export default ({ top, left, bottom, right, onChange, label, style = {} }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: 10,
        paddingTop: 10,
        ...style,
      }}
    >
      <CustomNumberInput
        showInputNumberHandler={false}
        inputStyle={{ width }}
        value={top}
        onChange={(top) => onChange({ top })}
      />
      <div style={{ display: "flex", alignItems: "center", margin: "5px 0" }}>
        <CustomNumberInput
          showInputNumberHandler={false}
          inputStyle={{ width }}
          value={left}
          onChange={(left) => onChange({ left })}
        />
        <div style={{ width, flexShrink: 0, textAlign: "center" }}>{label}</div>
        <CustomNumberInput
          showInputNumberHandler={false}
          value={right}
          onChange={(right) => onChange({ right })}
        />
      </div>
      <CustomNumberInput
        showInputNumberHandler={false}
        inputStyle={{ width }}
        value={bottom}
        onChange={(bottom) => onChange({ bottom })}
      />
    </div>
  );
};
