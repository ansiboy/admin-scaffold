import * as  fs from "fs";
import * as path from "path";
import { pathConcat } from "maishu-toolkit";
import { errors } from "./errors";
import * as sc from "maishu-chitu-scaffold";

/** @param {string} [basePath]  */
export function getVirtualPaths(basePath?: string, targetPath?: string) {
    let existsFilePaths: ReturnType<typeof getFilePaths> = {};
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
            let path = pathConcat(basePath, keys[i]);
            staticFilePaths[path] = staticFilePaths[keys[i]];
            delete staticFilePaths[keys[i]]
        }
    }

    return staticFilePaths;
}

function getFilePaths(dir: string): { [key: string]: string } {
    if (path.isAbsolute(dir) == false)
        throw errors.notPhysicalPath(dir);

    let r: ReturnType<typeof getFilePaths> = {};
    let stack = new Array<string>();
    stack.push("");

    while (stack.length > 0) {
        let relativePath = stack.pop();
        let p = path.join(dir, relativePath);
        let names = fs.readdirSync(p);
        for (let i = 0; i < names.length; i++) {
            let childPhysicalPath = path.join(p, names[i]);
            if (fs.statSync(childPhysicalPath).isFile()) {
                r[pathConcat(relativePath, names[i])] = childPhysicalPath;
            }
            else {
                stack.push(pathConcat(relativePath, names[i]));
            }
        }
    }

    return r;
}


