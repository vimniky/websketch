import React from "react";
import { Select, Input, Switch } from "antd";
import CustomNumberInput from "../Components/CustomNumberInput";
import TextArea from "antd/lib/input/TextArea";
import { FunctionOutlined } from "@ant-design/icons";

export default ({ schema, $$props, onChange }) => {
  const { properties, required = [] } = schema;
  return Object.entries(properties).map(([propName, propSpec]) => {
    const { title, enum: _enum, default: _default, type } = propSpec;
    const prop = $$props[propName] === undefined ? _default : $$props[propName];
    const isRequired = required.indexOf(propName) !== -1;
    let elem = null;
    if (Array.isArray(_enum)) {
      elem = (
        <Select
          size="small"
          value={prop}
          style={{ width: "100%" }}
          onChange={(v) => {
            onChange({ [propName]: v });
          }}
        >
          {_enum.map((v) => (
            <Select.Option key={v} value={v}>
              {v}
            </Select.Option>
          ))}
        </Select>
      );
    } else if (type === "string") {
      if (propSpec["x-component"] === "textarea") {
        elem = (
          <TextArea
            size="small"
            value={prop}
            onChange={(e) => {
              onChange({ [propName]: e.target.value });
            }}
          />
        );
      } else {
        elem = (
          <Input
            size="small"
            value={prop}
            onChange={(e) => {
              onChange({ [propName]: e.target.value });
            }}
          />
        );
      }
    } else if (type === "number") {
      elem = (
        <CustomNumberInput
          value={prop}
          onChange={(v) => {
            onChange({ [propName]: v });
          }}
        />
      );
    } else if (type === "boolean") {
      elem = (
        <Switch
          checked={prop}
          onChange={(e) => {
            onChange({ [propName]: e.target.checked });
          }}
        />
      );
    } else {
      return "TODO";
    }
    return (
      <div
        key={propName}
        style={{
          display: "flex",
          marginBottom: 5,
          alignItems: "center",
          userSelect: "none",
        }}
      >
        <div style={{ width: 70, flexShrink: 0 }}>
          {title}
          <span style={{ color: "red" }}>{isRequired ? " *" : null}</span>
        </div>
        {elem}
        <FunctionOutlined
          style={{ marginLeft: 10, cursor: "pointer", color: "#1890ff" }}
        />
      </div>
    );
  });
};
