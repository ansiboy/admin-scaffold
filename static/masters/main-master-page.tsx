import * as React from "react";
import { MasterPage, MasterPageProps } from './master-page';
import { masterPageNames } from './names';
import { Application } from 'maishu-chitu-react';
import { MenuItem } from "../website-config";

interface State {
    currentPageUrl: string,
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
    currentPageUrl: string,
}


export class MainMasterPage extends MasterPage<State, Props> {

    name = masterPageNames.main

    pageContainer: HTMLElement;
    private app: Application;

    constructor(props: Props) {
        super(props);

        this.state = { menuItems: this.props.menuItems, username: "", currentPageUrl: props.currentPageUrl }

        this.app = props.app;
    }

    get element() {
        return document.getElementById("main-master") as HTMLElement;
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

    renderMenuItem(menuItem: MenuItem, currentNode?: MenuItem) {
        let children = (menuItem.children || []).filter(o => !o.hidden && o.name);
        let p = currentNode?.parent;

        return <li>
            <div className="submenu-title">
                <span className="submenu-icon">
                    <a href={menuItem.path}>
                        {menuItem.icon ? <i><span className={menuItem.icon}></span></i> : null}
                        {menuItem.name}
                    </a>
                </span>
            </div>
            {children.length > 0 ? <ul className="menu-sub">
                {children.map(c => <li><a href={c.path}>{c.name}</a></li>)}
            </ul> : null}
        </li>
    }

    render() {
        let { menuItems, toolbar } = this.state;
        let currentPageUrl: string = this.state.currentPageUrl || '';

        let firstLevelNodes = menuItems.filter(o => o.type == "menu");
        let currentNode: MenuItem | null | undefined = undefined;
        if (currentPageUrl) {
            currentNode = this.findMenuItemByPageUrl(firstLevelNodes, currentPageUrl);
            let q = currentPageUrl.indexOf("?");
            if (currentNode == null && q > 0) {
                let shortUrl = currentPageUrl.substr(0, q);
                currentNode = this.findMenuItemByPageUrl(firstLevelNodes, shortUrl);
            }
        }

        return <>
            <header>
                <div className="logo"><a href="/"><img src="images/logo.png" /></a></div>
                <div className="header-right">
                    {toolbar}
                </div>
            </header>
            <aside>
                <div className="sider-menu">
                    <Menu menuItems={firstLevelNodes} current={currentNode} />
                </div>
            </aside>
            <div className="layout">
                <main>
                    <div className="container-fluid fluid">
                        <div className="main page-container page-placeholder" ref={e => this.pageContainer = e || this.pageContainer}>

                        </div>

                    </div>
                </main>
            </div>

        </>

    }
}

class Menu extends React.Component<{ menuItems: MenuItem[], current: MenuItem | null | undefined }, { expendId?: string }> {

    constructor(props: Menu["props"]) {
        super(props);

        let expendId: string | undefined = undefined;
        let current = props.current as MenuItem;
        if (current != null) {
            props.menuItems.forEach(m => {
                if (m.id == current.id || m.id == current.parent?.id) {
                    expendId = m.id;
                    return;
                }
            })
        }


        this.state = { expendId };
    }

    toggle(menuItem: MenuItem) {
        let expendId = this.state.expendId;
        if (expendId == menuItem.id)
            this.setState({ expendId: undefined });
        else
            this.setState({ expendId: menuItem.id });
    }

    renderMenuItem(menuItem: MenuItem, currentNode: MenuItem | null | undefined) {
        let children = (menuItem.children || []).filter(o => !o.hidden && o.name);
        let { expendId } = this.state || {};

        let menuItemClassName: string | undefined = undefined;
        if (menuItem.id == currentNode?.id) {
            menuItemClassName = "selected";
        }
        if (menuItem.id == expendId) {
            if (menuItemClassName) {
                menuItemClassName = menuItemClassName + " selectopen";
            }
            else {
                menuItemClassName = "selectopen";
            }
        }

        return <li key={menuItem.id} className={menuItemClassName}>
            <div className="submenu-title">
                <span className="submenu-icon">
                    <a href={menuItem.path} onClick={e => {
                        if (children.length <= 0)
                            return;

                        this.toggle(menuItem);
                    }}>
                        {menuItem.icon ? <i><span className={menuItem.icon}></span></i> : null}
                        {menuItem.name}
                    </a>
                </span>
                {children.length > 0 ? <span className="arrow"></span> : null}
            </div>
            {children.length > 0 ? <ul className="menu-sub">
                {children.map(c => <li key={c.id} className={c.id == currentNode?.id ? "selected" : ""}><a href={c.path}>{c.name}</a></li>)}
            </ul> : null}
        </li>
    }

    render() {
        let { menuItems, current } = this.props;
        return <ul>
            {menuItems.filter(o => !o.hidden && o.name).map(n => this.renderMenuItem(n, current))}
        </ul>
    }
}

