import React from 'react';
import {Route,Switch, Redirect} from 'react-router-dom';
import AppMain from '@/components/AppMain';
import Login from '@/views/Login';
import Reg from '@/views/Reg';
import Search from '@/views/Search';
import GoodsInfo from '@/views/GoodsInfo';
function Layout (){
    return (
        <>
            <Switch>
                <Route path='/main' component={AppMain}/>
                <Route path='/login' component={Login}/>
                <Route path='/reg' component={Reg}/>
                <Route path='/search' component={Search}/>
                <Route path='/goodsInfo' component={GoodsInfo}/>
                <Redirect from="/" to='/main' exact/>
            </Switch>
        </>
    )
}

export default Layout;