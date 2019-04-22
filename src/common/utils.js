export const getType = arg => Object.prototype.toString.call(arg).slice(8, -1);

export const assert = (condition, msg) => {
    if (!condition) throw new Error(msg)
  }