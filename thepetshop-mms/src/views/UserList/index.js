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
    render() {
        return (
            <>
                <div style={{display: this.state.DetailedFlag?"block":"none"}}>
                    <UserForm data={this.loklok}></UserForm>
                </div>
                <div style={{display: this.state.DetailedFlag?"none":"block"}}>
                    <UserDetailed data={this.state.loklokID} userData={this.state.userData} fn={this.loklok}></UserDetailed>
                </div>
            </>
        )
    }
}

export default UserList;