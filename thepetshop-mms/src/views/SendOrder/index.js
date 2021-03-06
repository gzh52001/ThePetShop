import React, { Component } from "react";
// import { Route, Redirect, Switch } from 'react-router-dom';

import "@/assets/css/GoodsList.scss"
import OrderForm from '@/views/SendOrder/OrderForm'
import OrderDetailed from '@/views/SendOrder/OrderDetailed'

import OrderListApi from "@/api/OrderList";

class OrderList extends Component {
    constructor() {
        super();
        this.state = {
            DetailedFlag: true,
            loklokID: "",
            orderData: [],
            imgs: []
        }
    }
    loklok = (data) => {
        const { DetailedFlag } = this.state;
        this.setState({
            DetailedFlag: !DetailedFlag,
            loklokID: data.gid
        })
        if (DetailedFlag) {
             this.getOrderDetailed(data.uid,data.gid,data.otime);
            console.log(data)
        }
    }
    getOrderDetailed = async (uid,gid,otime) => {     //获取商品详情
        try {
            let p = await OrderListApi.getOrderDetailed(uid,gid,otime);
            if (p.data.flag) {
                this.setState({
                    orderData: p.data.data[0],
                })
            } else {
                console.log("获取失败")
            }
        } catch (error) {
            console.log(error);
        }
    }
    // getGoodsDetailed = async (gid) => {     //获取商品详情
    //     try {
    //         let p = await GoodsListApi.getGoodsDetailed(gid);
    //         if (p.data.flag) {
    //             console.log(p.data.data[0])
    //             let a = JSON.parse(p.data.data[0].gimgs);
    //             this.setState({
    //                 goodsData: p.data.data[0],
    //                 imgs: a
    //             })
    //         } else {
    //             console.log("获取失败")
    //         }
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }
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
                    <OrderDetailed data={this.state.loklokID} imgs={this.state.imgs} orderData={this.state.orderData} fn={this.loklok} toDate={this.toDate}></OrderDetailed>
                </div>
            </>
        )
    }
}

export default OrderList;