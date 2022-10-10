import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Breadcrumb, Layout, Menu, PageHeader } from "antd";
import * as Icons from "@ant-design/icons";
import { errors } from "../errors";
import "./master.scss";

const { Header, Sider, Content, Footer } = Layout;

interface Props {
    menuItems: MenuItem[]
}

export default function Master(props: Props) {
    if (!props) throw errors.argumentNull("props");

    let naviate = useNavigate();
    let menuItems = props.menuItems || [];
    return <Layout className="main">
        <Header className="header"></Header>
        <Layout>
            <Sider width={200} className="site-layout-background">
                <Menu
                    mode="inline"
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={['page-data']}
                    style={{ height: '100%', borderRight: 0 }}
                    items={menuItems.map(m => {
                        if (m.icon && !Icons[m.icon]) throw errors.iconNotExists(m.icon);

                        return {
                            key: m.id, icon: m.icon ? React.createElement(Icons[m.icon]) : null,
                            label: m.name,
                            onClick: () => { naviate(m.path) },
                            children: m.children ? m.children.map(c => {
                                if (c.icon && !Icons[c.icon]) throw errors.iconNotExists(c.icon);

                                return {
                                    key: c.id, label: c.name, icon: c.icon ? React.createElement(Icons[c.icon]) : null,
                                    onClick: () => { naviate(c.path) }
                                }
                            }) : null
                        }

                    })}

                />
                {menuItems.map(m => <Menu
                    key={m.id}
                    mode="inline"
                    style={{ height: '100%', borderRight: 0 }}
                    onClick={() => naviate(m.path)}
                    items={(m.children || []).map(o => ({
                        key: o.id,
                        icon: o.icon ? Icons[o.icon] : null
                    }))}
                />)}
            </Sider>
            <Layout className="site-layout">

                {/* <PageHeader className="page-header" title="基础详情页" >

            </PageHeader> */}
                {/* <Breadcrumb className="navigate">
                <Breadcrumb.Item>User</Breadcrumb.Item>
                <Breadcrumb.Item>Bill</Breadcrumb.Item>
            </Breadcrumb> */}
                <Content
                    className="content" >
                    <Outlet />
                </Content>
                <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
            </Layout>
        </Layout>
    </Layout>
}



