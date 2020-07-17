import React, { Component } from "react";
// import { Route, Redirect, Switch } from 'react-router-dom';

import "@/assets/css/UserList.scss"
import UserForm from '@/views/UserList/UserForm'
import UserDetailed from '@/views/UserList/UserDetailed'
class UserList extends Component {
    constructor() {
        super();
        this.state = {
            DetailedFlag: true,
            loklokID: ""
        }
    }
    loklok = (id) =>{
        const {DetailedFlag} = this.state;
        this.setState({
            DetailedFlag: !DetailedFlag,
            loklokID: id.id
        })
    }
    render() {
        return (
            <>
                <div style={{display: this.state.DetailedFlag?"block":"none"}}>
                    <UserForm data={this.loklok}></UserForm>
                </div>
                <div style={{display: this.state.DetailedFlag?"none":"block"}}>
                    <UserDetailed data={this.state.loklokID} fn={this.loklok}></UserDetailed>
                </div>
            </>
        )
    }
}

export default UserList;