import React, { Component } from "react";

import { Card, Col, Row, Avatar } from 'antd';
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
                console.log(p.data)
                this.setState({
                    adminList: p.data.data,
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
            <div className="site-card-wrapper">
                <Row gutter={15}>
                    {
                        adminList.map(item => (
                            <Col  key={item.aid} style={{marginBottom: "15px"}}>
                                <Card title={item.grade === 1 ? "超级管理员" : "管理员"} style={{backgroundColor: "#f0f0f0"}} bordered={true}>
                                    <Avatar className="adminHeader" size={185} icon={<UserOutlined />} />
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