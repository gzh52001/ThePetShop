import React, { Component } from 'react';
import Navbar from '@/components/Navbar';
import { List, InputItem, Toast, Button, Flex, Checkbox } from 'antd-mobile';
import './style.scss';

import Loginfoot from '@/components/Loginfoot';
import loginApi from '@/api/login';
import {setToken,setUser} from '@/utils/auth';
class Login extends Component {
    constructor() {
        super();
        this.state = {
            username: '',//账号
            userpass: '',//密码
            isUserError: false,//账号是否为空
            isPassError: false,//密码是否为空
            keep: false,//是否七天
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
    // 是否七天
    isseven=(e)=>{
        // console.log(e.target.checked);
        this.setState({
            keep:e.target.checked
        })
    }
    //登录
    login =async () => {
        const  {username,userpass,keep} = this.state;
        try{
            let p = await loginApi.login(username,userpass,keep);
            if(p.data.flag){
                const {token,uid,userface,username} = p.data.data;
                //设置token
                if(token){
                    setToken(token);
                }
                setUser({uid,userface,username});
                this.setState({
                    username: '',//账号
                    userpass: '',//密码
                    isUserError: false,//账号是否为空
                    isPassError: false,//密码是否为空
                    keep: false,//是否七天
                });
                Toast.success('登陆成功',2);
                this.props.history.push('/main/home');
            }else{
                Toast.fail('登陆失败', 2);
            }
        }catch(err){
            console.log(err);
        }
    }
    render() {
        const { username, userpass, isUserError, isPassError } = this.state;
        // console.log(username);
        return (
            <div className='loginBox'>
                {/* 头部导航 */}
                <Navbar name="登录" props={this.props} />
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
                {/* 七天免登录 */}
                <List className='sevenday'>
                    <Checkbox.CheckboxItem onClick={this.isseven}>
                        七天免登录
                    </Checkbox.CheckboxItem>
                </List>
                {/* 登录按钮 */}
                {
                    username && userpass ?
                        <Button type="warning" className='loginbtn' style={{ marginBottom: 15,marginTop:10 }}  onClick={this.login}>登录</Button>
                        :
                        <Button type="warning" disabled className='loginbtn' style={{ marginBottom: 15,marginTop:10}} >登录</Button>
                }
                {/* 转跳注册按钮 */}
                <Flex justify='between' className='loginfoo'>
                    <a href='#/reg'>注册账号</a>
                    <a>忘记密码</a>
                </Flex>
                {/* 登录页底部 */}
                <Loginfoot />
            </div>
        )
    }
}

export default Login;