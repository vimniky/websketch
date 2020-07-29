import { saveAs } from "file-saver";
import { getRootNodes } from "./editorLocalStore";

export default ({ name = "template.json" } = {}) => {
  const blob = new Blob([JSON.stringify(getRootNodes(), null, 2)]);
  saveAs(blob, name, { type: "text/plain;charset=utf-8" });
};
