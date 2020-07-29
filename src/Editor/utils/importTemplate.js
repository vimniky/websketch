export default (onSuccess) => {
  const input = document.createElement("input");
  input.type = "file";
  input.setAttribute("accept", ".json");
  input.onchange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsText(file, "UTF-8");

    // TODO: Data validation and  error handling
    reader.onload = (readerEvent) => {
      let content = readerEvent.target.result;
      try {
        content = JSON.parse(content);
        onSuccess(content);
      } catch (e) {
        console.error(e);
      }
    };
  };
  input.click();
};
