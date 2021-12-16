import { WebsiteConfig as BaseWebsiteConfig } from "maishu-chitu-scaffold/static/website-config";

export type MenuItem = {
    id: string, name: string, path?: string,
    children?: MenuItem[], icon?: string;
    parent?: MenuItem,
    type?: "menu" | "button" | "spliter",
    sortNumber?: number,
    hidden?: boolean,
    roleIds?: string[]
};


let menuItems: MenuItem[] = [
    // {
    //     id: "AE3789A2-0CF0-4D81-A7C0-E2C9324A1DDD", name: "页面列表", path: "#page-list",
    //     children: [
    //         { id: "3CE34AB9-7814-4FE5-85E2-ABA6AAF9C1FD", name: "页面编辑", path: "#page-edit", hidden: true }
    //     ]
    // }
];


export interface WebsiteConfig extends BaseWebsiteConfig {
    menuItems?: MenuItem[],
}

let websiteConfig: WebsiteConfig = {
    requirejs: {
        shim: {
        },
        paths: {
            "antd": "node_modules/antd/dist/antd.min",
            "antd/dist": "node_modules/antd/dist",
            "moment": "node_modules/moment/min/moment.min",
            "@ant-design/icons": "node_modules/@ant-design/icons/dist/index.umd",
        }
    },
    containers: {
        login: "simple"
    },
    menuItems
}

export default websiteConfig;