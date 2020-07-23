import React, { Component } from "react";

import { Card, Avatar, Timeline } from 'antd';
import { UserOutlined, TeamOutlined, ShopOutlined, SnippetsOutlined, BarsOutlined, PlusSquareOutlined, FormOutlined, ExceptionOutlined, FileDoneOutlined } from '@ant-design/icons';

import "@/assets/css/Home.scss"
class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    onChange = (link) => {
        console.log('Anchor:OnChange', link);
    };
    render() {
        const { myname } = JSON.parse(localStorage.getItem("userData"));
        return (
            <div className="home" >
                <Timeline style={{ width: "200px", float: "right", padding: "100px 20px 170px"}}>
                    <Timeline.Item style={{ fontWeight: "600", fontSize: "18px"}} dot={<BarsOutlined style={{backgroundColor:"rgba(255, 255, 255, 0.5)"}}/>}>快捷导航</Timeline.Item>
                    <Timeline.Item onClick={() => { this.props.history.push("/user/userList") }} style={{ cursor: "pointer" }} dot={<TeamOutlined />}>用户列表</Timeline.Item>
                    <Timeline.Item onClick={() => { this.props.history.push("/goods/goodsList") }} style={{ cursor: "pointer" }} dot={<ShopOutlined />}>商品列表</Timeline.Item>
                    <Timeline.Item onClick={() => { this.props.history.push("/order/orderList") }} style={{ cursor: "pointer" }} dot={<SnippetsOutlined />}>订单列表</Timeline.Item>
                    <Timeline.Item onClick={() => { this.props.history.push("/goods/addGoods") }} style={{ cursor: "pointer" }} dot={<PlusSquareOutlined />}>添加商品</Timeline.Item>
                    <Timeline.Item onClick={() => { this.props.history.push("/goods/modifyGoods") }} style={{ cursor: "pointer" }} dot={<FormOutlined />}>修改商品</Timeline.Item>
                    <Timeline.Item onClick={() => { this.props.history.push("/order/noSendOrder") }} style={{ cursor: "pointer" }} dot={<ExceptionOutlined />}>未发货订单</Timeline.Item>
                    <Timeline.Item onClick={() => { this.props.history.push("/order/sendOrder") }} style={{ cursor: "pointer" }} dot={<FileDoneOutlined />}>已发货订单</Timeline.Item>
                </Timeline>
                <Card bordered={false} style={{ width: 250, position: "absolute", top: "50%", left: "50%",transform: "translateY(-50%) translateX(-50%)" }}>
                    <Avatar className="adminHeader" size={150} src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1595482395309&di=e35fc7d5d101ec4dfed1d582e5cfce19&imgtype=0&src=http%3A%2F%2Ft9.baidu.com%2Fit%2Fu%3D3172368063%2C2201035007%26fm%3D193" icon={<UserOutlined />} />
                    <h2 className="adminName">{myname}</h2>
                </Card>
            </div>
        )
    }
}

export default Home;