import React, { Component } from "react";

import { Input, Form, Table, Button, Modal, Popconfirm, message, Select } from 'antd';
import "@/assets/css/UserList.scss"


import UserListApi from "@/api/UserList";
class UserForm extends Component {
    constructor() {
        super();
        this.state = {
            page: 1,      //默认页
            pageSize: 9,    //一页显示的条数
            userList: [],
            totalList: "",
            sort: 0,
            changeList: {},
            delSelectID: "",
            searchData: "uid",
            modifyVisible: false,
            serchVisible: false
        }
    }
    componentDidMount() {
        this.getUserList(this.state.sort,this.state.page, this.state.pageSize)
    }
    getUserList = async (sort,page, num) => {     //获取用户列表
        try {
            let p = await UserListApi.getUserList(sort,page, num);
            if (p.data.flag) {
                p.data.data.map(item => {
                    let b = item.time;
                    b = b - 0;
                    item.time = this.props.toDate(b)
                })
                this.setState({
                    userList: p.data.data,
                    totalList: p.data.total
                })
            } else {
                console.log("获取失败")
            }
        } catch (error) {
            console.log(error);
        }
    }
    searchUser = async (type, value) => {     //搜索用户列表
        try {
            let p = await UserListApi.searchUser(type, value);
            if (p.data.flag) {
                p.data.data.map(item => {
                    let b = item.time;
                    b = b - 0;
                    item.time = this.props.toDate(b)
                })
                this.setState({
                    userList: p.data.data,
                    totalList: p.data.total,
                    serchVisible: true
                })
                message.success('查找成功！');
            } else {
                console.log("获取失败")
            }
        } catch (error) {
            message.error('查找的内容不存在！');
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
                this.getUserList(this.state.sort,this.state.page, this.state.pageSize)
                message.success('删除成功！');
            } else {
                message.error('删除失败！未知错误');
            }
        } catch (error) {
            console.log(error);
        }
    }
    changeUserList = async (uid, msg) => {     //修改用户信息
        try {
            let p = await UserListApi.changeUserList(uid, msg);
            if (p.data.flag) {
                this.getUserList(this.state.sort,this.state.page, this.state.pageSize)
                message.success('修改成功！');
            } else {
                message.error('修改成功！未知错误');
            }
        } catch (error) {
            console.log(error);
        }
    }
    handleChange = (value) => {
        console.log(`selected ${value}`);
    }
    onChange = (pagination, a, sorter, extra) => {     //分页、排序、筛选变化时触发
        console.log(pagination) 
        if (sorter.order === "ascend" && sorter.field === "uid") {
            this.getUserList(0,pagination.current,pagination.pageSize);
        } else if (sorter.order === "descend" && sorter.field === "uid") {
            this.getUserList(1,pagination.current,pagination.pageSize);
        } else if (sorter.order === undefined && sorter.field === "uid") {
            this.getUserList(0,pagination.current,pagination.pageSize);
        }
    }
    pageChange = (page, pageSize) => {
        this.getUserList(this.state.sort,page, pageSize)
        this.setState({
            page,
            pageSize
        })
    }
    onShowSizeChange = (current, pageSize) => {     //切换页

    }
    selectRow = (selectedRowKeys, selectedRows) => {     //多选按钮
        console.log(selectedRowKeys, selectedRows)
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
    selectChange = (value) => {     //搜索选项
        console.log(value)
        this.setState({
            searchData: value
        })
    }
    searchUserList = (value) => {       //确定搜索
        console.log(value)
        this.setState({
            serchVisible: false
        })
        this.searchUser(this.state.searchData, value);
    }
    handleOk = values => {  //确定修改
        console.log(values.uid);
        this.changeUserList(values.uid, values)
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
    searchV=()=>{
        this.setState({
            serchVisible: false
        })
        this.getUserList(this.state.sort,this.state.page, this.state.pageSize)
    }
    render() {
        const { Search } = Input;
        const { Option } = Select;
        const columns = [
            {
                title: 'ID',
                dataIndex: 'uid',
                width: "125px",
                align: "center",
                showSorterTooltip: false,
                sorter: () => {  },
            },
            {
                title: '用户名',
                dataIndex: 'username',
                width: "190px",
                align: "center",
            },
            {
                title: '手机号码',
                dataIndex: 'phonenum',
                width: "210px",
                align: "center",
            },
            {
                title: '邮箱',
                dataIndex: 'email',
                width: "210px",
                align: "center",
            },
            {
                title: '注册时间',
                dataIndex: 'time',
                align: "center",
                width: "100%",
                ellipsis: true,
                showSorterTooltip: false,
            },
            {
                title: '操作',
                align: "center",
                width: "230px",
                render: (text, record) =>
                    this.state.userList.length >= 1 ? (
                        <>
                            <Button className="loklok" onClick={() => this.props.data(record)}>查看详细</Button>
                            <Button type="primary" onClick={() => this.showModal(record)}>修改</Button>
                            <Popconfirm title="您确定要删除吗?" onConfirm={() => this.handleDelete(record)}>
                                <Button type="primary" danger>删除</Button>
                            </Popconfirm>
                        </>
                    ) : null,
            },
        ];
        return (
            <div className="UserForm" >
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

                    <Select className="selectChange" defaultValue="ID" style={{ width: 100 }} onChange={this.selectChange}>
                        <Option value="uid">ID</Option>
                        <Option value="username">用户名</Option>
                        <Option value="phonenum">手机号码</Option>
                        <Option value="email">邮箱</Option>
                        <Option value="time">注册时间</Option>
                    </Select>
                    <Search
                        className="formSearch"
                        placeholder="请输入关键字"
                        enterButton="查找"
                        size="large"
                        onSearch={this.searchUserList}
                    />
                </div>
                <Table
                    rowKey="uid"
                    style={{ height: "100%" }}
                    bordered
                    columns={columns}
                    dataSource={this.state.userList}
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
                    // scroll={{ y: "69vh" }}
                    onChange={this.onChange} />
                {
                    this.state.modifyVisible ?
                        <Modal
                            className="changeWindows"
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
                                    label="ID"
                                    name="uid"
                                    initialValue={this.state.changeList.uid}
                                    rules={[{ required: true, message: 'Please input your username!' }]}
                                >
                                    <Input disabled />
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
                                    name="phonenum"
                                    initialValue={this.state.changeList.phonenum}
                                    rules={[{ required: true, message: 'Please input your username!' }]}
                                >
                                    <Input />
                                </Form.Item>
                                <Form.Item
                                    label="邮箱"
                                    name="email"
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

export default UserForm;