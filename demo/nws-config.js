"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../index");
const path = require("path");
let virutalPaths = (0, index_1.getVirtualPaths)("/static", path.join(__dirname, "static"));
virutalPaths["node_modules"] = path.join(__dirname, "../node_modules");
console.log(virutalPaths);
module.exports = {
    "port": 5282,
    "virtualPaths": virutalPaths
};
