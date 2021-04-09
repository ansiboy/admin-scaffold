"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sourceVirtualPaths = exports.getVirtualPaths = void 0;
const fs = require("fs");
const path = require("path");
const maishu_toolkit_1 = require("maishu-toolkit");
const errors_1 = require("./errors");
const sc = require("maishu-chitu-scaffold");
const maishu_node_mvc_1 = require("maishu-node-mvc");
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
    if (basePath) {
        let keys = Object.getOwnPropertyNames(staticFilePaths);
        for (let i = 0; i < keys.length; i++) {
            let path = maishu_toolkit_1.pathConcat(basePath, keys[i]);
            staticFilePaths[path] = staticFilePaths[keys[i]];
            delete staticFilePaths[keys[i]];
        }
    }
    staticFilePaths = Object.assign(scFiles, staticFilePaths);
    return staticFilePaths;
}
exports.getVirtualPaths = getVirtualPaths;
/**
 * 获取指定文件夹的文件相对路径
 * @param dir 指定的文件夹
 * @returns 文件的相对路径
 */
function getFilePaths(dir) {
    if (path.isAbsolute(dir) == false)
        throw errors_1.errors.notPhysicalPath(dir);
    let r = {};
    let stack = new Array();
    stack.push("/");
    while (true) {
        let relativePath = stack.pop();
        if (relativePath === undefined)
            break;
        let p = maishu_toolkit_1.pathConcat(dir, relativePath);
        let names = fs.readdirSync(p);
        for (let i = 0; i < names.length; i++) {
            let childPhysicalPath = maishu_toolkit_1.pathConcat(p, names[i]);
            let childRelativePath = maishu_toolkit_1.pathConcat(relativePath, names[i]);
            let state = fs.statSync(childPhysicalPath);
            if (state.isDirectory()) {
                stack.push(childRelativePath);
                continue;
            }
            if (state.isFile()) {
                r[maishu_toolkit_1.pathConcat(relativePath, names[i])] = childPhysicalPath;
            }
        }
    }
    return r;
}
function sourceVirtualPaths(rootDirectory) {
    let root = typeof rootDirectory == "string" ? new maishu_node_mvc_1.VirtualDirectory(rootDirectory) : rootDirectory;
    let ctVirtualFiles = sc.sourceVirtualPaths(__dirname);
    let staticDir = maishu_toolkit_1.pathConcat(__dirname, "static");
    let staticRelativeFiles = getFilePaths(staticDir);
    let items = Object.getOwnPropertyNames(staticRelativeFiles)
        .map(o => ({ relativePath: maishu_toolkit_1.pathConcat("static", o), physicalPath: staticRelativeFiles[o] }));
    let virtualFiles = {};
    for (let i = 0; i < items.length; i++) {
        if (root.findFile(items[i].relativePath))
            continue;
        virtualFiles[items[i].relativePath] = items[i].physicalPath;
    }
    virtualFiles = Object.assign({}, ctVirtualFiles, virtualFiles);
    return virtualFiles;
}
exports.sourceVirtualPaths = sourceVirtualPaths;
