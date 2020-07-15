import React, { Component } from 'react';
import Navbar from '@/components/Navbar';
import { List, InputItem, Toast, Button,Flex } from 'antd-mobile';
import './style.scss';

class Login extends Component {
    constructor() {
        super();
        this.state = {
            username: '',//账号
            userpass: '',//密码
            isUserError: false,//账号是否为空
            isPassError: false,//密码是否为空
        }
    }
    changeUser = (val) => {//获取user
        this.setState({
            isUserError: false
        })

        this.setState({
            username: val
        })
    }
    changePass = (val) => {//获取pass
        this.setState({
            isPassError: false
        })
        this.setState({
            userpass: val
        })
    }
    isuser = (val) => {//判断user是否为空
        if (!val) {
            this.setState({
                isUserError: true
            })
        }
    }
    ispass = (val) => {//判断密码是否为空
        if (!val) {
            this.setState({
                isPassError: true
            })
        }
    }
    onErroruser = () => {//点击账号红色感叹号显示
        Toast.offline('请输入账号', 1);
    }
    onErrorpass = () => {//点击密码红色感叹号显示
        Toast.offline('请输入密码', 1);
    }
    render() {
        const { username, userpass, isUserError, isPassError } = this.state;
        // console.log(username);
        return (
            <div className='loginBox'>
                <Navbar name="登录" />
                <List className='login'>
                    <InputItem
                        clear
                        placeholder="请输入账号"
                        value={username}
                        onChange={this.changeUser}
                        onBlur={this.isuser}
                        error={isUserError}
                        onErrorClick={this.onErroruser}
                    >账号</InputItem>
                    <InputItem
                        clear
                        placeholder="请输入密码"
                        value={userpass}
                        onChange={this.changePass}
                        onBlur={this.ispass}
                        error={isPassError}
                        onErrorClick={this.onErrorpass}
                    >密码</InputItem>
                </List>
                {
                    username && userpass ?
                        <Button type="primary" className='loginbtn'>登录</Button>
                        :
                        <Button type="primary" disabled className='loginbtn'>登录</Button>
                }
                <Flex justify='between'>
                    <Flex.Item>注册</Flex.Item>
                    <Flex.Item>忘记密码</Flex.Item>
                </Flex>
            </div>
        )
    }
}

export default Login;