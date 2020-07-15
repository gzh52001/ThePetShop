import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import Login from '@/components/Login';

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
        componentDidMount() {
            let userData = localStorage.getItem("userData");
            const { history } = this.props;
            const { location: { pathname } } = history;
            if (userData) {
                this.setState({
                    login: true,
                    defaultPath: pathname === "/login" || pathname === "/" ? "/home" : pathname
                })
            } else {
                this.props.history.push("/login");
            }
            switch (pathname) {
                case "/home" || "/backstage/adminList" || "/backstage/adminReg" || "/backstage/records":
                    this.setState({ openKeys: ['sub1'] })
                    break;
                case "/user/userList":
                    this.setState({ openKeys: ['sub2'] })
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