import React, { Component } from "react";

import {
    Form,
    Input,
    Select,
    Button,
    Upload,
    Modal,
    message,
    Tabs,
    Row,
    Col,
    List,
    Avatar,
    Spin,
    Affix
} from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import InfiniteScroll from 'react-infinite-scroller';

import "@/assets/css/GoodsList.scss"

import GoodsListApi from "@/api/GoodsList";

class ModifyGoods extends Component {
    constructor() {
        super();
        this.state = {
            goodsData: {},
            page: 1,
            goodsDetailed: false,
            previewVisible: false,
            previewImage: '',
            previewTitle: '',
            fileList: [],
            searchText: "gtitle",
            searchGoodsList: [],
            total: 0,
            searchValue: [],
            tabsKey: "1",
            loading: false,
            hasMore: true,
        }
        this.loadMore = this.debounce(this.loadMore, 1000)
    }
    editGoods = async (gid,gtitle,gdesc,gbrandtitle,tid,gprice,gsize,stock,gimgs) => {     //删除商品
        try {
            let p = await GoodsListApi.editGoods(gid,gtitle,gdesc,gbrandtitle,tid,gprice,gsize,stock,gimgs);
            if (p.data.flag) {
                message.success('修改成功！');
            } else {
                message.error('修改失败！未知错误');
            }
        } catch (error) {
            console.log(error);
        }
    }
    getGoodsDetailed = async (gid) => {     //获取商品详情
        try {
            let p = await GoodsListApi.getGoodsDetailed(gid);
            if (p.data.flag) {
                console.log(p.data.data)
                let imgs = JSON.parse(p.data.data[0].gimgs);
                const { fileList } = this.state;
                imgs.map((item, index) => {
                    fileList.push({
                        uid: index + 1,
                        name: `img${index + 1}.jpg`,
                        type: "image/",
                        status: 'done',
                        url: item
                    })
                })
                this.setState({
                    goodsData: p.data.data[0],
                    imgs,
                    goodsDetailed: true,
                    fileList
                })
            } else {
                message.error('未找到该商品！');
            }
        } catch (error) {
            console.log(error);
        }
    }
    searchAllGoods = async (type, value, page, num) => {    //模糊搜索商品
        try {
            let p = await GoodsListApi.searchAllGoods(type, value, page, num);
            if (p.data.flag) {
                if (this.state.searchGoodsList.length >= 1) {
                    const { searchGoodsList } = this.state;
                    p.data.data.p2.forEach(item => {
                        searchGoodsList.push(item)
                    })
                    this.setState({
                        searchGoodsList,
                        loading: false,
                    })
                    console.log("增加了", this.state.searchGoodsList)
                } else {
                    this.setState({
                        searchGoodsList: p.data.data.p2,
                        total: p.data.data.total
                    })
                    console.log("没变化", this.state.searchGoodsList)
                }
            } else {
                message.error('查找的内容不存在！');
            }
        } catch (error) {
            message.error('查找的内容不存在！');
        }
    }
    searchAllGoodsList = (value) => {
        this.setState({
            searchValue: value,
            total: 0,
            loading: false,
            hasMore: true,
            searchGoodsList: [],
            page: 1,
        })
        this.searchAllGoods(this.state.searchText, value, 1, 10)
    }
    searchGoods = (value) => {
        this.getGoodsDetailed(value);
    }
    handleCancel = () => this.setState({ previewVisible: false });
    handlePreview = async file => {
        if (!file.url && !file.preview) {
            // file.preview = await this.getBase64(file.originFileObj);
        }

        this.setState({
            previewImage: file.url || file.preview,
            previewVisible: true,
            previewTitle: file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
        });
    };
    tabsOnClick = (key) => {
        this.setState({
            tabsKey: key
        })
    }
    handleChange = ({ fileList }) => this.setState({ fileList });

    tidChange = (value) => {
        console.log(`selected ${value}`);
    }
    sizeChange(value) {
        console.log(`selected ${value}`);
    }
    onFinish = (values) => {

        switch (values.tid) {
            case "狗狗主粮":
                values.tid = 1
                break;
            case "狗狗零食":
                values.tid = 2
                break;
            case "狗狗窝垫":
                values.tid = 3
                break;
            case "狗狗玩具":
                values.tid = 4
                break;
            case "狗狗清洁":
                values.tid = 5
                break;
            case "狗狗保健":
                values.tid = 6
                break;
            case "狗狗护理":
                values.tid = 7
                break;
            case "狗狗生活":
                values.tid = 8
                break;
            case "狗狗牵引":
                values.tid = 9
                break;
            case "出游洗澡":
                values.tid = 10
                break;
            case "狗狗服饰":
                values.tid = 11
                break;
            case "狗狗美容":
                values.tid = 12
                break;
            default:
                break;
        }
        this.editGoods(values.gid,values.gtitle,values.gdesc,values.gbrandtitle,values.tid,values.gprice,values.gsize,values.stock,values.gimgs)
        console.log(values);
    };
    searchText = (value) => {
        this.setState({
            searchText: value
        })
    }
    debounce(fn, ms = 500) {
        let timeoutId
        return function () {
            clearTimeout(timeoutId)
            timeoutId = setTimeout(() => {
                fn.apply(this, arguments)
            }, ms)
        }
    }
    loadMore = () => {
        console.log(this.state.total)
        if (this.state.searchGoodsList.length >= this.state.total) {
            message.warning('没有更多了');
            this.setState({
                hasMore: false,
                loading: false,
            });
            return;
        } else {
            let { page } = this.state;
            page++
            this.setState({
                page
            })
            this.searchAllGoods(this.state.searchText, this.state.searchValue, this.state.page, 10)
        }
    }
    render() {
        const { goodsData } = this.state;
        const { Option } = Select;
        const { previewVisible, previewImage, fileList, previewTitle } = this.state;
        const uploadButton = (
            <div>
                <PlusOutlined />
                <div className="ant-upload-text">上传图片</div>
            </div>
        );
        const { searchGoodsList } = this.state;
        const { Search } = Input;
        const { TabPane } = Tabs;
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 8 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 },
            },
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 16,
                    offset: 8,
                },
            },
        };
        let fenclass;
        switch (goodsData.tid) {
            case 1:
                fenclass = "狗狗主粮"
                break;
            case 2:
                fenclass = "狗狗零食"
                break;
            case 3:
                fenclass = "狗狗窝垫"
                break;
            case 4:
                fenclass = "狗狗玩具"
                break;
            case 5:
                fenclass = "狗狗清洁"
                break;
            case 6:
                fenclass = "狗狗保健"
                break;
            case 7:
                fenclass = "狗狗护理"
                break;
            case 8:
                fenclass = "狗狗生活"
                break;
            case 9:
                fenclass = "狗狗牵引"
                break;
            case 10:
                fenclass = "出游洗澡"
                break;
            case 11:
                fenclass = "狗狗服饰"
                break;
            case 12:
                fenclass = "狗狗美容"
                break;
            default:
                break;
        }
        return (
            <div className="ModifyGoods">
                {
                    this.state.goodsDetailed === true ?
                        <>
                            <Button type="primary"
                                style={{ position: "absolute", top: "5px", left: "30px", zIndex: 999 }}
                                onClick={() => this.setState({
                                    goodsDetailed: false,
                                    goodsData: {},
                                    fileList: []
                                })}>
                                返回列表
                            </Button>
                            <Form
                                style={{ width: "1000px", marginTop: "20px" }}
                                {...formItemLayout}
                                form={this.form}
                                name="register"
                                onFinish={this.onFinish}
                                initialValues={{
                                    gid: goodsData.gid,
                                    gtitle: goodsData.gtitle,
                                    gdesc: goodsData.gdesc,
                                    gbrandtitle: goodsData.gbrandtitle,
                                    tid: fenclass,
                                    gprice: goodsData.gprice,
                                    gimgs: JSON.parse(goodsData.gimgs),
                                    gsize: JSON.parse(goodsData.gsize),
                                    stock: goodsData.stock
                                }}
                                scrollToFirstError
                            >
                                <Form.Item
                                    name="gid"
                                    label="ID"
                                >
                                    <Input disabled={true} />
                                </Form.Item>
                                <Form.Item
                                    name="gtitle"
                                    label="商品名"
                                    hasFeedback
                                    rules={[
                                        {
                                            required: true,
                                            message: '商品名不能为空！',
                                        },
                                        {
                                            whitespace: true,
                                            message: '不能输入空格！',
                                        }
                                    ]}
                                >
                                    <Input allowClear={true} />
                                </Form.Item>

                                <Form.Item
                                    name="gdesc"
                                    label="商品描述"
                                    hasFeedback
                                >
                                    <Input allowClear={true} />
                                </Form.Item>

                                <Form.Item
                                    name="gbrandtitle"
                                    label="商铺名"
                                    hasFeedback
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please confirm your password!',
                                        },
                                    ]}
                                >
                                    <Input allowClear={true} />
                                </Form.Item>

                                <Form.Item
                                    name="tid"
                                    label="商品分类"
                                    hasFeedback
                                    rules={[{ required: true, message: 'Please input your nickname!', whitespace: true }]}
                                >
                                    <Select style={{ width: "100%" }} onChange={this.tidChange}>
                                        <Option value="1">狗狗主粮</Option>
                                        <Option value="2">狗狗零食</Option>
                                        <Option value="3">狗狗窝垫</Option>
                                        <Option value="4">狗狗玩具</Option>
                                        <Option value="5">狗狗清洁</Option>
                                        <Option value="6">狗狗保健</Option>
                                        <Option value="7">狗狗护理</Option>
                                        <Option value="8">狗狗生活</Option>
                                        <Option value="9">狗狗牵引</Option>
                                        <Option value="10">出游洗澡</Option>
                                        <Option value="11">狗狗服饰</Option>
                                        <Option value="12">狗狗美容</Option>
                                    </Select>
                                </Form.Item>

                                <Form.Item
                                    name="gprice"
                                    label="商品价格"
                                    hasFeedback
                                    rules={[
                                        {
                                            required: true,
                                            message: '请输入商品价格！'
                                        },
                                        {
                                            message: '商品价格只能输入数字！',
                                            pattern: /^[0-9]+$/
                                        }
                                    ]}
                                >
                                    <Input allowClear={true} />
                                </Form.Item>

                                <Form.Item
                                    name="gsize"
                                    label="商品规格"
                                >
                                    <Select mode="tags"
                                        style={{ width: '100%' }}
                                        placeholder="输入一个规格后按回车，输入下一个规格"
                                        onChange={this.sizeChange}
                                    >
                                    </Select>
                                </Form.Item>

                                <Form.Item
                                    name="stock"
                                    label="库存"
                                    hasFeedback
                                    rules={[{ required: true, message: '请输入库存！' },
                                    {
                                        message: '库存只能输入数字！',
                                        pattern: /^[0-9]+$/
                                    }]}
                                >
                                    <Input allowClear={true} />
                                </Form.Item>
                                <Form.Item
                                    name="gimgs"
                                    label="商品详情图片"
                                    rules={[{ required: true, message: 'Please input website!' }]}
                                >
                                    <div className="clearfix">
                                        <Upload
                                            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                            listType="picture-card"
                                            fileList={fileList}
                                            multiple={true}
                                            defaultFileList={fileList}
                                            onPreview={this.handlePreview}
                                            onChange={this.handleChange}

                                        >
                                            {fileList.length >= 8 ? null : uploadButton}
                                        </Upload>
                                        <Modal
                                            visible={previewVisible}
                                            title={previewTitle}
                                            footer={null}
                                            onCancel={this.handleCancel}
                                        >
                                            <img alt="example" style={{ width: '100%' }} src={previewImage} />
                                        </Modal>
                                    </div>
                                </Form.Item>
                                <Form.Item {...tailFormItemLayout}>
                                    <Button type="primary" htmlType="submit">
                                        修改
                                    </Button>
                                </Form.Item>
                            </Form>
                        </>
                        :
                        <>
                            <Tabs defaultActiveKey={this.state.tabsKey} centered onTabClick={this.tabsOnClick}>
                                <TabPane tab="精确搜索" key="1">
                                    <Search className="searchInput" placeholder="请输入商品ID" onSearch={value => this.searchGoods(value)} enterButton />
                                    <p style={{ position: "absolute", left: "50%", transform: "translateX(-50%)", top: "150px" }}>通过ID查找要修改的商品信息</p>
                                </TabPane>
                                <TabPane tab="模糊搜索" key="2">
                                    <Row className="searchInputBox">
                                        <Col style={{ position: "relative" }}>
                                            <Select defaultValue="商品名" className="searchText" onChange={this.searchText}>
                                                <Option value="gtitle">商品名</Option>
                                                <Option value="gprice">价格</Option>
                                                <Option value="gxiaoliang">销量</Option>
                                            </Select>
                                            <Search className="searchInput2" defaultValue={this.state.searchValue} placeholder="请输入关键字" onSearch={value => this.searchAllGoodsList(value)} enterButton />
                                        </Col>
                                    </Row>
                                    {
                                        searchGoodsList.length >= 1 ?
                                            <>
                                                <div className="searchTitle"><p><span>{`当前已显示 ${this.state.searchGoodsList.length} 条`}</span>{`共找到 ${this.state.total} 条数据`}</p></div>
                                                <Row className="searchShowBox" >
                                                    <InfiniteScroll
                                                        style={{ position: "relative" }}
                                                        initialLoad={false}
                                                        pageStart={0}
                                                        loadMore={this.loadMore}
                                                        hasMore={!this.state.loading && this.state.hasMore}
                                                        useWindow={false}
                                                    >
                                                        <List
                                                            style={{ width: "730px", paddingTop: "25px" }}
                                                            itemLayout="horizontal"
                                                            dataSource={searchGoodsList}
                                                            renderItem={item => (
                                                                <List.Item style={{ padding: "10px 20px 10px 10px", cursor: "pointer " }} onClick={() => this.searchGoods(item.gid)}>
                                                                    <List.Item.Meta
                                                                        avatar={<Avatar size={50} shape="square" src={item.gimgs} />}
                                                                        title={item.gtitle}
                                                                        description={"价格：￥" + item.gprice + "\xa0\xa0\xa0\xa0\xa0" + `销量：${item.gxiaoliang}`}
                                                                    />
                                                                </List.Item>
                                                            )}

                                                        >
                                                            {
                                                                !this.state.loading && this.state.hasMore && this.state.searchGoodsList.length >= 10?
                                                                    <List.Item style={{ height: "40px" }}>
                                                                        <div className="demo-loading-container">
                                                                            <Spin style={{ paddingTop: "10px" }} />
                                                                        </div>
                                                                    </List.Item> :
                                                                    <></>
                                                            }
                                                        </List>
                                                    </InfiniteScroll>
                                                </Row>
                                            </>
                                            : <></>

                                    }

                                    <p style={{ position: "absolute", left: "50%", transform: "translateX(-50%)", top: "150px" }}>通过关键字查找需要修改的商品信息</p>
                                </TabPane>
                            </Tabs>
                        </>
                }
            </div>
        )
    }
}

export default ModifyGoods;