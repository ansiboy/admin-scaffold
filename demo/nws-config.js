const { getVirtualPaths } = require("../index");
// const { getVirtualPaths } = require("maishu-chitu-scaffold");
const path = require("path");
let virutalPaths = getVirtualPaths("static"); // sourceVirtualPaths(__dirname);
virutalPaths["node_modules"] = path.join(__dirname, "../node_modules");
console.log(virutalPaths);
module.exports = {
    "port": 5282,
    "virtualPaths": virutalPaths
}