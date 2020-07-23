import React,{lazy,Suspense} from 'react';
import {Route,Switch, Redirect} from 'react-router-dom';
import { ActivityIndicator } from 'antd-mobile';


// import AppMain from '@/components/AppMain';
// import Login from '@/views/Login';
// import Reg from '@/views/Reg';
// import Search from '@/views/Search';
// import GoodsInfo from '@/views/GoodsInfo';
// import Changeinfo from '@/views/Changeinfo';
// import ChangePass from '@/views/Changeinfo/ChangePass';
// import Address from '@/views/Changeinfo/address';
// import MyOrder from '@/views/MyOrder'
// import dfhOrder from '@/views/dfhOrder'

const AppMain = lazy(()=> import('../../components/AppMain')) 
const Login = lazy(()=> import('../Login')) 
const Reg = lazy(()=> import('../Reg')) 
const Search = lazy(()=> import('../Search')) 
const GoodsInfo = lazy(()=> import('../GoodsInfo')) 
const Changeinfo = lazy(()=> import('../Changeinfo')) 
const Address = lazy(()=> import('../Address')) 
const MyOrder = lazy(()=> import('../MyOrder')) 
const dfhOrder = lazy(()=> import('../dfhOrder')) 
const ChangePass = lazy(()=> import('../ChangePass')) 


function Layout (){//总路由转跳页面显示到这
    return (
        <>
        <Suspense fallback={<div><ActivityIndicator toast text="正在加载中..." /></div>}>
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
            </Suspense>
        </>
    )
}
export default Layout;