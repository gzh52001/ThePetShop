import React, { Component ,Suspense,lazy} from "react";
import { Route, Redirect, Switch } from 'react-router-dom';

import { VerifyLogin } from '@/utils/HOC';

import { DownCircleOutlined } from '@ant-design/icons';
import { Layout, Menu, Row, Col, Dropdown, Button ,Spin} from 'antd';
import { HomeOutlined, TeamOutlined, ShopOutlined,  SnippetsOutlined } from '@ant-design/icons';

import "@/assets/css/Main.scss"
const Home = lazy(()=>import('@/views/Home'))
const AdminList = lazy(()=>import('@/views/AdminList'))
const AdminReg = lazy(()=>import('@/views/AdminList/AdminReg'))
const UserList = lazy(()=>import('@/views/UserList'))
const GoodsList = lazy(()=>import('@/views/GoodsList'))
const OrderList = lazy(()=>import('@/views/OrderList'))
const AddGoods = lazy(()=>import("@/views/AddGoods"))
const ModifyGoods = lazy(()=>import("@/views/ModifyGoods"))
const NoSendOrder = lazy(()=>import("@/views/NoSendOrder"))
const SendOrder = lazy(()=>import("@/views/SendOrder"))

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
                    tltle: "用户列表",
                    path: "/user/userList",
                    component: UserList,
                },
                {
                    tltle: "活跃用户",
                    path: "/user/userList2",
                    component: Home,
                },
                {
                    tltle: "用户列表",
                    path: "/user/userList3",
                    component: Home,
                },
                {
                    tltle: "商品列表",
                    path: "/goods/goodsList",
                    component: GoodsList,
                },
                {
                    tltle: "添加商品",
                    path: "/goods/addGoods",
                    component: AddGoods,
                },
                {
                    tltle: "修改商品信息",
                    path: "/goods/modifyGoods",
                    component: ModifyGoods,
                },
                {
                    tltle: "订单列表",
                    path: "/order/orderList",
                    component: OrderList,
                },
                {
                    tltle: "未发货订单",
                    path: "/order/noSendOrder",
                    component: NoSendOrder,
                },
                {
                    tltle: "已发货订单",
                    path: "/order/sendOrder",
                    component: SendOrder,
                },
            ],

        }
    }
    checkAdmin = () => {
        let userData = localStorage.getItem("userData");
        let { grade } = JSON.parse(userData);
        if (grade === 1) {
            return true
        }
        return false
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
    goMe = () =>{
        const { history } = this.props;
        history.push("/backstage/adminList")
    }
    rootSubmenuKeys = ['sub1', 'sub2', 'sub3', 'sub4', 'sub5'];
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
        let adminName = localStorage.getItem("userData");
        adminName = JSON.parse(adminName);
        const { contentRouter } = this.state;
        const backstageRouter = contentRouter.slice(0, 3);
        const userRouter = contentRouter.slice(3, 6);
        const goodsRouter = contentRouter.slice(6, 9);
        const orderRouter = contentRouter.slice(9, 12);
        const { defaultPath } = this.state;
        // console.log(this.props.history.location.pathname)
        const { SubMenu } = Menu;
        const { Header, Content, Sider } = Layout;
        const menu = (
            <Menu>
                <Menu.Item>
                    <a rel="noopener noreferrer" href="###" onClick={this.goMe}>个人信息</a>
                </Menu.Item>
                <Menu.Item>
                    <a rel="noopener noreferrer" href="###" onClick={this.loginOut}>注销登录</a>
                </Menu.Item>
            </Menu>
        );
        return (
            <div>
                <Layout style={{ overflow: "hidden" }}>
                    <Header className="header">
                        <div className="logo">
                            <img src={require('../../assets/img/a.jpg')} alt="" />
                            <h2>后台管理系统</h2>
                        </div>
                        <Row className="operation">
                            <Col className="col" span={12}>欢迎您：<span>{adminName.myname}</span></Col>
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
                                    {this.checkAdmin() ?
                                        backstageRouter.map(item => (
                                            <Menu.Item key={item.path}>{item.tltle}</Menu.Item>
                                        )) :
                                        backstageRouter.map(item => (
                                            item.path === "/backstage/adminReg" ?
                                                <React.Fragment key="10086"></React.Fragment> :
                                                <Menu.Item key={item.path}>{item.tltle}</Menu.Item>
                                        ))
                                    }
                                </SubMenu>
                                <SubMenu key="sub2" icon={<TeamOutlined />} title="用户管理">
                                            <Menu.Item key="/user/userList">用户列表</Menu.Item>
                                </SubMenu>
                                <SubMenu key="sub3" icon={<ShopOutlined />} title="商品管理">
                                    {
                                        goodsRouter.map(item => (
                                            <Menu.Item key={item.path}>{item.tltle}</Menu.Item>
                                        ))
                                    }
                                </SubMenu>
                                <SubMenu key="sub4" icon={<SnippetsOutlined />} title="订单管理">
                                    {
                                        orderRouter.map(item => (
                                            <Menu.Item key={item.path}>{item.tltle}</Menu.Item>
                                        ))
                                    }
                                </SubMenu>
                                {/* <SubMenu key="sub5" icon={<BarChartOutlined />} title="统计">

                                </SubMenu> */}
                            </Menu>
                        </Sider>
                        <Layout style={{ minWidth: "1000px", backgroundColor: "rgb(255, 255, 255)" }}>
                            <Content
                                className="site-layout-background"
                                style={{
                                    padding: 0,
                                    margin: 0,
                                    minHeight: 280,
                                }}
                            >
                                <Suspense fallback={<div className="example"><Spin /></div>}>
                                <Switch>
                                    {
                                        contentRouter.map(item => (
                                            <Route key={item.tltle} path={item.path} component={item.component}></Route>
                                        ))
                                    }
                                    <Redirect from="/" to="/home"></Redirect>
                                </Switch>
                                </Suspense>
                            </Content>
                        </Layout>
                    </Layout>
                </Layout>
            </div>
        )
    }
}

export default VerifyLogin(Main);