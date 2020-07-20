import React, { Component } from "react";
import { PageHeader, Avatar, Row, Col, Descriptions, Badge } from 'antd';

import { LeftOutlined } from '@ant-design/icons';


function UserDetailed(props){
        let isState = Math.floor(Math.random()*2)
        const {userData,toDate} = props;
        return (
            <div className="UserDetailed">
                <PageHeader
                    className="site-page-header"
                    backIcon={<LeftOutlined />}
                    onBack={props.fn}
                    title="用户详细信息"
                />
                <Row className="userTab">
                    <Col className="userHeader" span={4}>
                        <Avatar className="portrait" alt="???" src={userData.userface} size={128} />
                        <h2>{userData.username}</h2>
                    </Col>
                    <Col span={20}>
                        <Descriptions  layout="vertical" bordered column={4}>
                            <Descriptions.Item label="ID">{userData.uid}</Descriptions.Item>
                            <Descriptions.Item label="性别">{userData.uid%2==0?'男':'女'}</Descriptions.Item>
                            <Descriptions.Item label="手机号码">{userData.phonenum}</Descriptions.Item>
                            <Descriptions.Item label="邮箱">{userData.email}</Descriptions.Item>
                            <Descriptions.Item label="身份证号码">{'440883'+userData.time}</Descriptions.Item>
                            <Descriptions.Item label="注册日期" span={1}>{toDate(userData.time)}</Descriptions.Item>
                            <Descriptions.Item label="最后在线日期" span={1}>{userData.uid}</Descriptions.Item>
                            <Descriptions.Item label="状态" span={1}>
                                {
                                    isState==0?
                                    <Badge status="processing" text="在线" />
                                    :
                                    <Badge status="error" text="不在线" />
                                }
                            </Descriptions.Item>
                            <Descriptions.Item label="地区" span={2}>{userData.uid}</Descriptions.Item>
                            <Descriptions.Item label="历史订单数量">{userData.uid}</Descriptions.Item>
                            <Descriptions.Item label="总交易金额">{userData.uid}</Descriptions.Item>
                            <Descriptions.Item label="描述">林海聪牛逼</Descriptions.Item>
                        </Descriptions>
                    </Col>
                </Row>
                <Row>

                </Row>

            </div>
        )
    }


export default UserDetailed;