import React, { Component } from 'react';
import Navbar from '@/components/Navbar';
import { List, InputItem, Toast, Button, Flex } from 'antd-mobile';

import Loginfoot from '@/components/Loginfoot';
import regApi from '@/api/reg';
class Reg extends Component {
    constructor() {
        super();
        this.state = {
            username: '',//账号
            userpass: '',//密码
            userpass2: '',//密码2
            phone: '',//手机号
            email: '',//邮箱
            isUserError: false,//验证用户名
            isPassError: false,//验证密码
            isPass2Error: false,//确认密码
            isPhoneError: false,//验证手机号码
            isEmailError: false,//验证手机号码
        }
    }
    //用户
    user = (val)=>{
        this.setState({
            username: val,
            isUserError: false
        })
    }
    //验证用户名
    checkUser =async (val)=>{
        try{
            let p = await regApi.checkuser(val);
            if(!p.data.flag){
                this.setState({
                    isUserError:true
                })
            }
        }catch(err){
            console.log(err);
        }
    }
    //用户名感叹号
    onUserError = () => {
        Toast.fail('用户已存在', 3);
    }
    //密码
    pass = (val) => {
        this.setState({
            userpass: val,
            userpass2: '',
            isPassError: false
        })
    }
    //失去焦点验证密码
    checkPass = (val) => {
        if (!val || !/^[a-zA-Z]\w{6,10}/.test(val)) {
            this.setState({
                isPassError: true
            })
        }
    }
    //密码错误感叹号
    onPassError = () => {
        Toast.fail('请输入6-10位由字母数字组合，字母开头的密码', 3);
    }
    //确认密码
    pass2 = (val) => {
        this.setState({
            userpass2: val,
            isPass2Error: false
        })
    }
    //失去焦点判断密码是否一致
    checkPass2 = (val) => {
        const { userpass } = this.state;
        if (val != userpass || !/^[a-zA-Z]\w{6,10}/.test(val)) {
            this.setState({
                isPass2Error: true
            })
        }
    }
    //确认密码感叹号
    onPass2Error = () => {
        Toast.fail('两次输入密码不正确', 3);
    }
    //手机号码
    phone = (val) => {
        this.setState({
            phone: val,
            isPhoneError: false
        })
    }
    //验证手机号码
    checkPhone = (val) => {
        if (val.replace(/\s/g, '').length < 11 || !/^1\d{10}$/.test(val.replace(/\s/g, ''))) {
            this.setState({
                isPhoneError: true
            })
        }
    }
    // 手机号感叹号
    onPhoneError = ()=>{
        Toast.fail('请输入正确的11位手机号码', 3);
    }
    // 邮箱
    email = (val)=>{
        this.setState({
            email:val,
            isEmailError:false
        })
    }
    // 验证邮箱
    checkEmail = (val)=>{
        //数字字母开头，中间可以是多个字母下划线或'-'，
        //然后是 '@' 符号，后面是数字字母
        //然后是 '.' 符号加2-4个字母结尾
        if(!val || !/^([a-zA-Z\d])(\w|\-)+@[a-zA-Z\d]+\.[a-zA-Z]{2,4}$/.test(val)){
            this.setState({
                isEmailError:true
            })
        }
    }
    //邮箱的感叹号
    onEmailError=()=>{
        Toast.fail('请输入正确格式的邮箱，如:xxxxxx@xx.xxx,注:数字或字母开头', 3);
    }
    //注册
    reg=async ()=>{
        try{
            let p = await regApi.reg(this.state);
            console.log(p.data);
            if(p.data.flag){
                Toast.success('注册成功',2);
                this.props.history.push('/login');
            }else{
                Toast.fail('注册失败', 2);
            }
        }catch(err){
            console.log(err);
        }
    }
    render() {
        const { username, userpass, userpass2, phone, email, isPassError, isPass2Error,isPhoneError,isEmailError,isUserError } = this.state;
        // console.log(username);
        return (
            <div className='loginBox'>
                {/* 头部导航 */}
                <Navbar name="注册" props={this.props}/>
                {/* 注册标点 */}
                <List>
                    <InputItem
                        clear
                        placeholder="请输入账号"
                        value={username}
                        onChange={this.user}
                        onBlur={this.checkUser}
                        error={isUserError}
                        className={isUserError ? 'red' : null}
                        onErrorClick={this.onUserError}
                    >账号</InputItem>
                    <InputItem
                        clear
                        placeholder="请输入密码"
                        type="password"
                        value={userpass}
                        className={isPassError ? 'red' : null}
                        onBlur={this.checkPass}
                        onChange={this.pass}
                        error={isPassError}
                        onErrorClick={this.onPassError}
                    >密码</InputItem>
                    <InputItem
                        clear
                        placeholder="确认密码"
                        type="password"
                        value={userpass2}
                        className={isPass2Error ? 'red' : null}
                        onBlur={this.checkPass2}
                        onChange={this.pass2}
                        error={isPass2Error}
                        onErrorClick={this.onPass2Error}
                    >确认密码</InputItem>
                    <InputItem
                        clear
                        placeholder="请输入手机号"
                        type='phone'
                        value={phone}
                        onChange={this.phone}
                        onBlur={this.checkPhone}
                        error={isPhoneError}
                        onErrorClick={this.onPhoneError}
                        className={isPhoneError ? 'red' : null}
                    >手机号</InputItem>
                    <InputItem
                        clear
                        placeholder="请输入邮箱"
                        value={email}
                        onChange={this.email}
                        onBlur={this.checkEmail}
                        error={isEmailError}
                        onErrorClick={this.onEmailError}
                        className={isEmailError ? 'red' : null}
                    >邮箱</InputItem>
                </List>
                {/* 注册按钮 */}
                {
                     username&&userpass&&userpass2&&phone&&email?
                        <Button type="warning" className='loginbtn' style={{ marginBottom: 15, marginTop: 25 }} onClick={this.reg}>注册 </Button>
                        :
                        <Button type="warning" disabled className='loginbtn' style={{ marginBottom: 15, marginTop: 25 }} >注册</Button>
                }
                {/* 转跳注册按钮 */}
                <Flex justify='end' className='loginfoo'>
                    <a href='#/login'>&gt;&gt;&gt;去登录</a>
                </Flex>
                {/* 登录页底部 */}
                <Loginfoot />
            </div>
        )
    }
}

export default Reg;