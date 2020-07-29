import React from "react";

import CheckableKeyValueInput from "./CheckableKeyValueInput";
import replaceWhile from "../utils/replaceWhile";

export default ({ list, keyLabel, valueLabel, onChange }) => {
  return (
    <>
      {list.length > 0 && (
        <div style={{ marginTop: 10 }}>
          <div
            style={{
              marginLeft: 24,
              display: "flex",
              color: "#999",
              fontSize: "0.8em",
              userSelect: "none",
            }}
          >
            <div style={{ width: 90, marginRight: 10, paddingLeft: 4 }}>
              {keyLabel}
            </div>
            <div style={{ paddingLeft: 4 }}>{valueLabel}</div>
          </div>
          {list.map((item) => (
            <CheckableKeyValueInput
              key={item.id}
              item={item}
              onChange={(item) => {
                const nextList = replaceWhile(
                  list,
                  item,
                  (ithItem) => ithItem.id === item.id
                );
                onChange(nextList);
              }}
            />
          ))}
        </div>
      )}
    </>
  );
};
