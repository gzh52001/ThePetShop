import React from "react";
import { PageHeader, Carousel, Row, Col, Descriptions, Badge } from 'antd';

import { LeftOutlined } from '@ant-design/icons';


function OrderDetailed(props) {
    const { goodsData } = props;
    let fenclass;
    if (goodsData.tid === 1) {
        fenclass = "狗狗主粮"
    } else if (goodsData.tid === 2) {
        fenclass = "狗狗零食"

    } else if (goodsData.tid === 3) {
        fenclass = "狗狗窝垫"

    } else if (goodsData.tid === 4) {
        fenclass = "狗狗玩具"

    } else if (goodsData.tid === 5) {
        fenclass = "狗狗清洁"
    }
    const { imgs } = props;
    return (
        <div className="goodsDetailed">
            <PageHeader
                className="site-page-header"
                backIcon={<LeftOutlined />}
                onBack={props.fn}
                title="商品详细信息"
            />
            <Row className="goodsTab">
                <Col className="goodsHeader" style={{ width: "273px", height: "273px", backgroundColor: "#e0e0e0" }}>
                    {
                        imgs !== "" ?
                            <Carousel autoplay dots={true}>
                                {
                                    imgs.map((item) =>
                                        <div key={item}>
                                            <img style={{ width: "273px", height: "273px" }} src={item} alt="" />
                                        </div>
                                    )
                                }
                            </Carousel> : <></>
                    }
                </Col>
                <Col span={18}>
                    <Descriptions
                        className="goodsCenter"
                        bordered
                        column={4}
                    >
                        <Descriptions.Item label="ID" span={4}>{goodsData.gid}1</Descriptions.Item>
                        <Descriptions.Item label="商品名" span={4}>{goodsData.gtitle}</Descriptions.Item>
                        <Descriptions.Item label="商品描述" span={4}>{goodsData.gdesc}</Descriptions.Item>
                        <Descriptions.Item label="商铺名" span={4}>{goodsData.gbrandtitle}</Descriptions.Item>
                        <Descriptions.Item label="价格" span={2}>{goodsData.gprice}</Descriptions.Item>
                        <Descriptions.Item label="销量" span={2}>{goodsData.gxiaoliang}</Descriptions.Item>
                        <Descriptions.Item label="销售热度" span={2}>{goodsData.ghot}</Descriptions.Item>
                        <Descriptions.Item label="库存" span={2}>{goodsData.stock}</Descriptions.Item>
                        <Descriptions.Item label="商品分类" span={2}>{fenclass}</Descriptions.Item>
                    </Descriptions>

                </Col>
            </Row>
            <Row>

            </Row>

        </div>
    )
}


export default OrderDetailed;