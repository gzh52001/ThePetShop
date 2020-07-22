import React from 'react';
import {Route,Switch, Redirect,withRouter} from 'react-router-dom';
import AppMain from '@/components/AppMain';
import Login from '@/views/Login';
import Reg from '@/views/Reg';
import Search from '@/views/Search';
import GoodsInfo from '@/views/GoodsInfo';
import Changeinfo from '@/views/Changeinfo';
import ChangePass from '@/views/Changeinfo/ChangePass';
import Address from '@/views/Changeinfo/address';
import MyOrder from '@/views/MyOrder'
import dfhOrder from '@/views/dfhOrder'
function Layout (){//总路由转跳页面显示到这
    return (
        <>
            <Switch>
                <Route path='/main' component={AppMain}/>
                <Route path='/login' component={Login}/>
                <Route path='/reg' component={Reg}/>
                <Route path='/search' component={Search}/>
                <Route path='/goodsInfo' component={GoodsInfo}/>
                <Route path='/changeinfo' component={Changeinfo}/>
                <Route path='/changepass' component={ChangePass}/>
                <Route path='/address' component={Address}/> 
                <Route path='/myorder' component={MyOrder}/> 
                <Route path='/dfhorder' component={dfhOrder}/> 
                <Redirect from="/" to='/main' exact/>
            </Switch>
        </>
    )
}
export default Layout;