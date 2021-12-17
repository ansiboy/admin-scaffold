import * as React from "react";
import { MasterPage, MasterPageProps } from './master-page';
import { masterPageNames } from './names';
import { Application } from 'maishu-chitu-react';
import { MenuItem } from "../website-config";
import { Layout, Menu } from "antd";
import "antd/dist/antd.css";
import "./main-master-page.less";

import {
    AppstoreOutlined,
    BarChartOutlined,
    CloudOutlined,
    ShopOutlined,
    TeamOutlined,
    UserOutlined,
    UploadOutlined,
    VideoCameraOutlined,
} from '@ant-design/icons';
// import SubMenu from "antd/lib/menu/SubMenu";
// import MenuItem from "antd/lib/menu/MenuItem";

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

interface State {
    currentPageUrl?: string,
    toolbar?: JSX.Element,
    menuItems: MenuItem[],
    resourceId?: string,
    /** 不显示菜单的页面 */
    hideMenuPages?: string[],
    username?: string,
    roleName?: string,
    mainLayerLeftMargin: number,
}

interface Props extends MasterPageProps {
    menuItems: MenuItem[],
    currentPageUrl: string,
}

const SiderWidth = 180;
const SiderCollapsedWidth = 50;

export class MainMasterPage extends MasterPage<State, Props> {

    name = masterPageNames.main

    pageContainer: HTMLElement;
    private app: Application;

    constructor(props: Props) {
        super(props);

        this.state = { menuItems: this.props.menuItems, username: "", currentPageUrl: props.currentPageUrl, mainLayerLeftMargin: SiderWidth }

        this.app = props.app;
    }

    get element() {
        return document.getElementById("main-master");
    }

    private showPageByNode(node: MenuItem) {
        let children = node.children || []
        if (!node.path && (node.children || []).length > 0) {
            this.showPageByNode(children[0])
            return
        }
        let pagePath = node.path;
        if (pagePath == null && children.length > 0) {
            node = children[0];
            pagePath = node.path;
        }

        if (!pagePath) {
            console.log(`MenuItem ${node.name} page name is empty.`);
            return;
        }

        if (pagePath.startsWith("#")) {
            pagePath = pagePath.substr(1);
            // this.app.redirect(pagePath, { resourceId: node.id });
            location.hash = pagePath;
            return;
        }

        if (pagePath.startsWith("http")) {
            location.href = pagePath;
            return;
        }

        this.app.redirect(`outer-page?target=${pagePath}&resourceId=${node.id}`);
    }

    private findMenuItemByResourceId(menuItems: MenuItem[], resourceId: string) {
        let stack = new Array<MenuItem>()
        stack.push(...menuItems)
        while (stack.length > 0) {
            let item = stack.shift()
            if (item == null)
                return

            if (item.id == resourceId)
                return item

            let children = item.children || []
            stack.push(...children)
        }

        return null
    }

    findMenuItemByPageUrl(menuItems: MenuItem[], pageUrl: string) {
        let sharpIndex = pageUrl.indexOf('#');
        if (pageUrl.indexOf('#') >= 0) {
            pageUrl = pageUrl.substr(sharpIndex + 1);
        }
        let stack = new Array<MenuItem>()
        stack.push(...menuItems)
        while (stack.length > 0) {
            let item = stack.shift()
            if (item == null)
                throw new Error("item is null")

            let r = this.app.parseUrl(pageUrl);
            if (item.path == `#${pageUrl}` || item.path == `#${r.pageName}`) {
                return item
            }

            let children = item.children || []
            stack.push(...children)
        }

        return null
    }

    setToolbar(value: JSX.Element) {
        this.setState({ toolbar: value })
    }

    get menuItems(): MenuItem[] {
        return this.state.menuItems || [];
    }

    componentDidMount() {
        this.app.pageCreated.add((sender, page) => {
            page.shown.add(() => {
                this.setState({ currentPageUrl: page.url })
                this.setState({ resourceId: (page.data.resourceId || page.data.resource_id) as string })
            })
        })
    }

    renderMenuItem(menuItem: MenuItem) {
        let children = (menuItem.children || []).filter(o => !o.hidden && o.name);
        if (children.length == 0) {
            return <Menu.Item key={menuItem.id} icon={menuItem.icon ? <i className={menuItem.icon} /> : null}
                onClick={() => {
                    if (menuItem.path)
                        location.href = menuItem.path;
                }}  >
                {menuItem.name}
            </Menu.Item >
        }

        return <Menu.SubMenu key={menuItem.id} title={menuItem.name} icon={menuItem.icon ? <i className={menuItem.icon} /> : null}>
            {children.map(c => this.renderMenuItem(c))}
        </Menu.SubMenu>
    }

    render() {
        let { menuItems, resourceId, mainLayerLeftMargin } = this.state;
        let currentPageUrl: string = this.state.currentPageUrl;
        let firstLevelNodes = menuItems.filter(o => o.type == "menu");
        let currentNode: MenuItem | null | undefined
        if (resourceId) {
            currentNode = this.findMenuItemByResourceId(firstLevelNodes, resourceId)
        }
        else if (currentPageUrl) {

            currentNode = this.findMenuItemByPageUrl(firstLevelNodes, currentPageUrl);
            let q = currentPageUrl.indexOf("?");
            if (currentNode == null && q > 0) {
                let shortUrl = currentPageUrl.substr(0, q);
                currentNode = this.findMenuItemByPageUrl(firstLevelNodes, shortUrl);
            }
        }

        let openKeys: string[] = undefined;
        let p = currentNode?.parent;
        while (p) {
            if (openKeys == null)
                openKeys = [];

            openKeys.push(p.id);
            p = p.parent;
        }

        return <Layout>
            <Header className="site-layout-background" style={{ padding: 0 }} >
                <div className="logo" >
                    Gemwon
                </div>
            </Header>
            <Layout>
                <Sider collapsible width={SiderWidth} collapsedWidth={SiderCollapsedWidth} style={{ position: "fixed", height: "100%" }}
                    onCollapse={collapse => {
                        if (collapse)
                            this.setState({ mainLayerLeftMargin: SiderCollapsedWidth });
                        else
                            this.setState({ mainLayerLeftMargin: SiderWidth });
                    }}>
                    <Menu theme="dark" mode="inline" defaultSelectedKeys={currentNode ? [currentNode.id] : []} defaultOpenKeys={openKeys}>
                        {firstLevelNodes.filter(o => !o.hidden).map(n => this.renderMenuItem(n))}
                    </Menu>
                </Sider>
                <Layout className="site-layout" style={{ marginLeft: mainLayerLeftMargin }}>
                    <Content style={{ margin: '1', overflow: 'initial', backgroundColor: 'white' }}>
                        <div className={`page-container page-placeholder`}
                            ref={(e: HTMLElement) => this.pageContainer = e || this.pageContainer}>
                        </div>
                    </Content>
                    {/* <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer> */}
                </Layout>
            </Layout>
        </Layout >

    }
}

