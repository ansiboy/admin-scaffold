import { MenuItem } from "../../static/website-config";

let RoleIds = {
    merchant: "9024d141-6f72-ece1-dc57-567290e1432d",
    /** 卓旺分销商 */
    anonymous: "738FB92C-60CF-4280-B5AE-61C376D0AADF",
    /** 卓旺管理员 */
    manager: "c74b413c-5c74-4f0e-92ae-e4a6a4e62f26",
}

export let PagePaths = {
    forgetPassword: "#forget-password",
    login: "#login",
    register: "#register",
    merchantApply: "#merchant/apply",
    index: "#index"
}

export const HttpHeaderNames = {
    ApplicationId: "application-id",
    UserId: "user-id",
    Token: "token",
    TrackId: "track-id",
};

export let stations = {
    /** 建站 */
    site: "site",
    email: "email",
    seo: "seo",
    generic: "generic",
    portal: "portal",
}


let menuItems: MenuItem[] = [
    { id: "BEBA86B7-019E-4B3E-B823-3701C57779E6", name: "首页", icon: "icon-home", path: PagePaths.index, roleIds: [RoleIds.manager, RoleIds.merchant] },
    {
        id: "02AFF1E9-82E2-46E1-89B2-A634C2A32F3B", name: "商品管理", icon: "icon-product", roleIds: [RoleIds.manager, RoleIds.merchant],
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
    {
        id: "F3353D09-646F-4740-A93A-A298B11ACBE6", name: "订单管理", icon: "icon-order1", roleIds: [RoleIds.manager], path: "#shopping/order-list",
        // sortNumber: 300,
        // children: [
        //     { id: "06E53097-350A-428A-8D3B-7BECA8916F82", name: "订单列表", path: "#shopping/order-list", roleIds: [RoleIds.manager] }
        // ]
    },
    {
        id: "BC4983DF-B563-42B5-841D-E955DA5360D8", name: "博客管理", icon: "icon-blog", path: "#blog/list", roleIds: [RoleIds.manager],
        children: [
            { id: "A74DD086-C9F5-4EBE-ACEB-CDC408393982", name: "博客编辑", path: "#blog/edit", roleIds: [RoleIds.manager], hidden: true }
        ]
    },
    {
        id: "32F68FC7-5F97-4333-92EA-D2AA23A26900", name: "会员管理", icon: "icon-user", roleIds: [RoleIds.manager], path: "#user/list",
        // children: [
        //     { id: "F576CD1B-C777-4C20-B300-0C6A84277105", name: "用户", path: "#user/list", roleIds: [RoleIds.manager] },
        //     { id: "0193A226-B38C-4D90-BACC-1D70132BDEBB", name: "商家", path: "#merchant/list", roleIds: [RoleIds.manager] },
        //     { id: "157821DD-372D-4409-83FC-0F0B314E0BE2", name: "供应商", path: "#supplier/list", roleIds: [RoleIds.manager] },
        // ]
    },
    {
        id: "651C1D07-1AB7-490B-ABE6-EA7A6ED03846", name: "信息管理", roleIds: [RoleIds.manager], icon: "icon-message2",
        children: [
            // {
            //     id: "F5555555-646F-4740-A93A-A298B11ACBE6", name: "留言", icon: "fa fa-bars", roleIds: [RoleIds.manager],
            //     sortNumber: 300,
            //     children: [
            //         { id: "0066666-350A-428A-8D3B-7BECA8916F82", name: "留言列表", path: "#message/message-list", roleIds: [RoleIds.manager] }
            //     ]
            // },
            // {
            //     id: "F59888785454-646F-4740-A93A-A298B11ACBE6", name: "邮箱", icon: "fa fa-bars", roleIds: [RoleIds.manager],
            //     sortNumber: 300,
            //     children: [
            //         { id: "0066666-350A-428A-8D3B-7BECA8916F82", name: "订阅邮箱", path: "#email/subscribe-list", roleIds: [RoleIds.manager] },
            //         { id: "0066666-350A-428A-8D3B-7BECA8916F82", name: "模板管理", path: "#email/template-manage", roleIds: [RoleIds.manager] }
            //     ]
            // },
            { id: "a55A86B7-019E-4B3E-B823-3701C57779E6", name: "销售可视", path: "#visualization", roleIds: [RoleIds.manager, RoleIds.merchant] },
            { id: "2AJHJSISHD-7878-442A-BBC5-A514B0D71F59", name: "邮件管理", path: `#/${stations.email}/email-list`, roleIds: [RoleIds.manager, RoleIds.merchant] },
            { id: "E51B9AC2-E126-4B16-94F7-A3113AB492DF", name: "订阅邮件", path: `#/${stations.email}/subscribe-list`, roleIds: [RoleIds.manager, RoleIds.merchant] },
            {
                id: "E61B9AC2-E126-4B16-94F7-A3113AB492DF", name: "邮件模板", path: `#/${stations.email}/template-list`, roleIds: [RoleIds.manager, RoleIds.merchant],
                children: [{ id: "6B6C25BE-70CC-421B-8B47-0B607C2072A3", name: "编辑模板", path: `#/${stations.email}/template-item` }]

            },

        ]
    },
    {
        id: "6801E414-1D11-4C0B-BE9C-D33821A2A096", name: "建站管理", icon: "icon-website", roleIds: [RoleIds.manager],
        children: [
            { id: "702BE503-6BD9-462C-94DA-6CEA1F99AD2E", name: "店铺设置", path: `#merchant/store-setting`, roleIds: [RoleIds.merchant] },
            // { id: "EAC315A7-D8BE-4E85-843B-0D16F3254485", name: "域名绑定", path: `#/${stations.site}/domain-binding`, sortNumber: 30, roleIds: [RoleIds.manager, RoleIds.merchant] },
            { id: "FADCEEB3-145D-4131-BCB4-BFCF7D5FE167", name: "链接改写", path: `#rewrite/url-rewrite`, roleIds: [RoleIds.manager, RoleIds.merchant] },
            { id: "D0D26AA2-066F-478A-B19C-D8FB8F660905", name: "页面代码", path: `#rewrite/code`, roleIds: [RoleIds.manager, RoleIds.merchant] },
            {
                id: "766674D2-CD7F-4E3A-9D1C-5D5BCFAE23D7", name: "页面列表", path: `#/${stations.site}/page-list`, roleIds: [RoleIds.manager, RoleIds.merchant],
                children: [
                    { id: "92A02649-8CF8-4993-A119-11C44B0ECAD7", name: "", path: `#/${stations.site}/gemwon-pc-page-edit`, roleIds: [RoleIds.manager], }
                ]

            },
            { id: "F5CAE1E7-197A-4DC6-8C2F-8161F9B24945", name: "页面缓存", path: `#/${stations.portal}/page-cache`, roleIds: [RoleIds.manager, RoleIds.merchant] },
            { id: "B23AAA34-12E3-4194-BE35-A7836F09D661", name: "首页", path: `#/${stations.site}/pc-page-edit?name=home`, roleIds: [RoleIds.manager] },
            // { id: "61DFF6F6-AB67-4E75-B2AD-CAD3EC4868A7", name: "产品列表", path: `#/${stations.site}/pc-page-edit?name=product-list`, roleIds: [RoleIds.manager] },
            { id: "B57D6BE3-56C3-42BF-A784-0CE88B1DD22C", name: "模板页", path: `#/${stations.site}/pc-page-edit?name=base-template`, roleIds: [RoleIds.manager] },
            { id: "9C312384-D2BE-4BDF-8C44-C7CAE4FC64E7", name: "关于我们", path: `#/${stations.site}/gemwon-pc-page-edit?id=84b9d88d-7326-ba53-40d3-b3d58be685c9`, roleIds: [RoleIds.manager] },
            { id: "54A3B791-0FEB-41EB-96B4-FFFC9305E5FC", name: "服务条款", path: `#/${stations.site}/gemwon-pc-page-edit?id=55c29988-8bd3-ee5b-e733-97cfcdef3642`, roleIds: [RoleIds.manager] },
            { id: "A3EC4DB2-8A57-446E-8B1E-56B5431FB371", name: "运输说明", path: `#/${stations.site}/gemwon-pc-page-edit?id=1060af29-ca90-7801-2b8a-e18aeefcfbc3`, roleIds: [RoleIds.manager] },
            { id: "21ADEA34-FE75-496A-845D-AA4BE7A1D612", name: "隐私政策", path: `#/${stations.site}/gemwon-pc-page-edit?id=dce59a03-08c0-6334-2c52-dfcebde21e46`, roleIds: [RoleIds.manager] },

            { id: "667B79-9586-481B-B8E6-78B77D3BBF97", name: "送货政策", path: `#/${stations.site}/gemwon-pc-page-edit?id=6b196318-a284-f31d-7575-c9e868089c6b`, roleIds: [RoleIds.manager] },
            { id: "667B7D891-9586-481B-B8E6-78B77D3BBF97", name: "退款", path: `#/${stations.site}/gemwon-pc-page-edit?id=96f66d17-4e21-8041-cb94-7d1bbb24de89`, roleIds: [RoleIds.manager] },
            { id: "00BFD991-E56D-401E-B8C0-F62BE95E08E5", name: "条款", path: `#/${stations.site}/gemwon-pc-page-edit?id=3c476ae2-243b-114d-729e-c215ae7f2e5a`, roleIds: [RoleIds.manager] },
            { id: "F8CB5723-370E-4DDB-A7DD-0F66CF096DCF", name: "支付方式", path: `#/${stations.site}/gemwon-pc-page-edit?id=a6c8ef8b-076c-c73b-10bf-f1d0098528f7`, roleIds: [RoleIds.manager] },
            { id: "B485CCA1-2645-44DD-A929-B289173BCB67", name: "如何支付", path: `#/${stations.site}/gemwon-pc-page-edit?id=ca5c3317-1c6d-32e4-54e1-9e0a1a4d296a`, roleIds: [RoleIds.manager] },
            { id: "9F36365D-891E-4A2D-B8D9-653FFC2DFB26", name: "联系我们", path: `#/${stations.site}/gemwon-pc-page-edit?id=0ccc6ded-ec2c-c5c8-ad7a-83dcbe2c0497`, roleIds: [RoleIds.manager] },

            { id: "CAA72924-2C54-4006-AED2-794BFCFEE676", name: "", path: `#/${stations.site}/generic-page-edit`, roleIds: [RoleIds.manager, RoleIds.merchant] },
            { id: "089EDA52-A7AE-424E-92FB-2F88C82BD9AF", name: "", path: `#/${stations.site}/aixpi-page-edit`, roleIds: [RoleIds.manager, RoleIds.merchant] },

        ]
    },
    {
        id: "A6958866-8D28-4562-8416-7C86C5AD2CEB", name: "移动", icon: "glyphicon glyphicon-phone", roleIds: [RoleIds.manager],
        children: [
            { id: "7750E87A-BADF-4794-913E-75805FAB9CF7", name: "轮播设置", path: `#mobile/advert-tem-list`, roleIds: [RoleIds.manager], },
            { id: "EE71EE51-373E-4BA0-B8F8-C4721B50AE18", name: "图片栏一", path: `#mobile/image-bar-1`, roleIds: [RoleIds.manager], },
            { id: "895A1661-F8FA-4441-96A2-BB500CB01846", name: "图片栏二", path: `#mobile/image-bar-2`, roleIds: [RoleIds.manager] },
            { id: "895ASDS61-F8FA-4441-96A2-BB500CB01846", name: "图片栏三", path: `#mobile/image-bar-3`, roleIds: [RoleIds.manager] }
        ]
    },
    // {
    //     id: "A1360016-3996-4762-973A-152488C21C4B", name: "邮件", icon: "fa fa-envelope", roleIds: [RoleIds.manager],
    //     children: [
    //         { id: "2A5D8565-7878-442A-BBC5-A514B0D71F59", name: "支付邮件", path: `#/${stations.email}/paid-email`, roleIds: [RoleIds.manager] },
    //         { id: "BF010E29-B978-4D42-91D9-2F260AA633FA", name: "发货邮件", path: `#/${stations.email}/send-email`, roleIds: [RoleIds.manager] },
    //         { id: "8CD017DA-0E02-44E9-B1CD-FCBD16AF7138", name: "取回密码", path: `#/${stations.email}/receive-password`, roleIds: [RoleIds.manager] },
    //         { id: "E41B9AC2-E126-4B16-94F7-A3113AB492DF", name: "邮件设置", path: `#/${stations.email}/settings`, roleIds: [RoleIds.manager] }
    //     ]
    // },

    // {
    //     id: "6658asds44-646F-4740-A93A-A298B11ACBE6", name: "结算", icon: "fa fa-bars", roleIds: [RoleIds.manager],
    //     sortNumber: 300,
    //     children: [
    //         { id: "007777-350A-428A-8D3B-7BECA8916F82", name: "结算列表", path: "#settlement/settlement-list", roleIds: [RoleIds.manager] },
    //         { id: "08888-350A-428A-8D3B-7BECA8916F82", name: "结算订单列表", path: "#settlement/settlement-order-list", roleIds: [RoleIds.manager] },
    //     ]
    // },
    {
        id: "G52624F3-3B29-4972-AF9C-B4CD64BD3DA2", name: "权限", icon: "fa fa-lock", roleIds: [RoleIds.manager], sortNumber: 200,
        children: [
            { id: "GEFE91D5-DBB1-4CC9-B943-A81CE3AF4271", name: "角色", icon: "fa fa-sitemap", path: "#permission/role-list", roleIds: [RoleIds.manager, RoleIds.merchant] },
            { id: "G06EFFA1-B224-4E14-96D6-45F980634394", name: "菜单", icon: "fa fa-tasks", path: "#permission/menu-list", roleIds: [RoleIds.manager, RoleIds.merchant] },
        ]
    },
    // {
    //     id: "BCD887-B563-42B5-841D-E955DA5360D8", name: "账号", icon: "fa fa-sticky-note", path: "#account/account", roleIds: [RoleIds.manager],
    // },
    {
        id: "3BCED4A5-A3D6-4E14-8A4E-27542EEAFF41", name: "设置", icon: "fa fa-cog", roleIds: [RoleIds.manager, RoleIds.merchant],
        children: [
            { id: "304479F0-6C4A-4BD1-BFB7-4ABB2346A8DA", name: "热门关键字", path: "#site/hot-search-word-list", roleIds: [RoleIds.manager] },
            // {
            //     id: "D9793D11-AE85-45C7-B894-371DB9CB7B82", name: "运费方案", path: "#freight/solution-list", roleIds: [RoleIds.manager],
            //     children: [
            //         { id: "795A006F-685C-49CF-A7D8-7D53DE8939C6", name: "", path: "#freight/freight-list", roleIds: [RoleIds.manager] }
            //     ]
            // },
            { id: "B5E3F876-E1BB-459D-8FAA-8E693988BA2F", name: "国家", path: "#misc/region-list", roleIds: [RoleIds.manager] },
            { id: "E41B9AC2-E126-4B16-94F7-A3113AB492DF", name: "邮件设置", path: `#/${stations.email}/settings`, roleIds: [RoleIds.manager] },
            { id: "6C11748C-1888-440E-AE57-E0455DA0F7C7", name: "修改密码", path: "#security/modify-password", roleIds: [RoleIds.manager, RoleIds.merchant] },
            // { type: "spliter", roleIds: [RoleIds.manager, RoleIds.merchant] } as any,
            // { id: "2A5D8565-7878-442A-BBC5-A514B0D71F59", name: "支付邮件", path: `#/${stations.email}/paid-email`, roleIds: [RoleIds.manager, RoleIds.merchant] },
            // { id: "BF010E29-B978-4D42-91D9-2F260AA633FA", name: "发货邮件", path: `#/${stations.email}/send-email`, roleIds: [RoleIds.manager, RoleIds.merchant] },
            // { id: "8CD017DA-0E02-44E9-B1CD-FCBD16AF7138", name: "取回密码", path: `#/${stations.email}/receive-password`, roleIds: [RoleIds.manager, RoleIds.merchant] },
            // { id: "E41B9AC2-E126-4B16-94F7-A3113AB492DF", name: "邮件设置", path: `#/${stations.email}/settings`, roleIds: [RoleIds.manager, RoleIds.merchant] }
        ]
    },
    { id: "F598E4A5-B2B5-4B2E-94FC-7AC53D05D471", name: "", path: PagePaths.login, roleIds: [RoleIds.anonymous] },
    { id: "F243DC80-BD17-424E-A74B-10193D781835", name: "", path: PagePaths.register, roleIds: [RoleIds.anonymous] },
    { id: "F243DC80-BD17-424E-A74B-10193D781836", name: "", path: PagePaths.forgetPassword, roleIds: [RoleIds.anonymous] },
    { id: "F5DED79E-3B1D-40B1-B8D1-9D01CA7CB9C0", name: "", path: PagePaths.merchantApply },
];


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
    menuItems,
    mode: "production"
}

// export type WebsiteConfig = typeof websiteConfig;

export default websiteConfig;