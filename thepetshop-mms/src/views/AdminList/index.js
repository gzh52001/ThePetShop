import React, { Component } from "react";

import { Card, Col, Row, Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';

import "@/assets/css/AdminList.scss"
class AdminList extends Component {
    constructor() {
        super();
        this.state = {

        }
    }
    render() {
        return (
            <div className="site-card-wrapper">
                <Row gutter={16}>
                    <Col span={6}>
                        <Card title="管理员" bordered={true}>
                            <Avatar className="adminHeader" size={200} icon={<UserOutlined />} />
                            <h2 className="adminName">管理员名字</h2>
                        </Card>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default AdminList;