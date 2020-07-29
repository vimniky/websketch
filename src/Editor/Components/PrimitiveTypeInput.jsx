import React, { useState } from "react";
import { Checkbox, Select, Input, Switch } from "antd";
import CustomNumberInput from "./CustomNumberInput";

export default ({
  style = {},
  data,
  onChange,
  keyLabel,
  valueLabel,
  index,
}) => {
  const [type, setType] = useState("string");
  const { key, value, disabled } = data;

  return (
    <div style={{ ...style }}>
      <div
        style={{
          display: "flex",
        }}
      >
        <div style={{ width: 75, marginRight: 10, flexShrink: 0 }}>
          #{index + 1}{" "}
          <Checkbox
            onChange={(e) => {
              onChange({ ...data, disabled: !e.target.checked });
            }}
            checked={disabled !== true}
          />
        </div>
        <Input
          placeholder={keyLabel}
          size="small"
          style={{ fontSize: 12, lineHeight: "22px" }}
          value={key}
          onChange={(e) => {
            onChange({ ...data, key: e.target.value });
          }}
        />
      </div>
      <div
        style={{
          display: "flex",
          marginTop: 5,
        }}
      >
        <Select
          value={type}
          size="small"
          style={{ width: 75, flexShrink: 0, marginRight: 10, fontSize: 12 }}
          onChange={(value) => {
            setType(value);
            onChange({ ...data, value: undefined });
          }}
        >
          {[
            { label: "字符串", value: "string" },
            { label: "布尔", value: "boolean" },
            { label: "数字", value: "number" },
          ].map((v) => (
            <Select.Option key={v.value} value={v.value}>
              {v.label}
            </Select.Option>
          ))}
        </Select>
        {type === "string" ? (
          <Input
            size="small"
            placeholder={valueLabel}
            style={{ fontSize: 12 }}
            value={value}
            onChange={(e) => {
              onChange({ ...data, value: e.target.value });
            }}
          />
        ) : type === "number" ? (
          <CustomNumberInput
            value={value}
            inputStyle={{ margin: 0 }}
            onChange={(value) => {
              onChange({ ...data, value });
            }}
          />
        ) : type === "boolean" ? (
          <Switch
            checked={value === true}
            onChange={(value) => {
              onChange({ ...data, value });
            }}
          />
        ) : null}
      </div>
    </div>
  );
};
