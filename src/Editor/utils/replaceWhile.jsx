export default (list, item, predicator) => {
  const out = [];
  for (let i = 0; i < list.length; i++) {
    const ithItem = list[i];
    if (predicator(ithItem, item)) {
      out.push(item);
    } else {
      out.push(ithItem);
    }
  }
  return out;
};
