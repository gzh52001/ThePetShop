import React, { Component, useState } from "react";

import { Input, Form, Table, Button, Modal, Divider, Popconfirm } from 'antd';
import "@/assets/css/UserList.scss"

import { AudioOutlined } from '@ant-design/icons';


class UserForm extends Component {
    constructor() {
        super();
        this.state = {
            pageSize: 10,    //一页显示的条数
            delSelectID: "",
            modifyVisible: false
        }
    }
    handleChange = (value) => {
        console.log(`selected ${value}`);
    }
    onChange = (pagination, filters, sorter, extra) => {     //分页、排序、筛选变化时触发
        console.log('params', pagination, filters, sorter, extra);
    }
    onShowSizeChange = (current, pageSize) => {     //切换页
        this.setState({
            pageSize: pageSize
        })
        console.log(current, pageSize);
    }
    selectRow = (selectedRowKeys, selectedRows) => {     //多选按钮
        console.log("选择" + selectedRowKeys, selectedRows)
        this.setState({
            delSelectID: selectedRowKeys
        })
    }
    handleDelete = (record) => {     //删除某行
        console.log(record.id)
    }
    delSelect = () => {     //批量删除
        console.log("删除" + this.state.delSelectID)
    }
    showModal = (data) => {     //显示修改框,传入数据
        this.setState({
            modifyVisible: true,
        });
    };

    handleOk = e => {
        console.log(e);
        this.setState({
            modifyVisible: false,
        });
    };

    handleCancel = e => {
        console.log(e);
        this.setState({
            modifyVisible: false,
        });
    };
    onFinish = values => {
        console.log('Success:', values);
      };
    
    onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
      };
    render() {
        const { Search } = Input;

        const columns = [
            {
                title: 'ID',
                dataIndex: 'id',
                width: "125px",
                align: "center",
                showSorterTooltip: false,
                // onFilter: (value, record) => record.name.indexOf(value) === 0,
                sorter: (a, b) => a.id - b.id,
                defaultSortOrder: 'ascend',
            },
            {
                title: '用户名',
                dataIndex: 'username',
                width: "180px",
                align: "center",
                // sorter: (a, b) => a.age - b.age,
            },
            {
                title: '手机号码',
                dataIndex: 'phone',
                width: "180px",
                align: "center",
                // filters: [
                //     {
                //         text: 'London',
                //         value: 'London',
                //     },
                //     {
                //         text: 'New York',
                //         value: 'New York',
                //     },
                // ],
                // filterMultiple: false,
                // onFilter: (value, record) => record.address.indexOf(value) === 0,
                // sorter: (a, b) => a.address.length - b.address.length,
                // sortDirections: ['descend', 'ascend'],
            },
            {
                title: '邮箱',
                dataIndex: 'Email',
                width: "180px",
                align: "center",
                // sorter: (a, b) => a.age - b.age,
            },
            {
                title: '注册时间',
                dataIndex: 'regTime',
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
                    data.length >= 1 ? (
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
        const data = [
            {
                id: '1',
                username: 'John Brown',
                age: 32,
                phone: '13138716402',
                Email: "123456789@qq.com",
                regTime: "2020年7月16日",
            },
            {
                id: '2',
                username: 'Jim Green',
                age: 42,
                phone: '13138716402',
                Email: "123456789@qq.com",
                regTime: "2020年7月16日",

            },
            {
                id: '3',
                username: 'Jim Green',
                age: 42,
                phone: '13138716402',
                Email: "123456789@qq.com",
                regTime: "2020年7月16日",

            },

        ];
        return (
            <div className="UserForm" >
                <div className="formHeader">

                    <Popconfirm title="您确定要删除吗?" onConfirm={() => this.delSelect}>
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
                    rowKey="id"
                    style={{ height: "100%" }}
                    bordered
                    columns={columns}
                    dataSource={data}
                    pagination={{
                        pageSize: this.state.pageSize,
                        defaultCurrent: 1,
                        total: 500, onShowSizeChange: this.onShowSizeChange
                    }}
                    rowSelection={{
                        type: "rowSelection",
                        onChange: this.selectRow
                    }}
                    ellipsis={true}
                    scroll={{ y: "65vh" }}
                    onChange={this.onChange} />
                <Modal
                    title="修改用户信息"
                    visible={this.state.modifyVisible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    <Form
                        name="basic"
                        initialValues={{ remember: true }}
                        onFinish={this.onFinish}
                        onFinishFailed={this.onFinishFailed}
                    >
                        <Form.Item
                            label="用户名"
                            name="username"
                            rules={[{ required: true, message: 'Please input your username!' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="手机号码"
                            name="phone"
                            rules={[{ required: true, message: 'Please input your username!' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="邮箱"
                            name="Email"
                            rules={[{ required: true, message: 'Please input your username!' }]}
                        >
                            <Input />
                        </Form.Item>
                    </Form>
                </Modal>
            </div >
        )
    }
}

export default UserForm;