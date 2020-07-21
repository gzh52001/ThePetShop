import React, { Component } from "react";

import { Card, Avatar} from 'antd';
import { UserOutlined } from '@ant-design/icons';

import "@/assets/css/Home.scss"
class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    render() {
        const { myname } = JSON.parse(localStorage.getItem("userData"));
        return (
            <div className="home" >
                
                <Card style={{ width: 250 }}>
                    <Avatar className="adminHeader" size={150} icon={<UserOutlined />} />
                    <h2 className="adminName">{myname}</h2>
                    <p>职位: 后台管理员</p>
                </Card>
            </div>
        )
    }
}

export default Home;