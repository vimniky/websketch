import React from "react";
import { ConfigProvider } from "antd";
import zh_CN from "antd/es/locale/zh_CN";
import "antd/dist/antd.css";
import { RecoilRoot } from "recoil";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useHistory,
  useLocation,
} from "react-router-dom";
import { Menu, Layout } from "antd";

import "./App.scss";
import EditorMenu from "./Editor/EditorMenu";
import Editor from "./Editor/Index.jsx";

const { Header } = Layout;

const prefix = "";
const path = Object.entries({
  index: "/",
  templateList: "/templateList",
  dataSource: "/dataSource",
  form: "/form",
  docs: "/docs",
}).reduce(
  (acc, [k, v]) => ({
    ...acc,
    [k]: prefix + v,
  }),
  {}
);

const Pages = () => {
  const location = useLocation();
  const history = useHistory();
  return (
    <>
      <Header style={{ paddingLeft: 0 }}>
        <EditorMenu />
        <Menu
          theme="light"
          subMenuCloseDelay
          mode="horizontal"
          selectedKeys={[location.pathname || path.createTemplate]}
          onClick={({ key }) => {
            history.push(key);
          }}
        >
          <Menu.Item key={path.index}>首页</Menu.Item>
          <Menu.Item key={path.templateList}>模板中心</Menu.Item>
          <Menu.Item key={path.dataSource}>数据源</Menu.Item>
          <Menu.Item key={path.form}>表单</Menu.Item>
          <Menu.Item key={path.docs}>帮助</Menu.Item>
        </Menu>
      </Header>
      <Switch>
        <Route component={Editor} exact path="/" />
        <Route component={Editor} path="/new" />
      </Switch>
    </>
  );
};

function App() {
  return (
    <RecoilRoot>
      <div className="App">
        <ConfigProvider locale={zh_CN}>
          <Router>
            <Pages />
          </Router>
        </ConfigProvider>
      </div>
    </RecoilRoot>
  );
}

export default App;
