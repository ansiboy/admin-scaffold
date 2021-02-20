const { getVirtualPaths } = require("../index");
const path = require("path");
let virutalPaths = getVirtualPaths(null, __dirname);
virutalPaths["node_modules"] = path.join(__dirname, "../node_modules");
console.log(virutalPaths);
module.exports = {
    "port": 5282,
    "virtualPaths": virutalPaths
}