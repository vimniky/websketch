import React, { useRef, useEffect } from "react";

const createAceEditor = ($el) => {
  const editor = window.ace.edit($el);
  editor.setTheme("ace/theme/monokai");
  editor.session.setMode("ace/mode/json");
  editor.session.setTabSize(2);
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

const createJsonEditor = ($el, schema) => {
  const editor = new window.JSONEditor($el, {
    iconlib: "fontawesome5",
    theme: "bootstrap4",
    // compact: true,
    object_layout: "table",
    disable_edit_json: true,
    disable_properties: true,
    enable_array_copy: true,
    prompt_before_delete: false,
    remove_button_label: true,
    // disable_collapse: true,
    disable_array_delete_last_row: true,
    schema,
  });
  return editor;
};

const _style = {
  height: "calc(100vh - 160px)",
  overflow: "scroll",
  borderRadius: 4,
};

export default ({ style = {}, schema }) => {
  const ref = useRef();
  const aceValueRef = useRef();
  const aceSchemaRef = useRef();
  const jsonEditor = useRef();
  const aceSchemaEditor = useRef();
  const aceValueEditor = useRef();
  schema = schema || _schema;
  useEffect(() => {
    // editor.getValue();
    // editor.schema();
    if (!jsonEditor.current) {
      jsonEditor.current = createJsonEditor(ref.current, schema);
    }

    if (!aceSchemaEditor.current) {
      aceSchemaEditor.current = createAceEditor(aceSchemaRef.current);
      aceValueEditor.current = createAceEditor(aceValueRef.current);
      const schemaStr = JSON.stringify(schema, null, 2);
      const valueStr = JSON.stringify(jsonEditor.current.getValue(), null, 2);
      aceValueEditor.current.setReadOnly(true);
      aceValueEditor.current.renderer.setShowGutter(false);
      aceSchemaEditor.current.setValue(schemaStr);
      aceValueEditor.current.setValue(valueStr);

      // aceSchemaEditor.current.session.on("change", (delta) => {
      //   console.log("delta", delta);
      // });
      aceSchemaEditor.current.session.on("changeAnnotation", (delta) => {
        const annotations = aceSchemaEditor.current.session.getAnnotations();
        if (!annotations.length) {
          const value = JSON.parse(aceSchemaEditor.current.getValue());
          jsonEditor.current.destroy();
          jsonEditor.current = createJsonEditor(ref.current, value);
          jsonEditor.current.on("change", () => {
            const value = jsonEditor.current.getValue();
            aceValueEditor.current.setValue(JSON.stringify(value, null, 2));
            console.log("value", value);
          });
          console.log(value);
        }
      });
      // aceValueEditor.current.session.on("changeAnnotation", (delta) => {
      //   const annotations = aceSchemaEditor.current.session.getAnnotations();
      //   if (!annotations.length) {
      //     const value = JSON.parse(aceValueEditor.current.getValue());
      //     jsonEditor.current.setValue(value);
      //     console.log(value);
      //   }
      // });
    }
  }, [schema]);

  return (
    <div style={{ display: "flex", ...style }}>
      <div style={{ width: "25%", ..._style }} ref={aceValueRef}></div>
      <div style={{ width: "35%", ..._style }} ref={aceSchemaRef}></div>
      <div style={{ width: "40%", ..._style, marginLeft: 20 }} ref={ref} />
    </div>
  );
};
