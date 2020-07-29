import React, { useState } from "react";
import {
  SettingOutlined,
  PlusOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { useRecoilState } from "recoil";

import { formSchemaState } from "../atoms";
import Expandable from "../Components/Expandable";
import CustomSelect from "../Components/CustomSelect";
import JsonSchemaEditor from "../Components/JsonSchemaEditor";
import CheckableSelectList from "../Components/CheckableSelectList";

const formSchemaList = [
  { id: 1, name: "文本输入框" },
  { id: 2, name: "素材心图片" },
  { id: 3, name: "选品" },
  { id: 4, name: "落地页地址选择宽" },
];
export default ({ style = {} }) => {
  const [editForm, setEditForm] = useState(undefined);
  const [formSchema, setFormSchema] = useRecoilState(formSchemaState);

  return (
    <>
      {editForm !== undefined && (
        <JsonSchemaEditor
          modalProps={{
            visible: editForm,
            title: (
              <CustomSelect
                label="表单: "
                selected={{}}
                list={formSchemaList}
              />
            ),
            onCancel: () => setEditForm(false),
          }}
        />
      )}
      <Expandable
        style={style}
        maxHeight={160}
        title={
          <>
            <SettingOutlined onClick={() => setEditForm(true)} />
            <span> 表单</span>
          </>
        }
        disableExpand={!formSchema.length}
        icons={[
          formSchema.some((item) => !!item.disabled) && (
            <DeleteOutlined
              onClick={() => {
                const nextFormSchema = formSchema.filter(
                  (item) => !item.disabled
                );
                setFormSchema(nextFormSchema);
              }}
            />
          ),
          <PlusOutlined
            style={{ cursor: "pointer" }}
            onClick={() => {
              setFormSchema([...formSchema, {}]);
            }}
          />,
        ]}
      >
        <CheckableSelectList
          selectProps={{ size: "small" }}
          list={formSchemaList}
          onChange={setFormSchema}
          selections={formSchema}
        />
      </Expandable>
    </>
  );
};
