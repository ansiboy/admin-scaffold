const { sourceVirtualPaths } = require("../index");
const path = require("path");
let virutalPaths = sourceVirtualPaths(__dirname);
virutalPaths["node_modules"] = path.join(__dirname, "../node_modules");
console.log(virutalPaths);
module.exports = {
    "port": 5282,
    "virtualPaths": virutalPaths
}