import React, { Component } from "react";

import { Input, Form, Table, Button, Modal, Popconfirm, message,Select ,Badge} from 'antd';
import "@/assets/css/OrderList.scss"


import GoodsListApi from "@/api/GoodsList";
import OrderListApi from "@/api/OrderList"
class OrderForm extends Component {
    constructor() {
        super();
        this.state = {
            page: 1,      //默认页
            pageSize: 5,    //一页显示的条数
            goodsList: [],
            sort: "",
            totalList: 0,
            changeList: {},
            delSelectID: [],
            modifyVisible: false,
            selectType:"gid"
        }
    }
    componentDidMount() {
        const {page,pageSize} = this.state
        this.getGoodsOrder(999,page,pageSize)
    }
    getGoodsOrder = async (sort,page,pageSize) => {     //获取订单列表
        try {
            let p = await OrderListApi.getGoodsOrder(sort,page,pageSize);
            // console.log(p)
            if (p.data.flag) {
                this.setState({
                    goodsList: p.data.data.p,
                    totalList:p.data.data.total
                })
            } else {
                console.log("获取失败")
            }
        } catch (error) {
            console.log(error);
        }
    }
    delgoodsList = async (uid,otime) => {     //删除订单
        try {
            let p = await GoodsListApi.delgoodsList(uid,otime);
            if (p.data.flag) {
                message.success('取消成功！');
            } else {
                message.error('取消失败！未知错误');
            }
        } catch (error) {
            console.log(error);
        }
    }
    delPartOrder = async (arr) => {     //批量删除订单
        // console.log(arr)
        try {
            let p = await OrderListApi.delPartOrder(arr);
            if (p.data.flag) {
                message.success('取消成功！');
            } else {
                message.error('取消失败！未知错误');
            }
        } catch (error) {
            console.log(error);
        }
    }

    deliverGoods = async(uid,gid,otime)=>{      //显示发货前后订单
        try{
            let p = await OrderListApi.deliverGoods(uid,gid,otime)
            if(p.data.flag){
                message.success('发货成功！');
            } else {
                message.error('发货失败！未知错误');
            }
        }catch(err){
            console.log(err)
        }
    }

    selectOrderList = async(type,value) =>{         //模糊搜索订单
        const {page,pageSize} = this.state
        try{
            let p = await OrderListApi.selectOrder(type,value,999,page,pageSize,999)
            if(p.data.flag){
                this.setState({
                    goodsList:p.data.data.p,
                    totalList:p.data.data.total,
                    serchVisible: true
                })
                message.success('查找成功！');
            }else{
                message.success('查找失败！');
            }
        }catch(err){
            message.success('查找的内容不存在！');
        }
    }

    handleChange = (value) => {
        console.log(`selected ${value}`);
    }
    onChange = (pagination,a, sorter, extra) => {     //分页、排序、筛选变化时触发
        if (sorter.order === "ascend" && sorter.field === "otime") {
            this.getGoodsOrder(0,pagination.current,pagination.pageSize);
            this.setState({
                sort: 0
            })
        } else if (sorter.order === undefined && sorter.field === "otime") {
            this.getGoodsOrder(null,pagination.current,pagination.pageSize);
            this.setState({
                sort: null
            })
        }
    }
    pageChange = (page, pageSize) => {
        this.getGoodsOrder(this.state.sort,page, pageSize)
    }
    onShowSizeChange = (current, pageSize) => {     //切换页
        this.setState({
            page: current,
            pageSize: pageSize
        })
        this.getGoodsOrder(this.state.sort,current, pageSize)
    }




    selectRow = (selectedRowKeys, selectedRows) => {     //多选按钮
        let time = []
        selectedRows.forEach(item=>{
            time.push(item.otime)
        })
        this.setState({
            delSelectID: time
        })
    }
    handleDelete = (record) => {     //删除某行
        let newList = this.state.goodsList.filter(item => item.otime !== record.otime);
        this.setState({
            goodsList: newList
        })
        this.delgoodsList(record.uid,record.otime);
    }
    delSelect = () => {     //批量删除
        const {goodsList,delSelectID} = this.state
        // console.log(this.state.delSelectID)
        let newList = Object.assign([],goodsList)
        goodsList.forEach((item1,index)=>{
            delSelectID.forEach(item2=>{
                if(item1.otime == item2){
                    newList.splice(index,1)
                }
            })
        })
        this.setState({
            goodsList:newList
        })
        this.delPartOrder(delSelectID)
    }
    showModal = (data) => {     //显示修改框,传入数据
        // console.log(data)
        this.setState({
            modifyVisible: true,
            changeList: data
        });
    };
    searchV=()=>{
        this.setState({
            serchVisible: false
        })
        this.getGoodsOrder(this.state.sort,this.state.page, this.state.pageSize)
    }
    handleOk = values => {  //确定修改
        // console.log(values);
        this.setState({
            modifyVisible: false,
        });
    };

    handleCancel = e => {
        // console.log("取消");
        this.setState({
            modifyVisible: false,
            changeList: ""
        });
    };
    onFinish = values => {
        console.log("修改");
    };

    onFinishFailed = errorInfo => {
        console.log("修改");
    };
    sendGoods = (record) =>{
        const {goodsList} = this.state
        this.deliverGoods(record.uid,record.gid,record.otime)
        goodsList.forEach(item=>{
            if(item.uid == record.uid && item.gid == record.gid && item.otime == record.otime){
                item.deliver = 1
            }
        })
        this.setState({
            goodsList
        })
        // this.getGoodsOrder(this.state.sort,this.state.page, this.state.pageSize)
    }
    selectChange=(value)=>{ //获取搜索type值
        this.setState({
            selectType:value
        })
    }
    selectorderList=(value)=>{   //获取搜索value值
        const {selectType} = this.state
        this.setState({
            serchVisible: false
        })
        this.selectOrderList(selectType,value)
    }
    render() {
        const { Search } = Input;
        const { Option } = Select;
        const {toDate} = this.props;
        const columns = [
            {
                title: '订单号',
                dataIndex: 'gid',
                width: "110px",
                align: "center",
                showSorterTooltip: false,
                render: (text, record) =>text+String(record.otime).substring(6,String(record.otime).length-1)
            },
            {
                title: '用户号',
                dataIndex: 'uid',
                width: "90px",
                align: "center",
                showSorterTooltip: false,
            },
            {
                title: '商品图片',
                dataIndex: 'gimgs',
                width: "130px",
                align: "center",
                render: (text, record) =>

                    this.state.goodsList.length >= 1 ? (
                        <>
                            <img style={{ width: "70px", height: "70px", margin: "0 auto" }} src={record.gimgs} alt="" />
                        </>
                    ) : null,
            },
            {
                title: '商品名',
                dataIndex: 'gtitle',
                width: "230px",
                align: "center",
            },
            {
                title: '价格/￥',
                dataIndex: 'gprice',
                width: "110px",
                align: "center",
                render: (text, record) =>'￥'+text
            },
            {
                title: '订单时间',
                dataIndex: 'otime',
                align: "center",
                width: "180px",
                sortDirections: ['ascend'],
                sorter: () => { },
                render:(text,record)=>toDate(text)
            },
            {
                title: '状态',
                dataIndex: 'deliver',
                align: "center",
                width: "120px",
                render:(text,record)=>text==1?<Badge status="processing" text="已发货" />:<Badge status="gold" text="未发货" />
            },
            {
                title: '操作',
                align: "center",
                render: (text, record) =>
                    this.state.goodsList.length >= 1 ? (
                        <>
                            <Button className="loklok" onClick={() => this.props.data(record)}>查看详细</Button>
                            <Popconfirm title="您确定要取消吗?" onConfirm={() => this.handleDelete(record)}>
                                <Button type="primary" danger>取消订单</Button>
                            </Popconfirm>
                            {
                                record.deliver == 0?
                                <Popconfirm title="您确定要发货吗?" onConfirm={() => this.sendGoods(record)}>
                                <Button type="primary">发货</Button>
                                </Popconfirm>
                                :
                                ''
                            }
                        </>
                    ) : null,
            },
            {
                width: "0",
            },
        ];
        const {totalList} = this.state
        return (
            <div className="orderForm" >
                <div className="formHeader">

                    <Popconfirm title="您确定要取消吗?" onConfirm={this.delSelect} disabled={this.state.delSelectID.length <= 0}>
                        <Button type="primary" danger disabled={this.state.delSelectID.length <= 0}>
                            取消订单
                        </Button>
                    </Popconfirm>
                    {
                        this.state.serchVisible ?
                            <Button type="primary" style={{marginLeft: "10px"}} onClick={this.searchV}>
                                返回列表
                            </Button>
                            : <></>
                    }
                    <Select className="selectChange" defaultValue="订单号" style={{ width: 100 }} onChange={this.selectChange}>
                        <Option value="gid">订单号</Option>
                        <Option value="uid">用户号</Option>
                    </Select>
                    <Search
                        className="formSearch"
                        placeholder="请输入关键字"
                        enterButton="查找"
                        size="large"
                        onSearch={this.selectorderList}
                    />
                </div>
                {/* {console.log(this.state.totalList)} */}
                <Table
                    rowKey="otime"
                    style={{ height: "100%" }}
                    bordered
                    columns={columns}
                    dataSource={this.state.goodsList}
                    pagination={{
                        pageSize: this.state.pageSize,
                        defaultCurrent: 1,
                        size: "small",
                        total: this.state.totalList,
                        onShowSizeChange: this.onShowSizeChange,
                        onChange: this.pageChange,
                        showQuickJumper: true,
                        showTotal: (total) => `共 ${total} 条数据`
                    }}
                    rowSelection={{
                        type: "rowSelection",
                        onChange: this.selectRow
                    }}
                    ellipsis={true}
                    scroll={{ y: "70vh" }}
                    onChange={this.onChange} />
              
            </div >
        )
    }
}

export default OrderForm;