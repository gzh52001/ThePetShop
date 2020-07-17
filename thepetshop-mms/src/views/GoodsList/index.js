import React, { Component } from "react";
// import { Route, Redirect, Switch } from 'react-router-dom';

import "@/assets/css/UserList.scss"
import GoodsForm from '@/views/GoodsList/GoodsForm'
import GoodsDetailed from '@/views/GoodsList/GoodsDetailed'

import UserListApi from "@/api/UserList";

class GoodsList extends Component {
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
                    <GoodsForm data={this.loklok}></GoodsForm>
                </div>
                <div style={{display: this.state.DetailedFlag?"none":"block"}}>
                    <GoodsDetailed data={this.state.loklokID} userData={this.state.userData} fn={this.loklok}></GoodsDetailed>
                </div>
            </>
        )
    }
}

export default GoodsList;