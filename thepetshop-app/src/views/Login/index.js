import React, { Component } from 'react';
import Navbar from '@/components/Navbar';
import { List, InputItem, Toast, Button,Flex} from 'antd-mobile';
import './style.scss';

import Loginfoot from '@/components/Loginfoot';
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
        Toast.fail('请输入账号', 1);
    }
    onErrorpass = () => {//点击密码红色感叹号显示
        Toast.fail('请输入密码', 1);
    }
    render() {
        const { username, userpass, isUserError, isPassError } = this.state;
        // console.log(username);
        return (
            <div className='loginBox'>
                {/* 头部导航 */}
                <Navbar name="登录" />
                {/* 登录注册框 */}
                <List className='login'>
                    <InputItem
                        clear
                        placeholder="请输入账号"
                        value={username}
                        onChange={this.changeUser}
                        onBlur={this.isuser}
                        error={isUserError}
                        onErrorClick={this.onErroruser}
                        className={isUserError ? 'red' : null}
                    >账号</InputItem>
                    <InputItem
                        clear
                        placeholder="请输入密码"
                        value={userpass}
                        onChange={this.changePass}
                        onBlur={this.ispass}
                        error={isPassError}
                        onErrorClick={this.onErrorpass}
                        className={isPassError ? 'red' : null}
                        type="password"
                    >密码</InputItem>
                </List>
                {/* 登录按钮 */}
                {
                    username && userpass ?
                        <Button type="warning" className='loginbtn' style={{marginBottom:15}}>登录</Button>
                        :
                        <Button type="warning" disabled className='loginbtn' style={{marginBottom:15}} >登录</Button>
                }
                {/* 转跳注册按钮 */}
                <Flex justify='between' className='loginfoo'>
                    <a href='#/reg'>注册账号</a>
                    <a>忘记密码</a>
                </Flex>
                {/* 登录页底部 */}
                <Loginfoot/>
            </div>
        )
    }
}

export default Login;