import * as React from "react";
import { MasterPage, MasterPageProps } from './master-page';
import { masterPageNames } from './names';
import { Application } from 'maishu-chitu-react';
import { MenuItem } from "../website-config";
import { parseUrl } from "maishu-chitu";

interface State {
    currentPageUrl?: string,
    toolbar?: JSX.Element,
    menuItems: MenuItem[],
    resourceId?: string,
    /** 不显示菜单的页面 */
    hideMenuPages?: string[],
    username?: string,
    roleName?: string,
}

interface Props extends MasterPageProps {
    menuItems: MenuItem[],
}


export class MainMasterPage extends MasterPage<State, Props> {

    name = masterPageNames.main

    pageContainer: HTMLElement;
    private app: Application;

    constructor(props: Props) {
        super(props);

        this.state = { menuItems: this.props.menuItems, username: "" }

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

        this.app.redirect("outer-page", { target: pagePath, resourceId: node.id });
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
        let stack = new Array<MenuItem>()
        stack.push(...menuItems)
        while (stack.length > 0) {
            let item = stack.shift()
            if (item == null)
                throw new Error("item is null")

            let r = parseUrl(pageUrl);
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

    render() {
        let { menuItems } = this.state;
        let currentPageUrl: string = this.state.currentPageUrl || '';

        let firstLevelNodes = menuItems.filter(o => o.type == "menu");
        let currentNode: MenuItem | null | undefined
        if (this.state.resourceId) {
            currentNode = this.findMenuItemByResourceId(firstLevelNodes, this.state.resourceId)
        }
        else if (currentPageUrl) {

            currentNode = this.findMenuItemByPageUrl(firstLevelNodes, currentPageUrl);
            let q = currentPageUrl.indexOf("?");
            if (currentNode == null && q > 0) {
                let shortUrl = currentPageUrl.substr(0, q);
                currentNode = this.findMenuItemByPageUrl(firstLevelNodes, shortUrl);
            }
        }
        let firstLevelNode: MenuItem | null = null;
        let secondLevelNode: MenuItem;

        if (currentNode != null) {
            if (currentNode.parent == null) {
                firstLevelNode = currentNode
            }
            else if (currentNode.parent.parent == null) {   //二级菜单
                firstLevelNode = currentNode.parent
                secondLevelNode = currentNode
            }
            else if (currentNode.parent.parent.parent == null) {   //三级菜单
                firstLevelNode = currentNode.parent.parent
                secondLevelNode = currentNode.parent
            }
        }

        let hideFirst = false;
        let hideSecond = false;
        let nodeClassName = '';
        let hideMenuPages = this.state.hideMenuPages || []
        if (hideMenuPages.indexOf(currentPageUrl) >= 0) {
            nodeClassName = 'hideFirst';
            hideFirst = true;
            hideSecond = true;
        }
        else if (firstLevelNode == null || (firstLevelNode.children || []).filter(o => o.type == "menu" && (o.hidden != true)).length == 0) {
            nodeClassName = 'hideSecond';
            hideSecond = true;
        }

        return <>
            <div className="first" style={{ display: hideFirst ? "none" : "" }}>
                <ul className="list-group">
                    {firstLevelNodes.map((o, i) =>
                        <li key={i} className={o == firstLevelNode ? "list-group-item active" : "list-group-item"}
                            style={{ cursor: 'pointer', display: o.type != "menu" ? "none" : '' }}
                            onClick={() => this.showPageByNode(o)}>
                            <i className={o.icon}></i>
                            <span menu-id={o.id} sort-number={o.sortNumber}>{o.name}</span>
                        </li>
                    )}
                </ul>
            </div>
            <div className="second" style={{ display: hideSecond ? "none" : "" }}>
                <ul className="list-group">
                    {(firstLevelNode ? (firstLevelNode.children || []) : []).filter(o => o.type == "menu").map((o, i) =>
                        <li key={i} className={o == secondLevelNode ? "list-group-item active" : "list-group-item"}
                            style={{ cursor: 'pointer', display: o.type != "menu" ? "none" : '' }}
                            page-url={o.path}
                            onClick={() => this.showPageByNode(o)}>
                            <i className={o.icon}></i>
                            <span menu-id={o.id} sort-number={o.sortNumber}>{o.name}</span>
                        </li>
                    )}
                </ul>
            </div>
            <div className="main">
                <nav className="navbar navbar-default">
                    {this.state.toolbar}
                </nav>
                <div className={`page-container page-placeholder`}
                    ref={(e: HTMLElement) => this.pageContainer = e || this.pageContainer}>
                </div>
            </div>

        </>

    }
}

