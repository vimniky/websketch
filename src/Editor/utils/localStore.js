export default {
  get: (key) => {
    const value = localStorage.getItem(key);
    try {
      return JSON.parse(value);
    } catch (e) {
      console.error(e);
      return null;
    }
  },
  set: (key, value) => {
    try {
      value = JSON.stringify(value);
      localStorage.setItem(key, value);
    } catch (e) {
      console.error(e);
    }
  },
  remove: (key) => {
    localStorage.removeItem(key);
  },
};
