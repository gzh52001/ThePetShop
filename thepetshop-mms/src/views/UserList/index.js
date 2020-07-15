import React, { Component } from "react";
import { Route, Redirect, Switch } from 'react-router-dom';

import "@/assets/css/UserList.scss"
import UserForm from '@/views/UserList/UserForm'
import UserDetailed from '@/views/UserList/UserDetailed'
class UserList extends Component {
    constructor() {
        super();
        this.state = {
            DetailedFlag: false
        }
    }
    render() {
        const DetailedFlag = this.state;
        return (
            <>

                <div style={{display: DetailedFlag?"block":"none"}}>
                    <UserForm></UserForm>
                </div>
                <div style={{display: DetailedFlag?"none":"block"}}>
                    <UserDetailed></UserDetailed>
                </div>
            </>
        )
    }
}

export default UserList;