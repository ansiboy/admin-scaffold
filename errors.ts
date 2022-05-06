import { Errors as BaseErrors } from "maishu-toolkit";

class Errors extends BaseErrors {
    notPhysicalPath(path: string) {
        let msg = `Path '${path}' is not a physical path.`;
        let error = new Error(msg);
        return error;
    }
    notAbsolutePath(path: string) {
        let msg = `Path '${path}' is not absolute path.`;
        let error = new Error(msg);
        return error;
    }
    virtualFileNotExists(virtualPath: string) {
        let msg = `Virtual path ${virtualPath} is not exists.`;
        let error = new Error(msg);
        return error;
    }
    cannotGetApplicationId() {
        let msg = "Can not get application id.";
        let error = new Error(msg);
        return error;
    }
    fileNotExists(path: string) {
        let msg = `Path ${path} is not exists.`;
        let error = new Error(msg);
        return error;
    }
}

export let errors = new Errors();