import React, { Component } from "react";

import { Form, Input, Button, Row, Col ,message} from 'antd';
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';

import "@/assets/css/AdminList.scss"

import LoginApi from "@/api/Login";
class AdminReg extends Component {
    constructor() {
        super();
        this.state = {
            captchaImg: null,
            captchaText: "",
            checkCaptcha: null,
            checkUserName: null,
        }
    }
    componentDidMount() {
        this.getCaptcha()
    }
    getCaptcha = async () => {
        try {
            let p = await LoginApi.getCaptcha();
            if (p.data.flag) {
                this.setState({
                    captchaImg: p.data.data.svg,
                    captchaText: p.data.data.text.toLowerCase()
                })
            } else {
                console.log("登录失败")
            }
        } catch (error) {
            console.log(error);
        }
    }
    checkUserName = async (rule, value, callback) =>{
        if (value === null || value?value.length < 6:"") {
            return Promise.reject("不能少于6个字符");      
        }else{
            try {
                let p = await LoginApi.checkUserName(value);
                if (p.data.flag) {
                    this.setState({
                        checkUserName: true
                    })
                    return Promise.resolve();
                } else {
                    return Promise.reject("用户名已存在！"); 
                }
            } catch (error) {
                console.log(error);
            }
        }
    }
    checkCaptcha = (rule, value, callback) => {
        if (value !== null && this.state.captchaText !== value) {
            this.setState({
                checkCaptcha: false
            })
            return Promise.reject();
        } else {
            this.setState({
                checkCaptcha: true
            })
            return Promise.resolve();
        }
    }
    adminReg = async (username, password) => {
        try {
            let p = await LoginApi.adminReg(username, password);
            if (p.data.flag) {
                console.log(p.data)
            } else {
                console.log("注册失败")
            }
        } catch (error) {
            console.log(error);
        }
    }
    onFinish = values => {
        if (values.captcha.toLowerCase() === this.state.captchaText && this.state.checkUserName===true) {
            console.log('验证成功:', values);
            this.adminReg(values.username, values.password)
        }
        console.log('Success:', values);
    };

    onFinishFailed = errorInfo => {
        message.error('内容不能为空！');
    };
    render() {
        const { captchaImg } = this.state;
        const layout = {
            labelCol: { span: 8 },
            wrapperCol: { span: 16 },
        };
        const tailLayout = {
            wrapperCol: { offset: 8, span: 16 },
        };

        return (
            <div className="adminReg">
                <Form
                    className="regBox"
                    {...layout}
                    name="basic"
                    initialValues={{ remember: true }}
                    onFinish={this.onFinish}
                    onFinishFailed={this.onFinishFailed}
                >
                    <Form.Item
                        label="账号"
                        name="username"
                        hasFeedback
                        rules={[{ required: true, message: '请输入用户名！' },
                        {
                            whitespace: true,
                            message: '不能输入空格！',
                        },
                        {
                            validator: this.checkUserName
                        }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="密码"
                        name="password"
                        hasFeedback
                        rules={[{ required: true, message: '请输入密码！' },
                        {
                            message:'密码不能少于6位，且包含字母',
                            pattern: /^(?=.*[a-z])(?=.*\d)[a-zA-Z\d]{8,}$/
                        },
                        {
                            whitespace: true,
                            message: '不能输入空格！',
                        },]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item
                        name="confirm"
                        label="确认密码"
                        dependencies={['password']}
                        hasFeedback
                        rules={[
                            {
                                required: true,
                                message: '请确认密码！',
                            },
                            ({ getFieldValue }) => ({
                                validator(rule, value) {
                                    if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject('两次输入的密码不一致！');
                                },
                            }),
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>
                    <Form.Item label="验证码">
                        <Row gutter={8}>
                            <Col span={12}>
                                <Form.Item
                                    name="captcha"
                                    noStyle
                                    hasFeedback
                                    rules={[
                                        { required: true, message: '请输入验证码！' },
                                        {
                                            validator: this.checkCaptcha
                                        }]}
                                >
                                    <Input suffix={this.state.checkCaptcha === null ? <></> : this.state.checkCaptcha ? <CheckCircleOutlined style={{ color: "#58bc58" }} /> : <CloseCircleOutlined style={{ color: "red" }} />} />
                                </Form.Item>
                            </Col>
                            <Col span={12} style={{ position: "relative" }}>
                                <div className="captchaImg" dangerouslySetInnerHTML={{ __html: captchaImg }} />
                                <Button
                                    onClick={this.getCaptcha}
                                    type="link"
                                    style={{ position: "absolute", left: "100px", top: "0" }}
                                >看不清，换一张</Button>
                            </Col>
                        </Row>
                    </Form.Item>
                    <Form.Item {...tailLayout}>
                        <Button type="primary" htmlType="submit">
                            注册
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        )
    }
}

export default AdminReg;