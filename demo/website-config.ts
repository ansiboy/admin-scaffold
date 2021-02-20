let websiteConfig = {
    "requirejs": {
        "paths": {
        }
    },
    "containers": {
        "login": "simple"
    },
    menuItems: [
        {
            id: "AE3789A2-0CF0-4D81-A7C0-E2C9324A1DDD", name: "页面列表", path: "#page-list",
            children: [
                { id: "3CE34AB9-7814-4FE5-85E2-ABA6AAF9C1FD", name: "页面编辑", path: "#page-edit", hidden: true }
            ]
        }
    ]
}

export type WebsiteConfig = typeof websiteConfig;

export default websiteConfig;