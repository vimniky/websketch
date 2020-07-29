import React, { useState, useEffect, useRef } from "react";
import { RightOutlined } from "@ant-design/icons";

export default ({
  style = {},
  title,
  children,
  defaultExpand = false,
  disableExpand = false,
  icons = [],
  maxHeight,
}) => {
  const didMountRef = useRef(false);
  const [expand, setExpand] = useState(defaultExpand);
  icons = icons.filter((icon) => !!icon);

  useEffect(() => {
    if (didMountRef.current) {
      setExpand(!disableExpand);
    } else {
      didMountRef.current = true;
    }
  }, [disableExpand]);

  return (
    <div style={style}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <span style={{ userSelect: "none" }}>{title}</span>
        <div style={{ color: "#666" }}>
          {!!icons &&
            !!icons.length &&
            icons.map((icon, idx) => (
              <span key={idx} style={{ cursor: "pointer", marginLeft: 5 }}>
                {icon}
              </span>
            ))}
          {!disableExpand && (
            <RightOutlined
              onClick={() => {
                if (!disableExpand) {
                  setExpand(!expand);
                }
              }}
              style={{
                marginLeft: 5,
                cursor: disableExpand ? "not-allowed" : "pointer",
                transform: `rotate(${expand ? "90deg" : "0deg"})`,
                transition: "transform 0.1s",
                color: disableExpand ? "#999" : "#666",
              }}
            />
          )}
        </div>
      </div>
      {maxHeight && expand ? (
        <div style={{ maxHeight, overflow: "scroll" }}>{children}</div>
      ) : expand ? (
        children
      ) : null}
    </div>
  );
};
