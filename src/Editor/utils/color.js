export const hashCharIndex = [..."0123456789abcdef"].reduce((acc, ch, idx) => {
  acc[ch] = idx;
  return acc;
}, {});

export const isHashChar = (ch) => hashCharIndex[ch] !== undefined;

export const hexToRgba = (hash, alpha = 1) => {
  const values = [0, 0, 0, alpha];

  if (!hash) {
    return "rgba(0,0,0,1)";
  }

  if (hash.startsWith("#")) {
    hash = hash.substr(1);
  }

  hash = [...hash];

  if (hash.length === 3) {
    [...hash].forEach((ch, idx) => {
      values[idx] = hashCharIndex[ch] * 16 + hashCharIndex[ch];
    });
  } else if (hash.length === 6) {
    values[0] = hashCharIndex[hash[0]] * 16 + hashCharIndex[hash[1]];
    values[1] = hashCharIndex[hash[2]] * 16 + hashCharIndex[hash[3]];
    values[2] = hashCharIndex[hash[4]] * 16 + hashCharIndex[hash[5]];
  }

  return `rgba(${values.join(",")})`;
};

export const rgbaToHex = (rgba) => {
  const sep = rgba.indexOf(",") > -1 ? "," : " ";
  rgba = rgba.substr(5).split(")")[0].split(sep);

  const alpha = rgba[3] || 1;
  const rgb = rgba.slice(0, 3);

  const hex = rgb
    .map((v) => {
      let ch = (+v || 0).toString(16);
      if (ch.length === 1) ch = `0${ch}`;
      return ch;
    })
    .join("");

  return { hex: `#${hex}`, alpha };
};
