import React from "react";

import LibraryBasicItem from "./LibraryBasicItem";
import {
  FileImageOutlined,
  InboxOutlined,
  LinkOutlined,
  VideoCameraOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";

import "./Style.scss";
import { useRecoilValue } from "recoil";
import { nodeInactiveStyleState } from "../atoms";

export default ({ style = {} }) => {
  const nodeInactiveStyle = useRecoilValue(nodeInactiveStyleState);

  return (
    <div
      className="component-library"
      style={{ ...style, ...nodeInactiveStyle }}
    >
      <div className="library-category">
        <div className="library-category-title">基础组件</div>
        <LibraryBasicItem
          icon={
            <InboxOutlined
              style={{ paddingBottom: 6, transform: "scale(1.05)" }}
            />
          }
          title="容器"
          name="Container"
          shortcut="R"
          className="library-item"
        />
        <LibraryBasicItem
          icon="T"
          title={<span style={{ position: "relative", top: 1 }}>文本</span>}
          name="Text"
          shortcut="T"
          className="library-item"
        />
        <LibraryBasicItem
          icon={
            <FileImageOutlined
              style={{ paddingBottom: 6, transform: "scale(0.9)" }}
            />
          }
          title="图片"
          name="Image"
          shortcut=""
          className="library-item"
        />
        <LibraryBasicItem
          icon={<LinkOutlined style={{ paddingBottom: 6 }} />}
          title="链接"
          name="Link"
          shortcut=""
          className="library-item"
        />
        <LibraryBasicItem
          icon={<VideoCameraOutlined style={{ paddingBottom: 6 }} />}
          title="视屏"
          name="Video"
          shortcut=""
          className="library-item"
        />
        <LibraryBasicItem
          icon={<UnorderedListOutlined style={{ paddingBottom: 6 }} />}
          title="列表"
          name="List"
          shortcut=""
          className="library-item"
        />
      </div>
      <div className="library-category">
        <div className="library-category-title">布局组件</div>
      </div>
      <div className="library-category">
        <div className="library-category-title">高级组件</div>
      </div>
    </div>
  );
};
