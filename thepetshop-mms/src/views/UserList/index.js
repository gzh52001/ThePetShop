import React, { Component } from "react";
// import { Route, Redirect, Switch } from 'react-router-dom';

import "@/assets/css/UserList.scss"
import UserForm from '@/views/UserList/UserForm'
import UserDetailed from '@/views/UserList/UserDetailed'

import UserListApi from "@/api/UserList";

class UserList extends Component {
    constructor() {
        super();
        this.state = {
            DetailedFlag: true,
            loklokID: "",
            userData: []
        }
    }
    loklok = (id) =>{
        const {DetailedFlag} = this.state;
        this.setState({
            DetailedFlag: !DetailedFlag,
            loklokID: id.uid
        })
        if(DetailedFlag){
            this.getUserDetailed(id.uid);
        }
    }
    getUserDetailed = async (uid) => {     //获取用户列表
        try {
            let p = await UserListApi.getUserDetailed(uid);
            if (p.data.flag) {
                this.setState({
                    userData: p.data.data[0],
                })
            } else {
                console.log("获取失败")
            }
        } catch (error) {
            console.log(error);
        }
    }
    toDate = (now) => {
        let a = new Date(now)
        var year = a.getFullYear();  //取得4位数的年份
        var month = a.getMonth() + 1;  //取得日期中的月份，其中0表示1月，11表示12月
        var date = a.getDate();      //返回日期月份中的天数（1到31）
        var hour = a.getHours();     //返回日期中的小时数（0到23）
        var minute = a.getMinutes(); //返回日期中的分钟数（0到59）
        var second = a.getSeconds(); //返回日期中的秒数（0到59）
        return year + "-" + month + "-" + date + " " + hour + ":" + minute + ":" + second;
    }
    render() {
        return (
            <>
                <div style={{display: this.state.DetailedFlag?"block":"none"}}>
                    <UserForm data={this.loklok} toDate={this.toDate}></UserForm>
                </div>
                <div style={{display: this.state.DetailedFlag?"none":"block"}}>
                    <UserDetailed data={this.state.loklokID} userData={this.state.userData} fn={this.loklok} toDate={this.toDate}></UserDetailed>
                </div>
            </>
        )
    }
}

export default UserList;