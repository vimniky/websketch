import React from "react";
import NumberInput from "./NumberInput";
import { Menu, Dropdown, Tag } from "antd";
import { isPlainObject } from "lodash";

const Units = ({ units, unit, onChange }) => {
  const overlay = (
    <Menu
      selectedKeys={[unit]}
      onClick={({ key }) => {
        onChange(key);
      }}
    >
      {units.map((unit) => (
        <Menu.Item key={unit} title={unit}>
          {unit}
        </Menu.Item>
      ))}
    </Menu>
  );
  return (
    <Dropdown overlay={overlay}>
      <Tag style={{ borderRadius: 6, display: "flex" }}>{unit}</Tag>
    </Dropdown>
  );
};

export default ({
  value,
  label,
  name,
  onChange,
  units,
  simplifyPixelValue = true,
  style = {},
  labelStyle = {},
  inputStyle = {},
  showInputNumberHandler = true,
  inputProps = {},
  inputPrefix,
}) => {
  const showUnits = !!units && !!units.length;
  let unit;
  if (showUnits) {
    if (isPlainObject(value)) {
      unit = value.unit || units[0];
      value = value.value;
    } else {
      unit = units[0];
    }
  }

  const _onChange = (value, unit) => {
    if (value !== 0 && !value) {
      // Use the default;
      onChange({ [name]: "" });
    } else if (unit === "px" && simplifyPixelValue) {
      onChange({ [name]: value });
    } else {
      onChange({
        [name]: {
          value,
          unit,
          styleValue: `${value}${unit}`,
        },
      });
    }
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        ...style,
      }}
    >
      {!!label && (
        <label
          style={{
            userSelect: "none",
            flexShrink: 0,
            width: 60,
            ...labelStyle,
          }}
        >
          {label}
        </label>
      )}
      <div
        className={`${
          showInputNumberHandler
            ? "show-input-number-handler"
            : "hide-input-number-handler"
        }`}
        style={{
          width: "100%",
          position: "relative",
          display: "flex",
        }}
      >
        {!!inputPrefix && (
          <div
            style={{
              color: "#999",
              userSelect: "none",
              position: "absolute",
              top: 3,
              left: 8,
              zIndex: 2,
            }}
          >
            {inputPrefix}
          </div>
        )}
        <NumberInput
          size="small"
          style={{
            width: "100%",
            flexShrink: 1,
            margin: "0 4px",
            paddingRight: 20,
            ...inputStyle,
          }}
          {...inputProps}
          value={value}
          onChange={(value) => {
            if (showUnits) {
              _onChange(value, unit);
            } else {
              onChange(value);
            }
          }}
        />
        {showUnits && (
          <div
            style={{
              position: "absolute",
              transform: "scale(0.8)",
              right: 20,
              top: 1,
            }}
          >
            <Units
              units={units}
              unit={unit}
              onChange={(unit) => {
                _onChange(value, unit);
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};
