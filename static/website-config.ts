export type MenuItem = {
    id: string, name: string, path?: string,
    children?: MenuItem[], icon?: string;
    parent?: MenuItem,
    type?: "menu" | "button",
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

let websiteConfig = {
    "requirejs": {
        "paths": {
        }
    },
    "containers": {
        "login": "simple"
    },
    menuItems
}

export type WebsiteConfig = typeof websiteConfig;

export default websiteConfig;