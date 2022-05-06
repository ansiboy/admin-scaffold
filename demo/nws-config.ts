import { getVirtualPaths } from "../index";
import * as path from "path";
let virutalPaths = getVirtualPaths("/static", path.join(__dirname, "static"));
virutalPaths["node_modules"] = path.join(__dirname, "../node_modules");
console.log(virutalPaths);

module.exports = {
    "port": 5282,
    "virtualPaths": virutalPaths
}