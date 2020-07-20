import React, { Component } from 'react';
import { List, InputItem, Toast,Button } from 'antd-mobile';
import Navbar from '@/components/Navbar';
import './scss/changepass.scss';
import LoginApi from '@/api/login';
import {getUser,removeInfo} from '@/utils/auth';

class ChangePass extends Component {
    constructor() {
        super();
        this.state = {
            psw1: "",
            psw2: "",
            ispsw1: false,
            ispsw2: false
        }
    }
    //旧密码
    psw = (val) => {
        this.setState({
            psw1: val,
            ispsw1: false
        })
    }
    //验证旧密码
    checkPsw = (val) => {
        if (!val) {
            this.setState({
                ispsw1: true
            })
        }
    }
    //旧密码错误感叹号
    onPassError = () => {
        Toast.fail('旧密码不能为空', 3);
    }
    //新密码
    psw2 = (val) => {
        this.setState({
            psw2: val,
            ispsw2: false
        })
    }
    //验证新密码
    checkPsw2 = (val) => {
        if (!val || !/^[a-zA-Z]\w{6,10}/.test(val)) {
            this.setState({
                ispsw2: true
            })
        }
    }
    //新密码红色感叹号
    onPass2Error = () => {
        Toast.fail('请输入6-10位由字母数字组合，字母开头的密码', 3);
    }
    //修改密码
    changepass = async ()=>{
        const {psw1,psw2} = this.state;
        const uid = getUser().uid;
        try{
            let p = await LoginApi.editpsw(uid,psw1,psw2);
            if(p.data.flag){
                Toast.success('修改成功，请重新登录',2);
                removeInfo();
                this.props.history.push('/login');
            }else{
                Toast.success('修改失败',2)
            }
        }catch(err){
            console.log(err);
        }
    }
    render() {
        const { psw1, psw2, ispsw1, ispsw2 } = this.state;
        return (
            <div className='changepass'>
                <Navbar name='修改密码' props={this.props} />
                <List>
                    <InputItem
                        type='password'
                        clear
                        placeholder="请输入密码"
                        value={psw1}
                        onChange={this.psw}
                        onBlur={this.checkPsw}
                        className={ispsw1 ? 'red' : null}
                        error={ispsw1}
                        onErrorClick={this.onPassError}
                    >密码</InputItem>
                    <InputItem
                        clear
                        placeholder="请输入新密码"
                        value={psw2}
                        onChange={this.psw2}
                        onBlur={this.checkPsw2}
                        className={ispsw2 ? 'red' : null}
                        error={ispsw2}
                        onErrorClick={this.onPass2Error}
                    >新密码</InputItem>
                    {/* 修改密码按钮 */}
                    {
                        psw1 && psw2 && !ispsw1 && !ispsw2 ?
                            <Button type="warning" className='loginbtn' style={{ marginBottom: 15, marginTop: 25 }} onClick={this.changepass}>修改密码 </Button>
                            :
                            <Button type="warning" disabled className='loginbtn' style={{ marginBottom: 15, marginTop: 25 }} >修改密码</Button>
                    }
                </List>
            </div>
        )
    }

}
export default ChangePass;