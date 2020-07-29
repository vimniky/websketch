import React, { useState } from "react";
import { CaretRightFilled } from "@ant-design/icons";

export default ({
  style = {},
  labelPrefix,
  labelSuffix,
  children,
  labelStyle = {},
  labelPrefixStyle = {},
  defaultValue = false,
  onChange = () => {},
  value,
}) => {
  let showMore, setShowMore;
  const controlled = typeof value === "boolean";
  if (controlled) {
    setShowMore = onChange;
  } else {
    [showMore, setShowMore] = useState(defaultValue);
  }

  return (
    <div style={{ ...style }}>
      <div
        style={{
          display: "flex",
          userSelect: "none",
          alignItems: "center",
          ...labelStyle,
        }}
      >
        <div style={labelPrefixStyle}>
          {labelPrefix}
          <CaretRightFilled
            style={{
              transform: `rotate(${showMore ? "90deg" : "0"})`,
              transition: "transform 0.1s",
            }}
            onClick={() => setShowMore(!showMore)}
          />
        </div>
        {labelSuffix}
      </div>
      {(controlled ? value : showMore) && children}
    </div>
  );
};
