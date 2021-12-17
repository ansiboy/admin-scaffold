import * as React from "react";
import { MasterPage, MasterPageProps } from './master-page';
import { masterPageNames } from './names';
import { Application } from 'maishu-chitu-react';
import { MenuItem } from "../website-config";
// import { parseUrl } from "maishu-chitu";

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
        return <li>
            <div className="submenu-title">
                <span className="submenu-icon">
                    <a href={menuItem.path}>
                        <i><span className="icon-home"></span></i>
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

        // return <>
        //     <div className="first" style={{ display: hideFirst ? "none" : "" }}>
        //         <ul className="list-group">
        //             {firstLevelNodes.map((o, i) =>
        //                 <li key={i} className={o == firstLevelNode ? "list-group-item active" : "list-group-item"}
        //                     style={{ cursor: 'pointer', display: o.type != "menu" ? "none" : '' }}
        //                     onClick={() => this.showPageByNode(o)}>
        //                     {o.type == "spliter" ? <hr /> : <> <i className={o.icon}></i>
        //                         <span menu-id={o.id} sort-number={o.sortNumber}>{o.name}</span></>}
        //                 </li>
        //             )}
        //         </ul>
        //     </div>
        //     <div className="second" style={{ display: hideSecond ? "none" : "" }}>
        //         <ul className="list-group">
        //             {(firstLevelNode ? (firstLevelNode.children || []) : []).filter(o => o.type == "menu" || o.type == "spliter").map((o, i) =>
        //                 <li key={i} className={o == secondLevelNode ? "list-group-item active" : "list-group-item"}
        //                     style={{ cursor: o.type == "menu" ? 'pointer' : null }}
        //                     page-url={o.path}
        //                     onClick={() => this.showPageByNode(o)}>
        //                     {o.type == "menu" ? <>
        //                         <i className={o.icon}></i>
        //                         <span menu-id={o.id} sort-number={o.sortNumber}>{o.name}</span></> :
        //                         <hr />}
        //                 </li>
        //             )}
        //         </ul>
        //     </div>
        //     <div className="main">
        //         <nav className="navbar navbar-default">
        //             {this.state.toolbar}
        //         </nav>
        //         <div className={`page-container page-placeholder`}
        //             ref={(e: HTMLElement) => this.pageContainer = e || this.pageContainer}>
        //         </div>
        //     </div>

        // </>
        return <>
            <header>
                <div className="logo"><a href="#"><img src="images/logo.png" /></a></div>
                <div className="header-right">
                    <div className="notice">
                        <a href="#">
                            <div className="bage">
                                <i><span className="icon-message"></span></i>
                                <span className="num">10</span>
                            </div>
                        </a>
                    </div>
                    <div className="header-account">
                        <div className="account-info"><img src="images/face.gif" />Deng Xiao Li</div>
                        <div className="header-dropdown-menu">
                            <div className="dropdown-menu-con">
                                <ul>
                                    <li>
                                        <a href="#">
                                            <i><span className="icon-user1"></span></i>
                                            <span>My Account</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#">
                                            <i><span className="icon-settings"></span></i>
                                            <span>Settings</span>
                                        </a>
                                    </li>
                                    <li className="logout">
                                        <a href="#">
                                            <i><span className="icon-logout"></span></i>
                                            <span>Log out</span>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="trigger">
                        <i>
                            <span className="icon-menu-close svg1"></span>
                            <span className="icon-menu-open svg2"></span>
                        </i>
                    </div>
                </div>
            </header>
            <aside>
                <div className="sider-menu">
                    <ul>
                        {firstLevelNodes.map(n => this.renderMenuItem(n))}
                        <li>
                            <div className="submenu-title">
                                <span className="submenu-icon">
                                    <a href="#">
                                        <i><span className="icon-home"></span></i>
                                        首页
                                    </a>
                                </span>
                            </div>
                        </li>
                        <li className="selectopen">
                            <div className="submenu-title">
                                <span className="submenu-icon">
                                    <a href="#">
                                        <i><span className="icon-product"></span></i>
                                        <span>产品管理</span>
                                    </a>
                                </span>
                                <span className="arrow"></span>
                            </div>
                            <ul className="menu-sub">
                                <li><a href="#">产品列表</a></li>
                                <li><a href="#">分类管理</a></li>
                                <li><a href="#">品牌管理</a></li>
                                <li><a href="#">发布商品</a></li>
                                <li className="selected"><a href="#">评论管理</a></li>
                                <li><a href="#">产品问答</a></li>
                            </ul>
                        </li>
                        <li>
                            <div className="submenu-title">
                                <span className="submenu-icon">
                                    <a href="#">
                                        <i><span className="icon-order1"></span></i>
                                        <span>订单管理</span>
                                    </a>
                                </span>
                                <span className="arrow"></span>
                            </div>
                            <ul className="menu-sub">
                                <li><a href="#">全部订单</a></li>
                                <li><a href="#">待付款</a></li>
                                <li><a href="#">待发货</a></li>
                                <li><a href="#">已发货</a></li>
                                <li><a href="#">已完成</a></li>
                                <li><a href="#">退款中</a></li>
                                <li><a href="#">已退款</a></li>
                                <li><a href="#">取消订单</a></li>
                            </ul>
                        </li>
                        <li>
                            <div className="submenu-title">
                                <span className="submenu-icon">
                                    <a href="#">
                                        <i><span className="icon-blog"></span></i>
                                        <span>博客管理</span>
                                    </a>
                                </span>
                                <span className="arrow"></span>
                            </div>
                            <ul className="menu-sub">
                                <li><a href="#">新增博客</a></li>
                                <li><a href="#">博客列表</a></li>
                            </ul>
                        </li>
                        <li>
                            <div className="submenu-title">
                                <span className="submenu-icon">
                                    <a href="#">
                                        <i><span className="icon-user"></span></i>
                                        <span>会员管理</span>
                                    </a>
                                </span>
                            </div>
                        </li>
                        <li>
                            <div className="submenu-title">
                                <span className="submenu-icon">
                                    <a href="#">
                                        <i><span className="icon-account"></span></i>
                                        <span>账号管理</span>
                                    </a>
                                </span>
                                <span className="arrow"></span>
                            </div>
                            <ul className="menu-sub">
                                <li><a href="#">账号中心</a></li>
                                <li><a href="#">权限管理</a></li>
                                <li><a href="#">结算管理</a></li>
                            </ul>
                        </li>
                        <li>
                            <div className="submenu-title">
                                <span className="submenu-icon">
                                    <a href="#">
                                        <i><span className="icon-message2"></span></i>
                                        <span>信息管理</span>
                                    </a>
                                </span>
                                <span className="arrow"></span>
                            </div>
                            <ul className="menu-sub">
                                <li><a href="#">留言管理</a></li>
                                <li><a href="#">邮件管理</a></li>
                                <li><a href="#">销售可视化</a></li>
                            </ul>
                        </li>
                        <li>
                            <div className="submenu-title">
                                <span className="submenu-icon">
                                    <a href="#">
                                        <i><span className="icon-website"></span></i>
                                        <span>建站管理</span>
                                    </a>
                                </span>
                                <span className="arrow"></span>
                            </div>
                            <ul className="menu-sub">
                                <li><a href="#">Product management</a></li>
                                <li><a href="#">Product management</a></li>
                                <li><a href="#">Product management</a></li>
                                <li><a href="#">Product management</a></li>
                                <li><a href="#">Product management</a></li>
                            </ul>
                        </li>
                        <li>
                            <div className="submenu-title">
                                <span className="submenu-icon">
                                    <a href="#">
                                        <i><span className="icon-shipping"></span></i>
                                        <span>运费管理</span>
                                    </a>
                                </span>
                                <span className="arrow"></span>
                            </div>
                            <ul className="menu-sub">
                                <li><a href="#">Product management</a></li>
                                <li><a href="#">Product management</a></li>
                                <li><a href="#">Product management</a></li>
                                <li><a href="#">Product management</a></li>
                                <li><a href="#">Product management</a></li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </aside>
            <div className="layout">
                <main>
                    <div className="container-fluid fluid">
                        <div className="main page-container page-placeholder" ref={(e: HTMLElement) => this.pageContainer = e || this.pageContainer}>
                            {/* <div className="row fluid">
                                <div className="error-body">
                                    <div className="error-layout">
                                        <div className="error-main">
                                            <div className="error-pic"><img src="images/404.png" /></div>
                                            <div className="error-con">
                                                <div className="error-title">404</div>
                                                <div className="error-subtitle">抱歉，您访问的页面不存在。</div>
                                                <div className="error-btn">
                                                    <a href="#">返回首页</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        
                         */}

                        </div>

                    </div>
                </main>
            </div>

        </>

    }
}

