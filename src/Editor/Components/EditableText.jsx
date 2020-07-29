import React, { useState, useEffect, useRef } from "react";

export default ({ style = {}, text, onChange }) => {
  const [editing, setEditing] = useState(false);
  const [localText, setLocalText] = useState(text);
  const inputRef = useRef(null);
  useEffect(() => {
    if (text !== localText) {
      setLocalText(text);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text]);

  if (!editing) {
    return (
      <div
        style={{ userSelect: "none", ...style }}
        onDoubleClick={() => {
          setEditing(true);
          setTimeout(() => {
            if (inputRef.current) {
              inputRef.current.focus();
            }
          }, 0);
        }}
      >
        {localText}
      </div>
    );
  }
  return (
    <input
      ref={inputRef}
      onKeyUp={(e) => {
        if (e.keyCode === 13) {
          inputRef.current.blur();
          setEditing(false);
        }
      }}
      style={{
        display: "block",
        outline: "none",
        boxShadow: "none",
        background: "#fff",
        color: editing ? "#333" : "#fff",
        border: "none",
        margin: 0,
        borderRadius: 2,
        ...style,
      }}
      onBlur={() => {
        setEditing(false);
        onChange(localText);
      }}
      value={localText}
      onChange={(e) => {
        setLocalText(e.target.value);
      }}
    />
  );
};
