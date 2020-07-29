export default {
  type: "object",
  properties: {
    text: { type: "string", title: "文本" },
    size: { type: "string", title: "大小", enum: ["small", "normal", "large"] },
    link: { type: "string", title: "链接" },
    target: {
      type: "string",
      title: "链接目标",
      enum: ["_blank", "target"],
      default: "_blank",
    },
  },
  required: ["text"],
};
