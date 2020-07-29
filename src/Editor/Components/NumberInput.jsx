import React from "react";
import { InputNumber } from "antd";

export default ({ onChange, ...props }) => {
  let touched = false;

  props = {
    ...props,
    onChange: (v) => {
      touched = true;
      onChange && onChange(v, touched);
    },
  };

  return <InputNumber {...props} />;
};
