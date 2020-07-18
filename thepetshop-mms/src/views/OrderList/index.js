import React, { Component } from "react";
// import { Route, Redirect, Switch } from 'react-router-dom';

import "@/assets/css/GoodsList.scss"
import OrderForm from '@/views/OrderList/OrderForm'
import OrderDetailed from '@/views/OrderList/OrderDetailed'

import GoodsListApi from "@/api/GoodsList";

class OrderList extends Component {
    constructor() {
        super();
        this.state = {
            DetailedFlag: true,
            loklokID: "",
            goodsData: [],
            imgs: []
        }
    }
    loklok = (id) => {
        const { DetailedFlag } = this.state;
        this.setState({
            DetailedFlag: !DetailedFlag,
            loklokID: id.gid
        })
        if (DetailedFlag) {
            this.getGoodsDetailed(id.gid);
        }
    }
    getGoodsDetailed = async (gid) => {     //获取用户列表
        try {
            let p = await GoodsListApi.getGoodsDetailed(gid);
            if (p.data.flag) {
                console.log(p.data.data[0])
                let a = JSON.parse(p.data.data[0].gimgs);
                this.setState({
                    goodsData: p.data.data[0],
                    imgs: a
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
                <div style={{ display: this.state.DetailedFlag ? "block" : "none" }}>
                    <OrderForm data={this.loklok}></OrderForm>
                </div>
                <div style={{ display: this.state.DetailedFlag ? "none" : "block" }}>
                    <OrderDetailed data={this.state.loklokID} imgs={this.state.imgs} goodsData={this.state.goodsData} fn={this.loklok}></OrderDetailed>
                </div>
            </>
        )
    }
}

export default OrderList;