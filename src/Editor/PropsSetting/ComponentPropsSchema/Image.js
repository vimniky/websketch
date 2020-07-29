export default {
  type: "object",
  properties: {
    url: { type: "string", title: "图片地址" },
    link: { type: "string", title: "图片链接" },
    target: {
      type: "string",
      title: "链接目标",
      enum: ["_blank", "self"],
      default: "_blank",
    },
  },
  required: ["url"],
};
