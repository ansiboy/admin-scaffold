import { alert } from "maishu-ui-toolkit";

export function errorHandle(err: Error) {
    alert({ title: "错误", message: err.message || "Unknown Error" })
}