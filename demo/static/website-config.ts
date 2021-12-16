
let RoleIds = {
    merchant: "9024d141-6f72-ece1-dc57-567290e1432d",
    /** 卓旺分销商 */
    anonymous: "738FB92C-60CF-4280-B5AE-61C376D0AADF",
    /** 卓旺管理员 */
    manager: "c74b413c-5c74-4f0e-92ae-e4a6a4e62f26",
}


let websiteConfig: import("../../static/website-config").WebsiteConfig = {
    "requirejs": {
        "paths": {
            "antd": "node_modules/antd/dist/antd.min",
            "antd/dist": "node_modules/antd/dist",
            "moment": "node_modules/moment/min/moment.min",
            "@ant-design/icons": "node_modules/@ant-design/icons/dist/index.umd",
        }
    },
    "containers": {
        "login": "simple"
    },
    menuItems: [
        { id: "BE3789A2-0CF0-4D81-A7C0-E2C9324A1DDD", name: "首页", path: "#index", icon: "fa fa-home" },
        {
            id: "AE3789A2-0CF0-4D81-A7C0-E2C9324A1DDD", name: "页面列表", path: "#page-list", icon: "fa fa-home",
            children: [
                { id: "3CE34AB9-7814-4FE5-85E2-ABA6AAF9C1FD", name: "页面编辑", path: "#page-edit", hidden: true }
            ]
        },
        {
            id: "02AFF1E9-82E2-46E1-89B2-A634C2A32F3B", name: "商品", icon: "fa fa-gift", roleIds: [RoleIds.manager, RoleIds.merchant],
            sortNumber: 200,
            children: [
                {
                    id: "4F1F1120-1BBF-4DAB-BDFB-1257A1857028", name: "商品列表", path: "#shopping/product-list", roleIds: [RoleIds.manager, RoleIds.merchant],
                    children: [
                        { id: "DBFECC6D-23EB-401A-A11C-0A1AABBE3B08", name: "", path: "#shopping/product-add", roleIds: [RoleIds.manager, RoleIds.merchant] },
                        { id: "EFA6F80A-9D08-468A-857C-12F57CCB79A1", name: "", path: "#shopping/product-edit2", roleIds: [RoleIds.manager, RoleIds.merchant] },
                        { id: "EFA6F80A-9D08-468A-857C-12F57CCB79A2", name: "", path: "#shopping/product-edit", roleIds: [RoleIds.manager, RoleIds.merchant] }
                    ],
                },
                { id: "6EEA700D-155D-4257-BE63-B64146C6DD27", name: "商品类别", path: "#shopping/category-list", roleIds: [RoleIds.manager] },
                { id: "2FC763EE-C543-42F3-88DA-4E4130D4D355", name: "商品品牌", path: "#shopping/brand-list", roleIds: [RoleIds.manager] },
                { id: "C4840D51-2A54-431C-9E53-6A38DF668EFF", name: "商品评论", path: "#shopping/comments", roleIds: [RoleIds.manager] },
                { id: "A19EA358-99FF-4C4A-B8BF-FC7BF67C4E06", name: "商品问答", path: "#shopping/qa-list", roleIds: [RoleIds.manager] },
                { id: "CC45D579-A967-4101-89B9-C6E87D94B2CD", name: "商品导入", path: "#shopping/zw-product-list", roleIds: [] },
                { id: "2D842E02-F27D-4CA9-8304-B59A58AC74E6", name: "商品图片", path: "#site/image-list", roleIds: [RoleIds.merchant, RoleIds.manager] },
                // { id: "2D842E02-F27D-4CA9-8304-B59A58AC74E5", name: "SKU", path: "#shopping/sku-list", roleIds: [RoleIds.merchant, RoleIds.manager] },
                { id: "588DSDSD-7778-SD85-9898-BS65DS55SDDF", name: "定制列表", path: "#shopping/customized-list", roleIds: [RoleIds.manager] },
                {
                    id: "4F1F1120-1BBF-4DAB-BDFB-1257A1857028", name: "", path: "#shopping/product-list2", roleIds: [RoleIds.manager, RoleIds.merchant],
                },
            ]
        },
        { id: "AE3789A2-0CF0-4D81-A7C0-E2C9324A1DD1", name: "login", path: "#login", hidden: true },
    ],
    mode: "production"
}

// export type WebsiteConfig = typeof websiteConfig;

export default websiteConfig;