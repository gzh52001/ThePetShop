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
    getGoodsDetailed = async (gid) => {     //获取商品详情
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
    toDate = (now) => {
        let a = new Date(now)
        var year = a.getFullYear();  //取得4位数的年份
        var month = a.getMonth() + 1;  //取得日期中的月份，其中0表示1月，11表示12月
        var date = a.getDate();      //返回日期月份中的天数（1到31）
        var hour = a.getHours();     //返回日期中的小时数（0到23）
        var minute = a.getMinutes(); //返回日期中的分钟数（0到59）
        var second = a.getSeconds(); //返回日期中的秒数（0到59）
        return year + "-" + month + "-" + date + " " + this.formatDate(hour) + ":" + this.formatDate(minute) + ":" + this.formatDate(second);
    }
    formatDate=(time)=>{
        return time<10?"0"+time:time
    }
    render() {
        return (
            <>
                <div style={{ display: this.state.DetailedFlag ? "block" : "none" }}>
                    <OrderForm data={this.loklok} toDate={this.toDate}></OrderForm>
                </div>
                <div style={{ display: this.state.DetailedFlag ? "none" : "block" }}>
                    <OrderDetailed data={this.state.loklokID} imgs={this.state.imgs} goodsData={this.state.goodsData} fn={this.loklok}></OrderDetailed>
                </div>
            </>
        )
    }
}

export default OrderList;