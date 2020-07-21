import React, { Component } from "react";

import { Input, Form, Table, Button, Modal, Popconfirm, message,Select } from 'antd';
import "@/assets/css/UserList.scss"


import GoodsListApi from "@/api/GoodsList";
class GoodsForm extends Component {
    constructor() {
        super();
        this.state = {
            page: 1,      //默认页
            pageSize: 10,    //一页显示的条数
            goodsList: [],
            sort: null,
            totalList: "",
            changeList: {},
            searchData: "gtitle",
            delSelectID: "",
            serchVisible: false,
            searchText: "",
            searchMessage: true
        }
    }
    componentDidMount() {
        this.getGoodsList(null,this.state.page, this.state.pageSize)
    }
    getGoodsList = async (sort,page, num) => {     //获取商品列表
        try {
            let p = await GoodsListApi.getGoodsList(sort,page, num);
            if (p.data.flag) {
                this.setState({
                    goodsList: p.data.data.goodsinfo,
                    totalList: p.data.data.total
                })
            } else {
                console.log("获取失败")
            }
        } catch (error) {
            console.log(error);
        }
    }
    searchAllGoods = async (type,value,page,num) =>{    //搜索商品
        try {
            let p = await GoodsListApi.searchAllGoods(type,value,page,num);
            if (p.data.flag) {
                this.setState({
                    goodsList: p.data.data.p2,
                    totalList: p.data.data.total,
                    serchVisible: true
                })
                if(this.state.searchMessage){
                    message.success('查找成功！');
                    this.setState({
                        searchMessage: false
                    })
                }
            } else {
                message.error('查找的内容不存在！');
            }
        } catch (error) {
            message.error('查找的内容不存在！');
        }
    }
    delGoodsList = async (gid) => {     //删除商品
        try {
            let p = await GoodsListApi.delGoodsList(gid);
            if (p.data.flag) {
                message.success('删除成功！');
            } else {
                message.error('删除失败！未知错误');
            }
        } catch (error) {
            console.log(error);
        }
    }
    delAllGoodsList = async (arr) => {     //批量删除商品
        try {
            let p = await GoodsListApi.delAllGoodsList(arr);
            if (p.data.flag) {
                this.getGoodsList(this.state.sort,this.state.page, this.state.pageSize)
                message.success('删除成功！');
            } else {
                console.log(p.data)
                message.error('删除失败！未知错误');
            }
        } catch (error) {
            console.log(error);
        }
    }
    handleChange = (value) => {
        console.log(`selected ${value}`);
    }
    onChange = (pagination,a, sorter, extra) => {     //分页、排序、筛选变化时触发
        if (sorter.order === "ascend" && sorter.field === "gprice") {
            this.getGoodsList(3,pagination.current,pagination.pageSize);
            this.setState({
                sort: 3
            })
        } else if (sorter.order === "descend" && sorter.field === "gprice") {
            this.getGoodsList(2,pagination.current,pagination.pageSize);
            this.setState({
                sort: 2
            })
        } else if (sorter.order === undefined && sorter.field === "gprice") {
            this.getGoodsList(null,pagination.current,pagination.pageSize);
            this.setState({
                sort: null
            })
        }
        if (sorter.order === "ascend" && sorter.field === "gxiaoliang") {
            this.getGoodsList(1,pagination.current,pagination.pageSize);
            this.setState({
                sort: 1
            })
        } else if (sorter.order === "descend" && sorter.field === "gxiaoliang") {
            this.getGoodsList(0,pagination.current,pagination.pageSize);
            this.setState({
                sort: 0
            })
        } else if (sorter.order === undefined && sorter.field === "gxiaoliang") {
            this.getGoodsList(null,pagination.current,pagination.pageSize);
            this.setState({
                sort: null
            })
        }
        if(sorter.order === 'descend' && sorter.field === "gid"){
            this.getGoodsList(4,pagination.current,pagination.pageSize);
            this.setState({
                sort: 4
            })
        }else if(sorter.order === undefined && sorter.field === "gid"){
            this.getGoodsList(null,pagination.current,pagination.pageSize);
            this.setState({
                sort: null
            })
        }
    }
    pageChange = (page, pageSize) => {
        if(!this.state.serchVisible){
            this.getGoodsList(this.state.sort,page, pageSize)
            this.setState({
                page,
                pageSize
            })
        }else{
            this.searchAllGoods(this.state.searchData,this.state.searchText,page, pageSize)
            this.setState({
                page,
                pageSize
            })
        }
    }
    onShowSizeChange = (current, pageSize) => {     //切换页
        if(!this.state.serchVisible){
            this.getGoodsList(this.state.sort,current, pageSize)
            this.setState({
                page: current,
                pageSize: pageSize
            })
        }else{
            this.searchAllGoods(this.state.searchData,this.state.searchText,current, pageSize)
            this.setState({
                page: current,
                pageSize: pageSize
            })
        }
    }
    selectRow = (selectedRowKeys, selectedRows) => {     //多选按钮
        this.setState({
            delSelectID: selectedRowKeys
        })
    }
    handleDelete = (record) => {     //删除某行
        let newList = this.state.goodsList.filter(item => item.gid !== record.gid);
        this.setState({
            goodsList: newList
        })
        this.delGoodsList(record.gid);
    }
    delSelect = () => {     //批量删除
        this.delAllGoodsList(this.state.delSelectID)
    }
    searchV=()=>{
        this.setState({
            serchVisible: false,
        })
        console.log(this.state.page)
        this.getGoodsList(this.state.sort,1, this.state.pageSize)
    }
    handleOk = values => {  //确定修改
        console.log(values);
        this.setState({
            modifyVisible: false,
        });
    };
    selectChange = (value) => {     //搜索选项
        console.log(value)
        this.setState({
            searchData: value
        })
    }
    searchGoodsList = (value) => {       //确定搜索
        this.setState({
            searchText: value,
            serchVisible: false,
            page: 1,
            pageSize: 10,
            searchMessage: true
        })
        this.searchAllGoods(this.state.searchData,value,1,10);
    }
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
    render() {
        const { Search } = Input;
        const { Option } = Select;
        const columns = [
            {
                title: 'ID',
                dataIndex: 'gid',
                width: "125px",
                align: "center",
                sortDirections: ['descend'],
                showSorterTooltip: false,
                sorter: () => { },
            },
            {
                title: '商品图片',
                dataIndex: 'gimgs',
                width: "170px",
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
                width: "380px",
                align: "center",
            },
            {
                title: '价格/￥',
                dataIndex: 'gprice',
                width: "120px",
                align: "center",
                showSorterTooltip: false,
                sorter: () => { },
                render: (text, record) =>
                    this.state.goodsList.length >= 1 ? (
                        <>
                        
                           {"￥"+record.gprice}
                        </>
                    ) : null,
            },
            {
                title: '销量',
                dataIndex: 'gxiaoliang',
                align: "center",
                width: "120px",
                showSorterTooltip: false,
                sorter: (a, b) => a.age - b.age,
            },
            {
                title: '操作',
                align: "center",
                width: "230px",
                render: (text, record) =>
                    this.state.goodsList.length >= 1 ? (
                        <>
                            <Button className="loklok" onClick={() => this.props.data(record)}>查看详细</Button>
                            <Popconfirm title="您确定要删除吗?" onConfirm={() => this.handleDelete(record)}>
                                <Button type="primary" danger>删除</Button>
                            </Popconfirm>
                        </>
                    ) : null,
            },
            {
                width: "0",
            },
        ];
        return (
            <div className="goodsForm" >
                <div className="formHeader">

                    <Popconfirm title="您确定要删除吗?" onConfirm={this.delSelect}>
                        <Button type="primary" danger disabled={this.state.delSelectID.length <= 0}>
                            删除选中
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
                        <Option value="gprice">价格</Option>
                    </Select>
                    <Search
                        className="formSearch"
                        placeholder="请输入关键字"
                        enterButton="查找"
                        size="large"
                        onSearch={this.searchGoodsList}
                    />
                </div>
                <Table
                    rowKey="gid"
                    style={{ height: "100%" }}
                    bordered
                    columns={columns}
                    dataSource={this.state.goodsList}
                    pagination={{
                        current: this.state.page,
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

export default GoodsForm;