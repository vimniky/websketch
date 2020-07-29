import React, { useState } from "react";
import { useRecoilState } from "recoil";
import {
  SettingOutlined,
  PlusOutlined,
  DeleteOutlined,
} from "@ant-design/icons";

import { dataSourceSchemaState } from "../atoms";
import Expandable from "../Components/Expandable";
import CustomSelect from "../Components/CustomSelect";
import JsonSchemaEditor from "../Components/JsonSchemaEditor";
import CheckableSelectList from "../Components/CheckableSelectList";

const dataSourceList = [
  { id: 1, name: "PC主搜问鼎数据源" },
  { id: 2, name: "APP主搜问鼎数据源" },
  { id: 3, name: "PC主搜顶展数据源" },
  { id: 4, name: "APP主搜顶展数据源" },
];

export default ({ style = {} }) => {
  const [editDataSource, setEditDataSource] = useState(undefined);
  const [dataSourceSchema, setDataSourceSchema] = useRecoilState(
    dataSourceSchemaState
  );
  return (
    <>
      {editDataSource !== undefined && (
        <JsonSchemaEditor
          modalProps={{
            visible: editDataSource,
            title: (
              <CustomSelect
                label="数据源: "
                selected={{}}
                list={dataSourceList}
              />
            ),
            onCancel: () => setEditDataSource(false),
          }}
        />
      )}
      {/* Data Source */}
      <Expandable
        style={style}
        maxHeight={120}
        title={
          <>
            <SettingOutlined onClick={() => setEditDataSource(true)} />
            <span> 数据源</span>
          </>
        }
        disableExpand={!dataSourceSchema.length}
        icons={[
          dataSourceSchema.some((item) => !!item.disabled) && (
            <DeleteOutlined
              onClick={() => {
                const nextDataSource = dataSourceSchema.filter(
                  (item) => !item.disabled
                );
                setDataSourceSchema(nextDataSource);
              }}
            />
          ),
          <PlusOutlined
            style={{ cursor: "pointer" }}
            onClick={() => {
              setDataSourceSchema([...dataSourceSchema, {}]);
            }}
          />,
        ]}
      >
        <CheckableSelectList
          selectProps={{ size: "small" }}
          list={dataSourceList}
          onChange={setDataSourceSchema}
          selections={dataSourceSchema}
        />
      </Expandable>
    </>
  );
};
