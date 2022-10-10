import { Errors as BaseErrors } from "maishu-toolkit/out/errors";

class Errors extends BaseErrors {
    pathNotExists(path: string) {
        let msg = `Path '${path}' is not exists.`;
        let error = new Error(msg);
        let name: keyof Errors = "pathNotExists";
        error.name = name;
        return error;
    }
    moduleNoneDefaultMember(module: string) {
        let msg = `Module '${module}' has not a default member.`;
        let error = new Error(msg);
        let name: keyof Errors = "moduleNoneDefaultMember";
        error.name = name;
        return error;
    }
}

export let errors = new Errors();