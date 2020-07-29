import React from "react";

import "./Style.scss";
import ClickDot from "./ClickDot";
import DataSource from "./DataSource";
import FormSchema from "./FormSchema";
import { useRecoilValue } from "recoil";
import { nodeInactiveStyleState } from "../atoms";
import CustomProps from "./CustomProps";
import ComponentProps from "./ComponentProps";

const sectionStyle = {
  marginBottom: 10,
  paddingBottom: 10,
  borderBottom: "1px solid #DBDBDB",
};

export default ({ style = {} }) => {
  const nodeInactiveStyle = useRecoilValue(nodeInactiveStyleState);
  return (
    <div
      className="component-data-settings"
      style={{
        ...style,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <div style={{ ...nodeInactiveStyle }}>
        <ComponentProps style={sectionStyle} />
        <CustomProps style={sectionStyle} />
        <ClickDot style={sectionStyle} />
      </div>
      <div>
        <FormSchema style={sectionStyle} />
        <DataSource style={sectionStyle} />
      </div>
    </div>
  );
};
