import React, { useRef, useEffect, useState } from "react";
import Ajv from "ajv";
import { Modal, Button } from "antd";
import localize_zh from "ajv-i18n/localize/zh";

window.ace.config.set(
  "basePath",
  "https://cdn.jsdelivr.net/npm/ace-builds@latest/src-noconflict/"
);

const createAceEditor = ($el) => {
  const editor = window.ace.edit($el);
  editor.setTheme("ace/theme/monokai");
  editor.session.setMode("ace/mode/json");
  editor.session.setTabSize(2);
  // aceValueEditor.current.renderer.setShowGutter(false);
  // editor.setReadOnly(true);
  // editor.session.on("change", (delta) => {
  //   console.log(editor.getValue());
  // });
  // editor.session.on("changeAnnotation", (delta) => {
  //   const annotations = editor.session.getAnnotations();
  //   if (!annotations.length) {
  //     const value = JSON.parse(editor.getValue());
  //   }
  // });
  return editor;
};
const _schema = {
  type: "object",
  properties: {
    foo: { type: "number" },
    bar: { type: "string", default: "baz" },
  },
  required: ["foo", "bar"],
};

const _style = {
  height: "calc(100vh - 210px)",
  overflow: "scroll",
  borderRadius: 4,
};

let ajv;
const Editor = ({ schema, onOk, onCancel }) => {
  const [syntaxErrors, setSyntaxErrors] = useState(null);
  const [schemaError, setSchemaError] = useState(null);
  const [validateErrors, setValidateErrors] = useState(null);

  const aceValueRef = useRef();
  const aceSchemaRef = useRef();
  const schemaEditor = useRef();
  const valueEditor = useRef();

  schema = schema || _schema;

  useEffect(() => {
    let as, av;

    if (!schemaEditor.current) {
      as = createAceEditor(aceSchemaRef.current);
      schemaEditor.current = as;
    }

    if (!ajv) {
      ajv = new Ajv({ removeAdditional: true, useDefaults: true });
    }

    as.session.on("changeAnnotation", (delta) => {
      setSyntaxErrors(null);
      setSchemaError(null);
      setValidateErrors(null);

      const annotations = as.session
        .getAnnotations()
        .filter((err) => err.type === "error");
      if (annotations.length) {
        setSyntaxErrors(annotations);
      } else {
        try {
          const schema = JSON.parse(as.getValue());
          const validate = ajv.compile(schema);
          const value = {};
          const valid = validate(value);
          const valueStr = JSON.stringify(value, null, 2);
          if (valid) {
            av.setValue(valueStr);
          } else {
            av.setValue(valueStr);
            localize_zh(validate.errors);
            setValidateErrors(validate.errors);
          }
        } catch (e) {
          setSchemaError(e.message);
        }
      }
    });

    if (!valueEditor.current) {
      av = createAceEditor(aceValueRef.current);
      valueEditor.current = av;
      // av.renderer.setShowGutter(false);
      av.setReadOnly(true);
    }

    const schemaStr = JSON.stringify(schema, null, 2);
    as.setValue(schemaStr);
  }, [schema]);

  return (
    <div>
      <div style={{ display: "flex", position: "relative" }}>
        <div
          style={{
            background: "rgba(100, 100, 100, .9)",
            width: 300,
            position: "absolute",
            boxShadow: "0 0 4px #aaa",
            borderRadius: 4,
            color: "#FFF",
            zIndex: 2,
            padding: 15,
            right: 0,
            bottom: 0,
          }}
        >
          {syntaxErrors ? (
            <div>
              {syntaxErrors.map((err, idx) => (
                <div key={idx}>
                  <div>
                    错误信息:{" "}
                    <span style={{ color: "rgba(255, 0, 0, .7)" }}>
                      {err.text}
                    </span>
                  </div>
                  <div>
                    行: {err.row}, 列: {err.column}
                  </div>
                </div>
              ))}
            </div>
          ) : schemaError ? (
            <span style={{ color: "rgba(255, 0, 0, .7)" }}>{schemaError}</span>
          ) : validateErrors ? (
            validateErrors.map((err, idx) => (
              <div key={idx}>
                <div>
                  错误信息:{" "}
                  <span style={{ color: "rgba(255, 0, 0, .7)" }}>
                    {err.message}
                  </span>
                </div>
                <div>Schema 路径: {err.schemaPath || "--"}</div>
                <div> Data 路径: {err.dataPath || "--"}</div>
              </div>
            ))
          ) : null}
        </div>
        <div
          style={{
            width: "50%",
            position: "relative",
            marginRight: 20,
            flexShrink: 0,
          }}
        >
          <div>Schema</div>
          <div style={{ width: "100%", ..._style }} ref={aceSchemaRef} />
        </div>
        <div style={{ width: "50%" }}>
          <div>默认值</div>
          <div style={{ width: "100%", ..._style }} ref={aceValueRef} />
        </div>
      </div>
      <div
        style={{
          marginTop: 20,
          borderTop: "1px solid #eee",
          paddingTop: 20,
          textAlign: "right",
        }}
      >
        <Button size="small" style={{ marginRight: 10 }} onClick={onCancel}>
          取消
        </Button>
        <Button
          size="small"
          style={{ marginRight: 10 }}
          disabled={!syntaxErrors && !schemaError && !validateErrors}
          type="primary"
          onClick={() => {
            const schema = JSON.parse(schemaEditor.current.getValue());
            const value = JSON.parse(valueEditor.current.getValue());
            onOk && onOk({ schema, value });
          }}
        >
          另存为
        </Button>
        <Button
          size="small"
          disabled={!syntaxErrors && !schemaError && !validateErrors}
          type="primary"
          onClick={() => {
            const schema = JSON.parse(schemaEditor.current.getValue());
            const value = JSON.parse(valueEditor.current.getValue());
            onOk && onOk({ schema, value });
          }}
        >
          保存
        </Button>
      </div>
    </div>
  );
};

export default ({ modalProps = {}, schema }) => {
  const { onOk, onCancel, ...restModalProps } = modalProps;
  return (
    <Modal
      style={{ top: 0, padding: 0, margin: 0 }}
      width={"100%"}
      onCancel={onCancel}
      {...restModalProps}
      footer={false}
      // closable={false}
    >
      <div style={{ height: "calc(100vh - 115px)", overflow: "scroll" }}>
        <Editor {...{ onOk, onCancel, schema }} />
      </div>
    </Modal>
  );
};
