import React, { Component } from "react";
import { Route, Redirect, Switch } from 'react-router-dom';

import { VerifyLogin } from '@/utils/HOC';

import { DownCircleOutlined } from '@ant-design/icons';
import { Layout, Menu, Row, Col, Dropdown, Button } from 'antd';
import { HomeOutlined, TeamOutlined, ShopOutlined, BarChartOutlined } from '@ant-design/icons';

import "@/assets/css/Main.scss"
import Home from '@/views/Home'
import AdminList from '@/views/AdminList'
import AdminReg from '@/views/AdminList/AdminReg'
import UserList from '@/views/UserList'

class Main extends Component {
    constructor() {
        super();
        this.state = {
            contentRouter: [
                {
                    tltle: "主页",
                    path: "/home",
                    component: Home,
                },
                {
                    tltle: "管理员名单",
                    path: "/backstage/adminList",
                    component: AdminList,
                },
                {
                    tltle: "管理员注册",
                    path: "/backstage/adminReg",
                    component: AdminReg,
                },
                {
                    tltle: "操作记录",
                    path: "/backstage/records",
                    component: Home,
                },
                {
                    tltle: "用户列表",
                    path: "/user/userList",
                    component: UserList,
                },
                {
                    tltle: "用户列表",
                    path: "/user/userList2",
                    component: Home,
                },
                {
                    tltle: "用户列表",
                    path: "/user/userList3",
                    component: Home,
                },
                {
                    tltle: "用户列表",
                    path: "/user/userList4",
                    component: Home,
                },
            ],
           
        }
    }
    goPath = ({ item, key, keyPath, domEvent }) => {
        const { history } = this.props;
        history.push(key);
    }
    loginOut = () => {
        localStorage.removeItem("userData");
        const { history } = this.props;
        history.go(0);
    }
    rootSubmenuKeys = ['sub1', 'sub2', 'sub3', 'sub4'];
    onOpenChange = (openKeys) => {
        const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1);
        if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
            this.setState({ openKeys });
        } else {
            this.setState({
                openKeys: latestOpenKey ? [latestOpenKey] : [],
            });
        }
    };
    render() {
        const { contentRouter } = this.state;
        const backstageRouter = contentRouter.slice(0, 4);
        const userRouter = contentRouter.slice(4, 8);
        const { defaultPath } = this.state;
        const { SubMenu } = Menu;
        const { Header, Content, Sider } = Layout;
        const menu = (
            <Menu>
                <Menu.Item>
                    <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">个人信息</a>
                </Menu.Item>
                <Menu.Item>
                    <a target="_blank" rel="noopener noreferrer" href="http://www.taobao.com/">预留</a>
                </Menu.Item>
                <Menu.Item>
                    <a rel="noopener noreferrer" href="http://localhost:3000/#/login" onClick={this.loginOut}>注销登录</a>
                </Menu.Item>
            </Menu>
        );
        return (
            <div>
                <Layout style={{ overflow: "hidden" }}>
                    <Header className="header">
                        <div className="logo">
                            <img src="" alt="" />
                            <h2>后台管理系统</h2>
                        </div>
                        <Row className="operation">
                            <Col className="col" span={12}>欢迎您：<span>{"LHCIAO"}</span></Col>
                            <Col span={12}>
                                <Dropdown overlay={menu} placement="bottomCenter">
                                    <Button className="personal" type="link">个人中心<DownCircleOutlined style={{ fontSize: "16px" }} /></Button>
                                </Dropdown>
                            </Col>
                        </Row>
                    </Header>
                    <Layout className="main" style={{ height: "100vh", paddingTop: "60px" }}>
                        <Sider width={230} className="site-layout-background">
                            <Menu
                                className="menu"
                                mode="inline"
                                openKeys={this.state.openKeys}
                                onOpenChange={this.onOpenChange}
                                defaultSelectedKeys={defaultPath}
                                defaultOpenKeys={['sub1']}
                                style={{ height: '100%', borderRight: 0 }}
                                onClick={this.goPath}
                            >
                                <SubMenu key="sub1" icon={<HomeOutlined />} title="后台管理">
                                    {
                                        backstageRouter.map(item => (
                                            <Menu.Item key={item.path}>{item.tltle}</Menu.Item>
                                        ))
                                    }
                                </SubMenu>
                                <SubMenu key="sub2" icon={<TeamOutlined />} title="用户管理">
                                    {
                                        userRouter.map(item => (
                                            <Menu.Item key={item.path}>{item.tltle}</Menu.Item>
                                        ))
                                    }
                                </SubMenu>
                                <SubMenu key="sub3" icon={<ShopOutlined />} title="商品管理">

                                </SubMenu>
                                <SubMenu key="sub4" icon={<BarChartOutlined />} title="统计">

                                </SubMenu>
                            </Menu>
                        </Sider>
                        <Layout style={{ minWidth: "1000px", padding: '15px 15px 15px 20px', backgroundColor: "#e0e0e0" }}>
                            <Content
                                className="site-layout-background"
                                style={{
                                    padding: 0,
                                    margin: 0,
                                    minHeight: 280,
                                }}
                            >
                                <Switch>
                                    {
                                        contentRouter.map(item => (
                                            <Route key={item.tltle} path={item.path} component={item.component}></Route>
                                        ))
                                    }
                                    <Redirect from="/" to="/home"></Redirect>
                                </Switch>
                            </Content>
                        </Layout>
                    </Layout>
                </Layout>
            </div>
        )
    }
}

export default VerifyLogin(Main);