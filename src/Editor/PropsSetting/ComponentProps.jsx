import React from "react";
import * as schemaMap from "./ComponentPropsSchema/index";
import { useRecoilValue } from "recoil";
import { activeNodeState } from "../atoms";
import { useUpdateNodeProps } from "../useNodeActions";
import PropSchemaRender from "./PropSchemaRender";

export default ({ style = {} }) => {
  const activeNode = useRecoilValue(activeNodeState);
  const updateNodeProps = useUpdateNodeProps();
  const { name, $$props } = activeNode || {};
  const schema = schemaMap[name];
  if (!schema) return null;

  return (
    <div style={style}>
      <PropSchemaRender
        onChange={(v) => {
          updateNodeProps({ ...($$props || {}), ...v });
        }}
        schema={schema}
        $$props={$$props || {}}
      />
    </div>
  );
};
