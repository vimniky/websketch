import React, { useState } from "react";
import { Select } from "antd";

export default ({
  label,
  list,
  onChange,
  disableReselection = true,
  selections = [],
  selected,
  ...props
}) => {
  const [search, setSearch] = useState("");
  return (
    <div>
      {label}
      <Select
        style={{ minWidth: 200 }}
        showSearch
        allowClear
        placeholder="None"
        optionFilterProp="children"
        onChange={onChange}
        value={selected.id}
        onSearch={setSearch}
        {...props}
      >
        {list
          .filter(
            (item) =>
              `${item.name}`.toLowerCase().indexOf(search.toLowerCase()) !== -1
          )
          .map((item) => (
            <Select.Option
              disabled={
                disableReselection &&
                selected.id !== item.id &&
                !!selections.find((s) => s.id === item.id)
              }
              value={item.id}
              key={item.id}
            >
              {item.name}
            </Select.Option>
          ))}
      </Select>
    </div>
  );
};
