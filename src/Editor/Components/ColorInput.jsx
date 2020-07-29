import React, { useState, useEffect } from "react";
import { Input } from "antd";
import { isHashChar } from "../utils/color";

export default ({ style = {}, inputStyle, value = "", onChange, ...props }) => {
  const [color, setColor] = useState(value);

  useEffect(() => {
    setColor(value);
  }, [value]);

  return (
    <div style={{ position: "relative", ...style }}>
      <span
        style={{
          zIndex: 1,
          color: "#999",
          position: "absolute",
          top: 6,
          left: 4,
        }}
      >
        #
      </span>
      <Input
        style={{ paddingLeft: 14, ...inputStyle }}
        {...props}
        value={color}
        onChange={(e) => {
          const v = e.target.value.slice(0, 6);
          if (v.length <= color.length) {
            setColor(v);
            if (v.length === 3 || v.length === 6) {
              onChange(v);
            }
          } else {
            const lastCh = e.target.value[color.length];
            if (isHashChar(lastCh)) {
              setColor(v);
              if (v.length === 3 || v.length === 6) {
                onChange(v);
              }
            }
          }
        }}
      />
    </div>
  );
};
