import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import Login from '@/components/Login';
import LoginApi from "@/api/Login";
export function UserData(Goods) {
    class Packing extends Component {
        constructor() {
            super();
            this.state = {
                userData: {}
            }
        }
        componentDidMount() {
            let userData;
            try {
                userData = localStorage.getItem("userData");
                userData = JSON.parse(userData);
            } catch (error) {
                userData = {}
            }
            this.setState({
                userData
            })
        }
        render() {
            return <Goods {...this.state} {...this.props}></Goods>
        }
    }
    return Packing;
}

export function VerifyLogin(InComponent) {
    class OutComponent extends InComponent {
        constructor() {
            super();
            if (!this.state) {
                this.state = {}
            }
            this.state.login = false;
            this.state.defaultPath = "/home";
            this.state.openKeys = ['sub1']
        }
        verifyToken = async (token) => {     //获取用户列表
            try {
                let p = await LoginApi.verifyToken(token);
                if (p.data.flag) {
                    this.setState({
                        login: true
                    })
                } else {
                    this.setState({
                        login: false
                    })
                }
            } catch (error) {
                console.log(error);
            }
        }
        componentDidMount() {
            let userData = localStorage.getItem("userData");
            const { history } = this.props;
            const { location: { pathname } } = history;
            if (userData) {
                let { token } = JSON.parse(userData);
                this.verifyToken(token)
                this.setState({
                    defaultPath: pathname === "/login" || pathname === "/" ? "/home" : pathname
                })
            } else {
                this.props.history.push("/login");
            }
            switch (pathname) {
                case "/home":
                    this.setState({ openKeys: ['sub1'] })
                    break;
                case "/user/userList":
                    this.setState({ openKeys: ['sub2'] })
                    break;
                case "/goods/goodsList":
                    this.setState({ openKeys: ['sub3'] })
                    break;
                case "/goods/addGoods":
                    this.setState({ openKeys: ['sub3'] })
                    break;
                case "/goods/modifyGoods":
                    this.setState({ openKeys: ['sub3'] })
                    break;
                case "/order/orderList":
                    this.setState({ openKeys: ['sub4'] })
                    break;

                default:
                    break;
            }
        }
        render() {
            const { login } = this.state;
            if (login) {
                return super.render();
            }
            return (
                <>
                    <Route path="/login" component={Login} />
                </>

            )

        }
    }
    return OutComponent;
}