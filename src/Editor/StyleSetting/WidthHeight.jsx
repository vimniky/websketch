import React from "react";

import CustomNumberInput from "../Components/CustomNumberInput";

export default ({ style = {}, width, height, onChange }) => {
  return (
    <div style={{ display: "flex", ...style }}>
      <CustomNumberInput
        value={width}
        units={["px", "%"]}
        name="width"
        inputProps={{
          placeholder: "auto",
        }}
        inputPrefix="W"
        placeholder="auto"
        inputStyle={{ paddingLeft: 10 }}
        onChange={onChange}
      />
      <CustomNumberInput
        value={height}
        name="height"
        inputProps={{
          placeholder: "auto",
        }}
        inputPrefix="H"
        inputStyle={{ paddingLeft: 7 }}
        units={["px", "%"]}
        onChange={onChange}
      />
    </div>
  );
};
