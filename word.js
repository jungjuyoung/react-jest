function woof(str) {
  if (typeof str !== "string") {
    throw Error("Must Be a string");
    return null;
  }
  return `${str}`;
}

module.exports = woof;
