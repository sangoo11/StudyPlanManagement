const normalizedPath = (path) =>
    path.replace(/\\/g, "/").replace(/^public\//, "");
  

module.exports = { normalizedPath };
