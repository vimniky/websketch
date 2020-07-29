import React from "react";

import CustomSelect from "./CustomSelect";
import { Checkbox } from "antd";

export default ({ list, selections, onChange, style, selectProps = {} }) => {
  const items = selections.map((selected, idx) => (
    <div
      key={selected.id || idx}
      style={{
        display: "flex",
        alignItems: "flex-end",
        marginBottom: 5,
      }}
    >
      <Checkbox
        style={{ marginRight: 10 }}
        checked={!selected.disabled}
        onChange={(e) => {
          const newItem = { ...selected, disabled: !e.target.checked };
          onChange([
            ...selections.slice(0, idx),
            newItem,
            ...selections.slice(idx + 1),
          ]);
        }}
      />
      <CustomSelect
        list={list}
        selections={selections}
        selected={selected}
        {...selectProps}
        onChange={(id) => {
          const selectedItem = list.find((item) => item.id === id);
          onChange([
            ...selections.slice(0, idx),
            selectedItem,
            ...selections.slice(idx + 1),
          ]);
        }}
      />
    </div>
  ));

  return <div style={{ marginTop: 10, ...style }}>{items}</div>;
};
