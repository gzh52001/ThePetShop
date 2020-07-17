import React, { Component } from "react";
import { Input, Select, Table, Button, Radio, PageHeader, Avatar, Row, Col, Descriptions, Badge } from 'antd';

import { LeftOutlined, UserOutlined } from '@ant-design/icons';
class UserDetailed extends Component {
    constructor() {
        super();
        this.state = {

        }
    }
    render() {
        return (

            <div className="UserDetailed">
                <PageHeader
                    className="site-page-header"
                    backIcon={<LeftOutlined />}
                    onBack={this.props.fn}
                    title="用户详细信息"
                />
                <Row className="userTab">
                    <Col className="userHeader" span={4}>
                        <Avatar className="portrait" alt="???" src={[require("@/assets/img/defaultheader.png")]} size={128} />
                        <h2>用户名</h2>
                    </Col>
                    <Col span={20}>
                        <Descriptions  layout="vertical" bordered column={4}>
                            <Descriptions.Item label="ID">1</Descriptions.Item>
                            <Descriptions.Item label="性别">男</Descriptions.Item>
                            <Descriptions.Item label="手机号码">13138716402</Descriptions.Item>
                            <Descriptions.Item label="邮箱">742345977@qq.com</Descriptions.Item>
                            <Descriptions.Item label="身份证号码">2018-04-24 18:00:00</Descriptions.Item>
                            <Descriptions.Item label="注册日期" span={1}>2019-04-24 18:00:00</Descriptions.Item>
                            <Descriptions.Item label="最后在线日期" span={1}>2019-04-24 18:00:00</Descriptions.Item>
                            <Descriptions.Item label="状态" span={1}>
                                <Badge status="processing" text="Running" />
                            </Descriptions.Item>
                            <Descriptions.Item label="地区" span={2}>广东省广州市</Descriptions.Item>
                            <Descriptions.Item label="历史订单数量">5</Descriptions.Item>
                            <Descriptions.Item label="总交易金额">￥60.00</Descriptions.Item>
                            <Descriptions.Item label="Config Info">
                            </Descriptions.Item>
                        </Descriptions>
                    </Col>
                </Row>
                <Row>

                </Row>

            </div>
        )
    }
}

export default UserDetailed;