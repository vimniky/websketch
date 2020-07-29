export default function (data = {}, cb) {
  const { base64, url } = data;
  if (base64) {
    const img = document.createElement("img");
    img.src = url;
    img.setAttribute("crossOrigin", "Anonymous");
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0, img.width, img.height);
      const dataURL = canvas.toDataURL("image/png");
      cb && cb(dataURL);
    };
  } else {
    cb && cb(url);
  }
}
