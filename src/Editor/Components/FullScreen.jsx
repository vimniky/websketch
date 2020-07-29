import React from "react";
import { FullscreenExitOutlined } from "@ant-design/icons";

export default ({ children, toggleFullScreen }) => {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        background: "rgba(0, 0, 0, 1)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        zIndex: 999,
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 10,
          right: 20,
          color: "#fff",
          fontSize: 30,
          cursor: "pointer",
        }}
      >
        <FullscreenExitOutlined onClick={toggleFullScreen} />
      </div>
      <div style={{ padding: "60px 20px 20px 20px", overflow: "scroll" }}>
        {children}
      </div>
    </div>
  );
};
