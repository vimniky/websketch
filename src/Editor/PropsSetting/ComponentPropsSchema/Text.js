export default {
  type: "object",
  properties: {
    // text: { type: "string", title: "文本", "x-component": "textarea" },
    text: { type: "string", title: "文本" },
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
