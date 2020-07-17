import React, { Component } from "react";

import "@/assets/css/Login.scss"

import { Card, Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

import LoginApi from "@/api/Login";

class Login extends Component {
    constructor() {
        super();
        this.state = {
            checked: true
        }
    }
    autoLogin = () => {
        const { checked } = this.state;
        this.setState({
            checked: !checked
        })
    }
    onFinish = async (values) => {
        try {
            console.log(values.username, values.password)
            let p = await LoginApi.loginIn(values.username, values.password, true);
            if (p.data.flag) {
                const { checked } = this.state;
                const { history } = this.props;
                if (checked) {
                    localStorage.setItem("userData", JSON.stringify({ username: values.username, token: p.data.data.token }))
                }else{
                    localStorage.setItem("userData", JSON.stringify({ username: values.username, }))
                }
                history.go(0);
            } else {
                console.log("登录失败")
            }
        } catch (error) {
            console.log(error);
        }

    }
    render() {

        return (
            <div className="login">
                <Card className="loginBox" title="后台管理系统" bordered={false}>
                    <Form
                        name="normal_login"
                        className="login-form"
                        layout="vertical"
                        initialValues={{ remember: true }}
                        onFinish={this.onFinish}
                    >
                        <Form.Item
                            name="username"
                            rules={[{ required: true, message: '请输入用户名!' }]}
                        >
                            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="用户名" />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={[{ required: true, message: '请输入密码!' }]}
                        >
                            <Input
                                prefix={<LockOutlined className="site-form-item-icon" />}
                                type="password"
                                placeholder="密码"
                            />
                        </Form.Item>
                        <Form.Item>
                            <Form.Item name="remember" valuePropName="checked" noStyle>
                                <Checkbox onClick={this.autoLogin}>自动登录</Checkbox>
                            </Form.Item>
                            <Form.Item name="member" valuePropName="checked" noStyle style={{ float: "right" }}>
                                <Button type="link" className="forget">忘记密码？</Button>
                            </Form.Item>
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                登录
                            </Button>
                        </Form.Item>
                    </Form>
                </Card>
            </div>
        )
    }
}

export default Login;