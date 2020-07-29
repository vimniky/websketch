import React from "react";
import { Input, Checkbox } from "antd";

export default ({ item, onChange, style = {} }) => {
  return (
    <div
      style={{
        marginTop: 5,
        display: "flex",
        alignItems: "center",
        ...style,
      }}
    >
      <div style={{ alignSelf: "flex-end" }}>
        <Checkbox
          onChange={(e) => {
            onChange({ ...item, disabled: !e.target.checked });
          }}
          checked={!item.disabled}
        />
      </div>
      <Input
        style={{
          width: 90,
          flexShrink: 0,
          flexGrow: 0,
          margin: "0 10px",
        }}
        value={item.key}
        size="small"
        onChange={(e) => {
          onChange({ ...item, key: e.target.value });
        }}
      />
      <Input
        size="small"
        value={item.value}
        onChange={(e) => {
          onChange({ ...item, value: e.target.value });
        }}
      />
    </div>
  );
};
