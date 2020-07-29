import React from "react";

export default ({ style = {}, isActive, onClick }) => {
  const isRow = style.flexDirection === "row";
  const background = isActive ? "#1890ff" : "#888";
  const border = isActive ? "1px solid #1890ff" : "1px solid #888";
  const boxShadow = isActive ? "0px 0px 3px #999" : "none";

  if (isRow) {
    const marginRight = 2;
    const height = 4;
    return (
      <div
        style={{
          display: "flex",
          backgroundColor: "#ccc",
          alignItems: "center",
          justifyContent: "space-around",
          cursor: "pointer",
          border,
          boxShadow,
          ...style,
        }}
        onClick={onClick}
      >
        <div
          style={{
            width: "20%",
            height,
            background,
            marginRight,
          }}
        />
        <div
          style={{
            width: "20%",
            height,
            background,
            marginRight,
          }}
        />
        <div style={{ width: "20%", height, background }} />
      </div>
    );
  }

  const marginRight = 2;
  const itemWidth = 20;
  return (
    <div
      style={{
        display: "flex",
        backgroundColor: "#ccc",
        justifyContent: "space-between",
        cursor: "pointer",
        ...style,
        border,
        boxShadow,
        flexDirection: "row",
      }}
      onClick={onClick}
    >
      <div
        style={{
          width: itemWidth,
          height: "40%",
          background,
          marginRight,
        }}
      />
      <div
        style={{
          width: itemWidth,
          height: "50%",
          background,
          marginRight,
        }}
      />
      <div
        style={{
          width: itemWidth,
          height: "30%",
          background,
          marginRight,
        }}
      />
      <div
        style={{
          width: itemWidth,
          height: "60%",
          background,
        }}
      />
    </div>
  );
};
