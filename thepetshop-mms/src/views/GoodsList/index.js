import React, { Component } from "react";
// import { Route, Redirect, Switch } from 'react-router-dom';

import "@/assets/css/GoodsList.scss"
import GoodsForm from '@/views/GoodsList/GoodsForm'
import GoodsDetailed from '@/views/GoodsList/GoodsDetailed'

import GoodsListApi from "@/api/GoodsList";

class GoodsList extends Component {
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
    render() {
        return (
            <>
                <div style={{ display: this.state.DetailedFlag ? "block" : "none" }}>
                    <GoodsForm data={this.loklok}></GoodsForm>
                </div>
                <div style={{ display: this.state.DetailedFlag ? "none" : "block" }}>
                    <GoodsDetailed data={this.state.loklokID} imgs={this.state.imgs} goodsData={this.state.goodsData} fn={this.loklok}></GoodsDetailed>
                </div>
            </>
        )
    }
}

export default GoodsList;