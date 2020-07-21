import React from "react";
import { PageHeader, Carousel, Row, Col, Descriptions ,Badge} from 'antd';

import { LeftOutlined } from '@ant-design/icons';


function OrderDetailed(props) {
    const { orderData } = props;
    const {toDate} = props;

    return (
        
        <div className="orderDetailed">
            <PageHeader
                className="site-page-header"
                backIcon={<LeftOutlined />}
                onBack={props.fn}
                title="订单详细信息"
            />
            <Row className="orderTab">
                <Col className="orderHeader" style={{ width: "273px", height: "273px", backgroundColor: "#e0e0e0" }}>
                    <Carousel autoplay dots={true}>
                        <img style={{ width: "273px", height: "273px" }} src={orderData.gimgs} alt="" />
                    </Carousel>
                </Col>
                <Col span={18}>
                    <Descriptions
                        className="orderCenter"
                        bordered
                        column={4}
                    >
                        <Descriptions.Item label="订单号" span={2}>{orderData.gid+String(orderData.otime).substring(6,String(orderData.otime).length-1)}</Descriptions.Item>
                        <Descriptions.Item label="用户名" span={2}>{orderData.username}</Descriptions.Item>
                        <Descriptions.Item label="商品名" span={4}>{orderData.gtitle}</Descriptions.Item>
                        <Descriptions.Item label="下单时间" span={2}>{toDate(orderData.otime)}</Descriptions.Item>
                        <Descriptions.Item label="状态" span={2}>
                            {orderData.deliver==1?<Badge status="processing" text="已发货" />
                            :
                            <Badge status="gold" text="未发货" />}
                        </Descriptions.Item>
                        <Descriptions.Item label="规格" span={2}>{orderData.gsize}</Descriptions.Item>
                        <Descriptions.Item label="数量" span={2}>{orderData.count}</Descriptions.Item>
                        <Descriptions.Item label="单价" span={2}>{'￥'+orderData.gprice}</Descriptions.Item>
                        <Descriptions.Item label="总价" span={2}>{'￥'+(orderData.gprice * orderData.count).toString()}</Descriptions.Item>
                        <Descriptions.Item label="商品分类" span={2}>{orderData.goodstype}</Descriptions.Item>
                        <Descriptions.Item label="手机号码" span={2}>{orderData.phonenum}</Descriptions.Item>
                        <Descriptions.Item label="邮箱" span={2}>{orderData.email}</Descriptions.Item>
                        <Descriptions.Item label="收货人" span={2}>{orderData.myname}</Descriptions.Item>
                        <Descriptions.Item label="收货地址" span={4}>{orderData.address}</Descriptions.Item>
                    </Descriptions>

                </Col>
            </Row>
            <Row>

            </Row>

        </div>
    )
}


export default OrderDetailed;