import React, { Component } from "react";

import {
    Form,
    Input,
    Tooltip,
    Cascader,
    Select,
    Row,
    Col,
    Checkbox,
    Button,
    AutoComplete,
    Upload,
    Modal,
    message
} from 'antd';
import { QuestionCircleOutlined, PlusOutlined } from '@ant-design/icons';

import GoodsListApi from "@/api/GoodsList";
class AddGoods extends Component {
    constructor() {
        super();
        this.state = {
            previewVisible: false,
            previewImage: '',
            previewTitle: '',
            fileList: [

            ],
        }
    }
    addGoods = async (gtitle,gdesc,gbrandtitle,tid,gprice,gsize,stock,gimgs) => {     //删除商品
        try {
            let p = await GoodsListApi.addGoods(gtitle,gdesc,gbrandtitle,tid,gprice,gsize,stock,gimgs);
            if (p.data.flag) {
                message.success('添加成功！');
            } else {
                message.error('添加失败！未知错误');
            }
        } catch (error) {
            console.log(error);
        }
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

    handleChange = ({ fileList }) => this.setState({ fileList });

    tidChange = (value) => {
        console.log(`selected ${value}`);
    }
    sizeChange(value) {
        console.log(`selected ${value}`);
    }
    onFinish = (values) => {
        this.addGoods(values.gtitle,values.gdesc,values.gbrandtitle,values.tid,values.gprice,values.gsize,values.stock,null)
        console.log('Received values of form: ',values);
    };
    render() {
        const { Option } = Select;
        const { previewVisible, previewImage, fileList, previewTitle } = this.state;
        const uploadButton = (
            <div>
                <PlusOutlined />
                <div className="ant-upload-text">上传图片</div>
            </div>
        );
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
        return (
            <div><Form
                style={{ width: "1000px", marginTop: "20px" }}
                {...formItemLayout}
                form={this.form}
                name="register"
                onFinish={this.onFinish}
                scrollToFirstError
            >
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
                    rules={[{ required: true, message: 'Please input website!' }]}
                >
                    <Select mode="tags"
                        style={{ width: '100%' }}
                        placeholder="Tags Mode"
                        onChange={this.sizeChange}
                    >
                    </Select>
                </Form.Item>

                <Form.Item
                    name="stock"
                    label="库存"
                    hasFeedback
                    rules={[
                    
                    {
                        message: '库存只能输入数字！',
                        pattern: /^[0-9]+$/
                    }]}
                >
                    <Input allowClear={true} />
                </Form.Item>
                <Form.Item
                    // name="gimgs"
                    label="商品图片"
                    // rules={[{ required: true, message: 'Please input website!' }]}
                >
                    <div className="clearfix">
                        <Upload
                            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                            listType="picture-card"
                            fileList={fileList}
                            multiple={true}
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
                        添加
                    </Button>
                </Form.Item>
            </Form></div>
        )
    }
}

export default AddGoods;