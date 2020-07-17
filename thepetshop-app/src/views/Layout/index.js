import React from 'react';
import {Route,Switch, Redirect} from 'react-router-dom';
import AppMain from '@/components/AppMain';
import Login from '@/views/Login';
import Reg from '@/views/Reg';
function Layout (){
    return (
        <>
            <Switch>
                <Route path='/main' component={AppMain}/>
                <Route path='/login' component={Login}/>
                <Route path='/reg' component={Reg}/>
                <Redirect from="/" to='/main' exact/>
            </Switch>
        </>
    )
}

export default Layout;