import { Errors as BaseErrors } from "maishu-toolkit/out/errors";

class Errors extends BaseErrors {
    iconNotExists(icon: string) {
        let msg = `Icon '${icon}' is not exists.`;
        let error = new Error(msg);
        let name: keyof Errors = "iconNotExists";
        error.name = name;

        return error;
    }
}

export let errors = new Errors();