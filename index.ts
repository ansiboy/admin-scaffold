import * as  fs from "fs";
import * as path from "path";
import { pathConcat } from "maishu-toolkit";
import { errors } from "./errors";
import * as sc from "maishu-chitu-scaffold";
import { Settings, VirtualDirectory, startServer as baseStartServer } from "maishu-node-mvc";
import { STATIC } from "./common";

/** @param {string} [basePath]  */
export function getVirtualPaths(basePath?: string, targetPath?: string) {
    let existsFilePaths: ReturnType<typeof getFilePaths> = {};
    if (targetPath) {
        existsFilePaths = getFilePaths(targetPath);
    }

    let staticDir = path.join(__dirname, STATIC);
    let staticFilePaths = getFilePaths(staticDir);
    Object.assign(staticFilePaths, existsFilePaths);

    let scFiles = sc.getVirtualPaths(basePath, targetPath);
    if (basePath) {
        let keys = Object.getOwnPropertyNames(staticFilePaths);
        for (let i = 0; i < keys.length; i++) {
            let path = pathConcat(basePath, keys[i]);
            staticFilePaths[path] = staticFilePaths[keys[i]];
            delete staticFilePaths[keys[i]]
        }
    }
    staticFilePaths = Object.assign(scFiles, staticFilePaths);
    return staticFilePaths;
}

/**
 * 获取指定文件夹的文件相对路径
 * @param dir 指定的文件夹
 * @returns 文件的相对路径
 */
function getFilePaths(dir: string): { [key: string]: string } {
    if (path.isAbsolute(dir) == false)
        throw errors.notPhysicalPath(dir);

    let r: ReturnType<typeof getFilePaths> = {};
    let stack = new Array<string>();
    stack.push("/");

    while (true) {
        let relativePath = stack.pop();
        if (relativePath === undefined)
            break;

        let p = pathConcat(dir, relativePath);
        let names = fs.readdirSync(p);
        for (let i = 0; i < names.length; i++) {

            let childPhysicalPath = pathConcat(p, names[i]);
            let childRelativePath = pathConcat(relativePath, names[i]);
            let state = fs.statSync(childPhysicalPath);
            if (state.isDirectory()) {
                stack.push(childRelativePath);
                continue;
            }

            if (state.isFile()) {
                r[pathConcat(relativePath, names[i])] = childPhysicalPath;
            }
        }
    }

    return r;
}

export function sourceVirtualPaths(rootDirectory: string | VirtualDirectory) {

    let root = typeof rootDirectory == "string" ? new VirtualDirectory(rootDirectory) : rootDirectory;

    let ctVirtualFiles = sc.sourceVirtualPaths(__dirname);

    let staticDir = pathConcat(__dirname, STATIC);
    let staticRelativeFiles = getFilePaths(staticDir);
    let items = Object.getOwnPropertyNames(staticRelativeFiles)
        .map(o => ({ relativePath: pathConcat(STATIC, o), physicalPath: staticRelativeFiles[o] }));

    let virtualFiles: { [key: string]: string } = {};
    for (let i = 0; i < items.length; i++) {
        if (root.findFile(items[i].relativePath))
            continue;

        virtualFiles[items[i].relativePath] = items[i].physicalPath;
    }

    virtualFiles = Object.assign({}, ctVirtualFiles, virtualFiles);

    return virtualFiles;
}

export function startServer(settings: Settings) {
    baseStartServer(settings);
}

