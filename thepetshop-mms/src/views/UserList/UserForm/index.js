import React, { Component } from "react";

import { Input, Select, Table, Pagination } from 'antd';
import "@/assets/css/UserList.scss"

import { AudioOutlined } from '@ant-design/icons';


class UserForm extends Component {
    constructor() {
        super();
        this.state = {
            pageSize: 10
        }
    }
    handleChange = (value) => {
        console.log(`selected ${value}`);
    }
    onChange = (pagination, filters, sorter, extra) => {
        console.log('params', pagination, filters, sorter, extra);
    }
    onShowSizeChange = (current, pageSize) =>{
        this.setState({
            pageSize: pageSize
        })
        console.log(current, pageSize);
      }
    render() {
        const { Search } = Input;

        const columns = [
            {
                title: 'ID',
                dataIndex: 'id',
                filters: [
                    {
                        text: 'Joe',
                        value: 'Joe',
                    },
                    {
                        text: 'Jim',
                        value: 'Jim',
                    },
                    {
                        text: 'Submenu',
                        value: 'Submenu',
                        children: [
                            {
                                text: 'Green',
                                value: 'Green',
                            },
                            {
                                text: 'Black',
                                value: 'Black',
                            },
                        ],
                    },
                ],
                onFilter: (value, record) => record.name.indexOf(value) === 0,
                sorter: (a, b) => a.name.length - b.name.length,
                sortDirections: ['descend'],
            },
            {
                title: '用户名',
                dataIndex: 'username',
                defaultSortOrder: 'descend',
                sorter: (a, b) => a.age - b.age,
            },
            {
                title: 'Address',
                dataIndex: 'address',
                filters: [
                    {
                        text: 'London',
                        value: 'London',
                    },
                    {
                        text: 'New York',
                        value: 'New York',
                    },
                ],
                filterMultiple: false,
                onFilter: (value, record) => record.address.indexOf(value) === 0,
                sorter: (a, b) => a.address.length - b.address.length,
                sortDirections: ['descend', 'ascend'],
            },
        ];

        const data = [
            {
                id: '1',
                username: 'John Brown',
                age: 32,
                address: 'New York No. 1 Lake Park',
            },
            // {
            //     key: "2",
            //     id: '2',
            //     username: 'Jim Green',
            //     age: 42,
            //     address: 'London No. 1 Lake Park',
            // },
            // {
            //     key: "3",
            //     id: '3',
            //     username: 'Joe Black',
            //     age: 32,
            //     address: 'Sidney No. 1 Lake Park',
            // },
            // {
            //     key: "4",
            //     id: '4',
            //     username: 'Jim Red',
            //     age: 32,
            //     address: 'London No. 2 Lake Park',
            // },
            // {
            //     key: "5",
            //     id: '3',
            //     username: 'Joe Black',
            //     age: 32,
            //     address: 'Sidney No. 1 Lake Park',
            // },
            // {
            //     key: "6",
            //     id: '4',
            //     username: 'Jim Red',
            //     age: 32,
            //     address: 'London No. 2 Lake Park',
            // },
            // {
            //     key: "7",
            //     id: '3',
            //     username: 'Joe Black',
            //     age: 32,
            //     address: 'Sidney No. 1 Lake Park',
            // },
            // {
            //     key: "8",
            //     id: '4',
            //     username: 'Jim Red',
            //     age: 32,
            //     address: 'London No. 2 Lake Park',
            // },
            // {
            //     key: "9",
            //     id: '3',
            //     username: 'Joe Black',
            //     age: 32,
            //     address: 'Sidney No. 1 Lake Park',
            // },
            // {
            //     key: "10",
            //     id: '4',
            //     username: 'Jim Red',
            //     age: 32,
            //     address: 'London No. 2 Lake Park',
            // },
            // {
            //     key: "11",
            //     id: '4',
            //     username: 'Jim Red',
            //     age: 32,
            //     address: 'London No. 2 Lake Park',
            // },
            // {
            //     key: "1",
            //     id: '1',
            //     username: 'John Brown',
            //     age: 32,
            //     address: 'New York No. 1 Lake Park',
            // },
            // {
            //     key: "2",
            //     id: '2',
            //     username: 'Jim Green',
            //     age: 42,
            //     address: 'London No. 1 Lake Park',
            // },
            // {
            //     key: "3",
            //     id: '3',
            //     username: 'Joe Black',
            //     age: 32,
            //     address: 'Sidney No. 1 Lake Park',
            // },
            // {
            //     key: "4",
            //     id: '4',
            //     username: 'Jim Red',
            //     age: 32,
            //     address: 'London No. 2 Lake Park',
            // },
            // {
            //     key: "5",
            //     id: '3',
            //     username: 'Joe Black',
            //     age: 32,
            //     address: 'Sidney No. 1 Lake Park',
            // },
            // {
            //     key: "6",
            //     id: '4',
            //     username: 'Jim Red',
            //     age: 32,
            //     address: 'London No. 2 Lake Park',
            // },
            // {
            //     key: "7",
            //     id: '3',
            //     username: 'Joe Black',
            //     age: 32,
            //     address: 'Sidney No. 1 Lake Park',
            // },
            // {
            //     key: "8",
            //     id: '4',
            //     username: 'Jim Red',
            //     age: 32,
            //     address: 'London No. 2 Lake Park',
            // },
            // {
            //     key: "9",
            //     id: '3',
            //     username: 'Joe Black',
            //     age: 32,
            //     address: 'Sidney No. 1 Lake Park',
            // },
            // {
            //     key: "10",
            //     id: '4',
            //     username: 'Jim Red',
            //     age: 32,
            //     address: 'London No. 2 Lake Park',
            // },
            // {
            //     key: "11",
            //     id: '4',
            //     username: 'Jim Red',
            //     age: 32,
            //     address: 'London No. 2 Lake Park',
            // },
            // {
            //     key: "1",
            //     id: '1',
            //     username: 'John Brown',
            //     age: 32,
            //     address: 'New York No. 1 Lake Park',
            // },
            // {
            //     key: "2",
            //     id: '2',
            //     username: 'Jim Green',
            //     age: 42,
            //     address: 'London No. 1 Lake Park',
            // },
            // {
            //     key: "3",
            //     id: '3',
            //     username: 'Joe Black',
            //     age: 32,
            //     address: 'Sidney No. 1 Lake Park',
            // },
            // {
            //     key: "4",
            //     id: '4',
            //     username: 'Jim Red',
            //     age: 32,
            //     address: 'London No. 2 Lake Park',
            // },
            // {
            //     key: "5",
            //     id: '3',
            //     username: 'Joe Black',
            //     age: 32,
            //     address: 'Sidney No. 1 Lake Park',
            // },
            // {
            //     key: "6",
            //     id: '4',
            //     username: 'Jim Red',
            //     age: 32,
            //     address: 'London No. 2 Lake Park',
            // },
            // {
            //     key: "7",
            //     id: '3',
            //     username: 'Joe Black',
            //     age: 32,
            //     address: 'Sidney No. 1 Lake Park',
            // },
            // {
            //     key: "8",
            //     id: '4',
            //     username: 'Jim Red',
            //     age: 32,
            //     address: 'London No. 2 Lake Park',
            // },
            // {
            //     key: "9",
            //     id: '3',
            //     username: 'Joe Black',
            //     age: 32,
            //     address: 'Sidney No. 1 Lake Park',
            // },
            // {
            //     key: "10",
            //     id: '4',
            //     username: 'Jim Red',
            //     age: 32,
            //     address: 'London No. 2 Lake Park',
            // },
            // {
            //     key: "11",
            //     id: '4',
            //     username: 'Jim Red',
            //     age: 32,
            //     address: 'London No. 2 Lake Park',
            // },
        ];
        return (
            <div className="UserForm" >
                <div className="formHeader">
                    <Search
                        className="formSearch"
                        placeholder="请输入关键字"
                        enterButton="查找"
                        size="large"
                        onSearch={value => console.log(value)}
                    />
                </div>
                <Table
                    style={{ height: "100%" }}
                    columns={columns}
                    dataSource={data}
                    pagination={{ pageSize: this.state.pageSize,defaultCurrent:1,total:500,onShowSizeChange: this.onShowSizeChange}}
                    tableLayout="fixed"
                    scroll={{ y: "65vh" }}
                    onChange={this.onChange} />
            </div >
        )
    }
}

export default UserForm;