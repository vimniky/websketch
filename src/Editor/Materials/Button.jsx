/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import PropTypes from "prop-types";
import objectFilter from "./utils/objectFilter";

const Button = ({
  className,
  style,
  text,
  link,
  target,
  color,
  fontSize,
  fontWeight,
  borderRadius,
  padding,
  border,
  ...props
}) => {
  const _style = objectFilter({
    ...(style || {}),
    color,
    fontSize,
    fontWeight,
    borderRadius,
    padding,
    border,
  });

  const buttonStyle = {
    display: "inline-block",
    background: "#fff",
    boxShadow: "1px 1px 1px #ccc",
    cursor: "pointer",
    outline: "none",
    lineHeight: "1.5em",
    ..._style,
  };

  return link ? (
    <button
      className={className}
      onClick={() => {
        if (target === "self") {
          window.location = link;
        } else {
          window.open(link);
        }
      }}
      style={buttonStyle}
      {...props}
    >
      {text}
    </button>
  ) : (
    <button className={className} style={buttonStyle} {...props}>
      {text}
    </button>
  );
};

Button._name = "Button";

Button.defaultProps = {
  text: "Button",
  borderRadius: 20,
  padding: "0 10px",
  border: "none",
};

Button.propTypes = {
  text: PropTypes.string.isRequired,
  link: PropTypes.string,
  // support button size if needed
  size: PropTypes.oneOf(["default"]),
  target: PropTypes.oneOf(["_blank", "self"]),
  fontSize: PropTypes.number,
  color: PropTypes.string,
  borderRadius: PropTypes.number,
  padding: PropTypes.number,
  fontWeight: PropTypes.oneOf(["normal", "bold", 500, 200]),
};

export default Button;
