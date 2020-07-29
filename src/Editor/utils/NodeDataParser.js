import isPlainObject from "lodash/isPlainObject";
import objectFilter from "./objectFilter";

export const styleParser = ($$style) => {
  const pairs = Object.entries($$style || {});

  const style = {};
  const len = pairs.length;
  for (let i = 0; i < len; i++) {
    const pair = pairs[i];
    const key = pair[0];
    const value = pair[1];
    if (isPlainObject(value)) {
      if (!value.disabled) {
        style[key] = value.styleValue || value.value;
      }
    } else {
      style[key] = value;
    }
  }
  return objectFilter(style);
};

export const customStyleParser = ($$customStyle) => {
  const style = ($$customStyle || []).reduce((acc, item) => {
    // style key and value are all string;
    if (item && item.key && item.value && !item.disabled) {
      acc[item.key] = item.value;
    }
    return acc;
  }, {});
  return objectFilter(style);
};

export const parseBoxShadow = ($$boxShadow) => {
  const { x, y, blur, spread, color, disabled = true } = $$boxShadow || {};

  if (disabled) {
    return "";
  }

  return `${x || 0}px ${y || 0}px ${blur || 0}px ${spread || 0}px ${
    color || "rgba(0,0,0,0.5)"
  }`;
};

export const propParser = ($$props) => {
  return styleParser($$props);
};

export const customPropsParser = ($$customProps) => {
  return $$customProps || {};
};

export const clickDotParser = customStyleParser;
