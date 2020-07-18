import React, { Component } from "react";

import { Input, Form, Table, Button, Modal, Popconfirm, message,Select } from 'antd';
import "@/assets/css/UserList.scss"


import UserListApi from "@/api/UserList";
import GoodsListApi from "@/api/GoodsList";
class OrderForm extends Component {
    constructor() {
        super();
        this.state = {
            page: 1,      //默认页
            pageSize: 10,    //一页显示的条数
            goodsList: [],
            sort: null,
            totalList: "",
            changeList: {},
            delSelectID: "",
            modifyVisible: false,
            uid:2
        }
    }
    componentDidMount() {
        this.getGoodsOrder(this.state.uid)
    }
    getGoodsOrder = async (uid) => {     //获取用户列表
        try {
            let p = await GoodsListApi.getGoodsOrder(uid);
            console.log(p)
            if (p.data.flag) {
                this.setState({
                    goodsList: p.data.data
                })
            } else {
                console.log("获取失败")
            }
        } catch (error) {
            console.log(error);
        }
    }
    delUserList = async (uid) => {     //删除用户
        try {
            let p = await UserListApi.delUserList(uid);
            if (p.data.flag) {
                message.success('删除成功！');
            } else {
                message.error('删除失败！未知错误');
            }
        } catch (error) {
            console.log(error);
        }
    }
    delAllUserList = async (arr) => {     //批量删除用户
        try {
            let p = await UserListApi.delAllUserList(arr);
            if (p.data.flag) {
                message.success('删除成功！');
            } else {
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
            this.getGoodsList(2,pagination.current,pagination.pageSize);
            this.setState({
                sort: 2
            })
        } else if (sorter.order === "descend" && sorter.field === "gprice") {
            this.getGoodsList(3,pagination.current,pagination.pageSize);
            this.setState({
                sort: 3
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
    }
    pageChange = (page, pageSize) => {
        this.getGoodsList(this.state.sort,page, pageSize)
    }
    onShowSizeChange = (current, pageSize) => {     //切换页
        this.setState({
            page: current,
            pageSize: pageSize
        })
        this.getGoodsList(this.state.sort,current, pageSize)
    }
    selectRow = (selectedRowKeys, selectedRows) => {     //多选按钮
        this.setState({
            delSelectID: selectedRowKeys
        })
    }
    handleDelete = (record) => {     //删除某行
        let newList = this.state.userList.filter(item => item.uid !== record.uid);
        this.setState({
            userList: newList
        })
        this.delUserList(record.uid);
    }
    delSelect = () => {     //批量删除
        this.delAllUserList(this.state.delSelectID)
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
        this.getUserList(this.state.sort,this.state.page, this.state.pageSize)
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
    render() {
        const { Search } = Input;
        const { Option } = Select;
        const columns = [
            {
                title: '订单号',
                dataIndex: 'gid',
                width: "125px",
                align: "center",
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
                sorter: () => { },
            },
            {
                title: '销量',
                dataIndex: 'gxiaoliang',
                align: "center",
                width: "120px",
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
                            <Button type="primary" onClick={this.searchV}>
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
                <Table
                    rowKey="gid"
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
                    scroll={{ y: "65vh" }}
                    onChange={this.onChange} />
                {
                    this.state.modifyVisible ?
                        <Modal
                            title="修改用户信息"
                            visible={this.state.modifyVisible}
                            footer={null}
                            onOk={this.handleOk}
                            onCancel={this.handleCancel}
                        >
                            <Form
                                name="basic"
                                initialValues={{ remember: true }}
                                onFinish={this.handleOk}
                                onFinishFailed={this.onFinishFailed}
                            >
                                <Form.Item
                                    label="id"
                                    name="uid"
                                    initialValue={this.state.changeList.uid}
                                    rules={[{ required: true, message: 'Please input your username!' }]}
                                >
                                    <Input />
                                </Form.Item>
                                <Form.Item
                                    label="用户名"
                                    name="username"
                                    initialValue={this.state.changeList.username}
                                    rules={[{ required: true, message: 'Please input your username!' }]}
                                >
                                    <Input />
                                </Form.Item>
                                <Form.Item
                                    label="手机号码"
                                    name="phone"
                                    initialValue={this.state.changeList.phonenum}
                                    rules={[{ required: true, message: 'Please input your username!' }]}
                                >
                                    <Input />
                                </Form.Item>
                                <Form.Item
                                    label="邮箱"
                                    name="Email"
                                    initialValue={this.state.changeList.email}
                                    rules={[{ required: true, message: 'Please input your username!' }]}
                                >
                                    <Input />
                                </Form.Item>
                                <Form.Item>
                                    <Button type="primary" htmlType="submit">确认修改</Button>
                                    <Button type="primary" ghost onClick={this.handleCancel}>取消</Button>
                                </Form.Item>
                            </Form>
                        </Modal>
                        : <></>
                }

            </div >
        )
    }
}

export default OrderForm;