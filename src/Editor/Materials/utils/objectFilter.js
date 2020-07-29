export default (obj, omitList = ["undefined", "", null, NaN]) => {
  if (!Array.isArray(omitList)) {
    omitList = [omitList];
  }

  const out = {};
  Object.entries(obj).forEach(([key, value]) => {
    const isOmit = omitList.some((v) => value === v);
    if (!isOmit) {
      out[key] = value;
    }
  });
  return out;
};
