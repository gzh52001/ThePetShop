import React, { Component } from "react";

import { Card, Col, Row, Avatar, Badge } from 'antd';
import { UserOutlined } from '@ant-design/icons';

import "@/assets/css/AdminList.scss"

import AdminListApi from "@/api/AdminList";
class AdminList extends Component {
    constructor() {
        super();
        this.state = {
            adminList: [],
            total: null
        }
    }
    componentDidMount() {
        this.getAdminList()
    }
    getAdminList = async () => {     //获取商品列表
        try {
            let p = await AdminListApi.getAdminList();
            if (p.data.flag) {
                console.log(p.data.data)
                let { username } = JSON.parse(localStorage.getItem("userData"))
                console.log(p.data.data)
                let newList = Object.assign([], p.data.data)
                p.data.data.forEach((item, index) => {
                    if (item.username == username) {
                        newList.splice(index, 1)
                        newList.unshift(item)
                    }
                })
                this.setState({
                    adminList: newList,
                    total: p.data.data.length
                })
            } else {
                console.log("获取失败")
            }
        } catch (error) {
            console.log(error);
        }
    }
    render() {
        const { adminList } = this.state;
        return (
            <div className="site-card-wrapper" style={{ padding: 60 }}>
                <Row gutter={66}>
                    {
                        adminList.map((item, index) => (
                            <Col key={item.aid} style={{ marginBottom: "60px" }}>
                                <Card title={item.grade === 1 ? "超级管理员" : "管理员"} style={{ backgroundColor: "#f0f0f0" }} bordered={true}>
                                    {index==0?<Badge className="adminStatus" status="processing" text="当前" />:''}
                                    <Avatar className="adminHeader" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1595482395309&di=e35fc7d5d101ec4dfed1d582e5cfce19&imgtype=0&src=http%3A%2F%2Ft9.baidu.com%2Fit%2Fu%3D3172368063%2C2201035007%26fm%3D193" size={185} icon={<UserOutlined />} />
                                    <h2 className="adminName">{item.myname}</h2>
                                </Card>
                            </Col>
                        ))
                    }
                </Row>
            </div>
        )
    }
}

export default AdminList;