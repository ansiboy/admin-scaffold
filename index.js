"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getVirtualPaths = void 0;
const fs = require("fs");
const path = require("path");
const maishu_toolkit_1 = require("maishu-toolkit");
const errors_1 = require("./errors");
const sc = require("maishu-chitu-scaffold");
/** @param {string} [basePath]  */
function getVirtualPaths(basePath, targetPath) {
    let existsFilePaths = {};
    if (targetPath) {
        existsFilePaths = getFilePaths(targetPath);
    }
    let staticDir = path.join(__dirname, "static");
    let staticFilePaths = getFilePaths(staticDir);
    Object.assign(staticFilePaths, existsFilePaths);
    let scFiles = sc.getVirtualPaths(basePath, targetPath);
    staticFilePaths = Object.assign(scFiles, staticFilePaths);
    if (basePath) {
        let keys = Object.getOwnPropertyNames(staticFilePaths);
        for (let i = 0; i < keys.length; i++) {
            let path = maishu_toolkit_1.pathConcat(basePath, keys[i]);
            staticFilePaths[path] = staticFilePaths[keys[i]];
            delete staticFilePaths[keys[i]];
        }
    }
    return staticFilePaths;
}
exports.getVirtualPaths = getVirtualPaths;
function getFilePaths(dir) {
    if (path.isAbsolute(dir) == false)
        throw errors_1.errors.notPhysicalPath(dir);
    let r = {};
    let stack = new Array();
    stack.push("");
    while (stack.length > 0) {
        let relativePath = stack.pop();
        let p = path.join(dir, relativePath);
        let names = fs.readdirSync(p);
        for (let i = 0; i < names.length; i++) {
            let childPhysicalPath = path.join(p, names[i]);
            if (fs.statSync(childPhysicalPath).isFile()) {
                r[maishu_toolkit_1.pathConcat(relativePath, names[i])] = childPhysicalPath;
            }
            else {
                stack.push(maishu_toolkit_1.pathConcat(relativePath, names[i]));
            }
        }
    }
    return r;
}
