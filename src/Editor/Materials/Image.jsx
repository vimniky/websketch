/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import PropTypes from "prop-types";
import objectFilter from "./utils/objectFilter";
import BaseImg from "./BaseImg";

// layout 从layout节点传过来
const Image = ({
  style,
  url,
  link,
  target,
  borderRadius,
  layout = {},
  base64,
  background,
  ...props
}) => {
  layout = layout || {};

  const _style = objectFilter({
    display: "block",
    width: layout.width || "100%",
    height: layout.height || "auto",
    background,
    borderRadius,
    ...(style || {}),
  });

  return !!link ? (
    <a
      style={{ display: "block" }}
      href={link}
      target={target || "_blank"}
      {...props}
    >
      <BaseImg base64={!!base64} style={_style} src={url} {...props} />
    </a>
  ) : (
    <BaseImg base64={!!base64} style={_style} src={url} {...props} />
  );
};

Image._name = "Image";

Image.defaultProps = {
  url: "https://img.alicdn.com/tfs/TB1Ir1RKKT2gK0jSZFvXXXnFXXa-500-500.png",
  target: "_blank",
};

Image.propTypes = {
  url: PropTypes.string.isRequired,
  link: PropTypes.string,
  background: PropTypes.string,
  borderRadius: PropTypes.number,
  target: PropTypes.oneOf(["_blank", "self"]),
};

export default Image;
