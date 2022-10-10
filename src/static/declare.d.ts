declare module '*.svg' {
    const value: any;
    export = value;
}

type MenuItem = {
    id: string, name: string, path?: string,
    children?: MenuItem[], icon?: string;
    parent?: MenuItem,
    type?: "menu" | "button" | "spliter",
    sortNumber?: number,
    hidden?: boolean,
    roleIds?: string[]
};

interface WebsiteConfig extends BaseWebsiteConfig {
    menuItems?: MenuItem[],
    plugins?: { [appId: string]: { path: string } }[],
}