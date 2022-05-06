"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errors = void 0;
const maishu_toolkit_1 = require("maishu-toolkit");
class Errors extends maishu_toolkit_1.Errors {
    notPhysicalPath(path) {
        let msg = `Path '${path}' is not a physical path.`;
        let error = new Error(msg);
        return error;
    }
    notAbsolutePath(path) {
        let msg = `Path '${path}' is not absolute path.`;
        let error = new Error(msg);
        return error;
    }
    virtualFileNotExists(virtualPath) {
        let msg = `Virtual path ${virtualPath} is not exists.`;
        let error = new Error(msg);
        return error;
    }
    cannotGetApplicationId() {
        let msg = "Can not get application id.";
        let error = new Error(msg);
        return error;
    }
    fileNotExists(path) {
        let msg = `Path ${path} is not exists.`;
        let error = new Error(msg);
        return error;
    }
}
exports.errors = new Errors();
