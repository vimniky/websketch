import React from "react";
import PropTypes from "prop-types";
import objectFilter from "./utils/objectFilter";

const singleLine = {
  textOverflow: "ellipsis",
  overflow: "hidden",
  whiteSpace: "nowrap",
};

const Text = ({
  text,
  link,
  style,
  lines = 1,
  target = "_blank",
  ...props
}) => {
  const _style = objectFilter({
    ...(style || {}),
    ...(lines === 1 ? singleLine : {}),
  });

  if (link) {
    return (
      <a href={link} target={target} style={_style} {...props}>
        {text}
      </a>
    );
  } else {
    return (
      <div {...props} style={_style}>
        {text}
      </div>
    );
  }
};
Text._name = "Text";

Text.defaultProps = {
  text: "Text",
  target: "_blank",
};

Text.propTypes = {
  text: PropTypes.string.isRequired,
  className: PropTypes.string,
  style: PropTypes.object,
  lines: PropTypes.number,
  link: PropTypes.string,
  target: PropTypes.oneOf(["_blank", "self"]),
};

export default Text;
