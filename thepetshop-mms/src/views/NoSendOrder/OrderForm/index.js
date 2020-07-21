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
            pageSize: 10,    //一页显示的条数
            goodsList: [],
            sort: "",
            totalList: 0,
            changeList: {},
            delSelectID: [],
            modifyVisible: false,
            isdeliver:0
        }
    }
    componentDidMount() {
        const {page,pageSize,isdeliver} = this.state
        console.log(isdeliver)
        this.getGoodsOrder(999,page,pageSize,isdeliver)
    }
    getGoodsOrder = async (sort,page,pageSize,isdeliver) => {     //获取订单列表
        try {
            let p = await OrderListApi.getGoodsOrder(sort,page,pageSize,isdeliver);
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
        const {sort,page,pageSize,isdeliver} = this.state
        try {
            let p = await OrderListApi.delPartOrder(arr);
            if (p.data.flag) {
                this.getGoodsOrder(sort,page,pageSize,isdeliver)
                message.success('取消成功！');
            } else {
                message.error('取消失败！未知错误');
            }
        } catch (error) {
            console.log(error);
        }
    }

    deliverGoods = async(uid,gid,otime)=>{
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

    handleChange = (value) => {
        console.log(`selected ${value}`);
    }
    onChange = (pagination,a, sorter, extra) => {     //分页、排序、筛选变化时触发
        const {isdeliver} = this.state
        if (sorter.order === "ascend" && sorter.field === "otime") {
            this.getGoodsOrder(0,pagination.current,pagination.pageSize,isdeliver);
            this.setState({
                sort: 0
            })
        } else if (sorter.order === undefined && sorter.field === "otime") {
            this.getGoodsOrder(null,pagination.current,pagination.pageSize,isdeliver);
            this.setState({
                sort: null
            })
        }
    }
    pageChange = (page, pageSize) => {
        const {isdeliver} = this.state
        this.getGoodsOrder(this.state.sort,page, pageSize,isdeliver)
    }
    onShowSizeChange = (current, pageSize) => {     //切换页
        const {isdeliver} = this.state
        this.setState({
            page: current,
            pageSize: pageSize
        })
        this.getGoodsOrder(this.state.sort,current, pageSize,isdeliver)
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
        const {page,pageSize,isdeliver} = this.state
        let newList = this.state.goodsList.filter(item => item.otime !== record.otime);
        this.setState({
            goodsList: newList
        })
        this.delgoodsList(record.uid,record.otime);
        this.getGoodsOrder(999,page,pageSize,isdeliver)
    }
    delSelect = () => {     //批量删除
        const {delSelectID} = this.state
        // console.log(this.state.delSelectID)
        this.delPartOrder(delSelectID)
    }
    showModal = (data) => {     //显示修改框,传入数据
        console.log(data)
        this.setState({
            modifyVisible: true,
            changeList: data
        });
    };
    searchV=()=>{
        this.setState({
            serchVisible: false
        })
        this.getGoodsOrder(this.state.sort,this.state.page, this.state.pageSize,this.state.isdeliver)
    }
    handleOk = values => {  //确定修改
        console.log(values);
        this.setState({
            modifyVisible: false,
        });
    };

    handleCancel = e => {
        console.log("取消");
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
    sendGoods = (record) =>{   //发货
        const {goodsList} = this.state
        this.deliverGoods(record.uid,record.gid,record.otime)
        let newList = goodsList.filter(item => item.otime !== record.otime);
        this.setState({
            goodsList: newList
        })
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
                    <Select className="selectChange" defaultValue="商品名" style={{ width: 100 }} onChange={this.selectChange}>
                        <Option value="gtitle">商品名</Option>
                        <Option value="gid">ID</Option>
                    </Select>
                    <Search
                        className="formSearch"
                        placeholder="请输入关键字"
                        enterButton="查找"
                        size="large"
                        onSearch={value => console.log(value)}
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