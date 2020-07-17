import React, { Component } from "react";

import { Input, Form, Table, Button, Modal, Popconfirm, message} from 'antd';
import "@/assets/css/UserList.scss"


import UserListApi from "@/api/UserList";
import GoodsListApi from "@/api/GoodsList";
class GoodsForm extends Component {
    constructor() {
        super();
        this.state = {
            page: 1,      //默认页
            pageSize: 10,    //一页显示的条数
            userList: [],
            totalList: "",
            changeList: {},
            delSelectID: "",
            modifyVisible: false
        }
    }
    componentDidMount() {
        this.GoodsListApi(this.state.page, this.state.pageSize)
    }
    GoodsListApi = async (page, num) => {     //获取用户列表
        try {
            let p = await UserListApi.GoodsListApi(page, num);
            if (p.data.flag) {
                p.data.data.map(item => {
                    let b = item.time;
                    b = b - 0;
                    item.time = this.toDate(b)
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
    onChange = (pagination, sorter, extra) => {     //分页、排序、筛选变化时触发
        if (sorter.order === "ascend" && sorter.field === "uid") {
            console.log("正序");

        } else if (sorter.order === "descend" && sorter.field === "uid") {
            console.log("倒序");

        } else if (sorter.order === undefined && sorter.field === "uid") {
            console.log("默认")
        }
    }
    pageChange = (page, pageSize) => {
        this.getUserList(page, pageSize)
    }
    onShowSizeChange = (current, pageSize) => {     //切换页
        console.log("触发了a")
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

    toDate = (now) => {
        let a = new Date(now)
        var year = a.getFullYear();  //取得4位数的年份
        var month = a.getMonth() + 1;  //取得日期中的月份，其中0表示1月，11表示12月
        var date = a.getDate();      //返回日期月份中的天数（1到31）
        var hour = a.getHours();     //返回日期中的小时数（0到23）
        var minute = a.getMinutes(); //返回日期中的分钟数（0到59）
        var second = a.getSeconds(); //返回日期中的秒数（0到59）
        return year + "-" + month + "-" + date + " " + hour + ":" + minute + ":" + second;
    }
    render() {
        const { Search } = Input;

        const columns = [
            {
                title: 'ID',
                dataIndex: 'uid',
                width: "125px",
                align: "center",
                showSorterTooltip: false,
                sorter: () => { },
            },
            {
                title: '用户名',
                dataIndex: 'username',
                width: "180px",
                align: "center",
            },
            {
                title: '手机号码',
                dataIndex: 'phonenum',
                width: "180px",
                align: "center",
            },
            {
                title: '邮箱',
                dataIndex: 'email',
                width: "180px",
                align: "center",
            },
            {
                title: '注册时间',
                dataIndex: 'time',
                align: "center",
                width: "100%",
                ellipsis: true,
                sorter: (a, b) => a.age - b.age,
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
                    <Search
                        className="formSearch"
                        placeholder="请输入关键字"
                        enterButton="查找"
                        size="large"
                        onSearch={value => console.log(value)}
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

export default GoodsForm;