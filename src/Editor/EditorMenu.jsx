import React from "react";
import { Menu } from "antd";
import { useRecoilValue, useRecoilState } from "recoil";
import {
  activeNodeState,
  isPreviewModeState,
  isFullscreenModeState,
  showTemplateDataState,
} from "./atoms";
import {
  useRemoveNode,
  useMoveNodeToLeft,
  useMoveNodeToRight,
  useImportTemplate,
} from "./useNodeActions";
import {
  ArrowLeftOutlined,
  ArrowRightOutlined,
  DeleteOutlined,
  CheckOutlined,
} from "@ant-design/icons";
import downloadTemplate from "./utils/downloadTemplate";
import TemplateData from "./Components/TemplateDataScreen";

const { SubMenu } = Menu;

const menuItemStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  width: "100%",
};
const iconStyle = {
  marginRight: -10,
  transform: "scale(0.8)",
};

const getMenuItem = ({
  disabled,
  key,
  title,
  icon = null,
  Icon = null,
  shortcut = null,
}) => {
  return (
    <Menu.Item disabled={disabled} key={key}>
      <div style={menuItemStyle}>
        {title}
        {shortcut}
        {icon}
        {Icon && <Icon size="small" style={iconStyle} />}
      </div>
    </Menu.Item>
  );
};

export default ({ edit }) => {
  const activeNode = useRecoilValue(activeNodeState);
  const hasActiveNode = !!activeNode;
  const removeNode = useRemoveNode();
  const moveNodeToLeft = useMoveNodeToLeft();
  const moveNodeToRight = useMoveNodeToRight();
  const importTemplate = useImportTemplate();

  const [isPreviewMode, setIsPreviewMode] = useRecoilState(isPreviewModeState);
  const [showTemplateData, setShowTemplateData] = useRecoilState(
    showTemplateDataState
  );
  const [isFullscreenMode, setIsFullscreenMode] = useRecoilState(
    isFullscreenModeState
  );

  return (
    <>
      {showTemplateData && (
        <TemplateData
          toggleFullScreen={() => {
            setShowTemplateData(!showTemplateData);
          }}
        />
      )}
      <Menu
        onClick={(e) => {
          const key = e.key;
          if (key === "save:local") {
            downloadTemplate();
          } else if (key === "open:local") {
            importTemplate();
          } else if (key === "edit:remove") {
            removeNode();
          } else if (key === "edit:moveToLeft") {
            moveNodeToLeft();
          } else if (key === "edit:moveToRight") {
            moveNodeToRight();
          } else if (key === "view:preview") {
            setIsPreviewMode(!isPreviewMode);
          } else if (key === "view:fullscreen") {
            setIsFullscreenMode(!isFullscreenMode);
          } else if (key === "date:template") {
            setShowTemplateData(!showTemplateData);
          }
        }}
        className="editor-menu"
        selectedKeys={[]}
        mode="horizontal"
      >
        <SubMenu title="文件">
          <Menu.ItemGroup title="新建">
            <Menu.Item key="new:pc">PC 模板</Menu.Item>
            <Menu.Item key="new:app">APP 模板</Menu.Item>
          </Menu.ItemGroup>
          <Menu.ItemGroup title="打开">
            <Menu.Item key="open:open">打开</Menu.Item>
            <Menu.Item key="open:recent">打开最近</Menu.Item>
            <Menu.Item key="open:local">打开本地</Menu.Item>
          </Menu.ItemGroup>
          <Menu.ItemGroup title="保存">
            <Menu.Item key="save:save">保存</Menu.Item>
            <Menu.Item key="save:as">另存为</Menu.Item>
            <Menu.Item key="save:local">保存到本地</Menu.Item>
          </Menu.ItemGroup>
        </SubMenu>
        <SubMenu title="数据">
          <Menu.Item key="data:source">数据源</Menu.Item>
          <Menu.Item key="date:template">模板</Menu.Item>
          <Menu.Item key="date:form">表单</Menu.Item>
        </SubMenu>
        <SubMenu title="编辑">
          {[
            {
              key: "edit:remove",
              disabled: !hasActiveNode,
              title: "移除",
              Icon: DeleteOutlined,
            },
            {
              key: "edit:moveLeft",
              disabled: !hasActiveNode,
              title: "左移",
              Icon: ArrowLeftOutlined,
            },
            {
              key: "edit:moveRight",
              disabled: !hasActiveNode,
              title: "右移",
              Icon: ArrowRightOutlined,
            },
          ].map(getMenuItem)}
        </SubMenu>
        <SubMenu title="视图">
          {[
            {
              key: "view:preview",
              title: "预览",
              Icon: isPreviewMode ? CheckOutlined : null,
            },
            {
              key: "view:fullscreen",
              title: "全屏",
              Icon: isFullscreenMode ? CheckOutlined : null,
            },
            {
              key: "view:zenMode",
              title: "Zen Mode",
              disabled: true,
            },
          ].map(getMenuItem)}
        </SubMenu>
      </Menu>
    </>
  );
};
