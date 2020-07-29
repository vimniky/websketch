import React from "react";
import CustomNumberInput from "../Components/CustomNumberInput";
import { Select, Radio } from "antd";

import CustomColorPicker from "../Components/CustomColorPicker";
import {
  AlignCenterOutlined,
  AlignLeftOutlined,
  AlignRightOutlined,
  MenuOutlined,
} from "@ant-design/icons";
export default ({
  style = {},
  sectionStyle,
  fontWeight,
  fontSize = 14,
  color = "rgba(0, 0, 0, 1)",
  textAlign = "left",
  lineHeight,
  onChange,
}) => {
  return (
    <div>
      <div style={{ alignItems: "center", display: "flex", ...sectionStyle }}>
        <div style={{ textAlign: "center" }}>
          <CustomNumberInput
            value={fontSize}
            name="fontSize"
            units={["px", "em"]}
            style={{ ...style }}
            onChange={onChange}
          />
          <div style={{ color: "#999", fontSize: "0.8em" }}>字体大小</div>
        </div>
        <div style={{ textAlign: "center" }}>
          <CustomNumberInput
            value={lineHeight}
            name="lineHeight"
            units={["px", "em"]}
            simplifyPixelValue={false}
            style={{ ...style }}
            onChange={onChange}
          />
          <div style={{ color: "#999", fontSize: "0.8em" }}>行高</div>
        </div>
      </div>
      <div style={{ alignItems: "center", display: "flex", ...sectionStyle }}>
        <div style={{ alignItems: "center", display: "flex", marginRight: 10 }}>
          <CustomColorPicker
            rgbaColor={color}
            onChange={({ rgbaColor }) => {
              onChange({
                color: rgbaColor,
              });
            }}
          />
        </div>
        <Select
          size="small"
          style={{ marginRight: 10, width: 80 }}
          defaultValue={400}
          value={fontWeight}
          onChange={(fontWeight) => {
            onChange({ fontWeight });
          }}
        >
          {[
            { label: "细", value: 200 },
            { label: "正常", value: 400 },
            { label: "稍粗", value: 500 },
            { label: "粗", value: 700 },
          ].map((v) => (
            <Select.Option key={v.value} value={v.value}>
              <span style={{ fontWeight: v.value }}>{v.label}</span>
            </Select.Option>
          ))}
        </Select>
        <Radio.Group
          options={[
            { label: <AlignLeftOutlined />, value: "left" },
            { label: <AlignCenterOutlined />, value: "center" },
            { label: <AlignRightOutlined />, value: "right" },
            { label: <MenuOutlined />, value: "Justify" },
          ]}
          size="small"
          optionType="button"
          buttonStyle="solid"
          value={textAlign}
          onChange={(e) => {
            onChange({ textAlign: e.target.value });
          }}
        />
      </div>
    </div>
  );
};
