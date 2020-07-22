import React, { Component } from 'react';
// import 'antd/dist/antd.css';
import { withRouter } from 'react-router-dom';
import 'lib-flexible';
// import 'antd-mobile/dist/antd-mobile.css';
import '@/assets/icon/iconfont.css';
import {connect} from 'react-redux';
import store from './store';
import cartApi from '@/api/shoppingcart';
import {add} from '@/store/actions/cartAction';
// components
import Layout from '@/views/Layout';

@withRouter
@connect(({user:{userinfo}})=>({
    userinfo
}))
class App extends Component {

  componentDidMount() {
    this.props.history.listen((location) => {
      this.props.history.location.state = this.props.location.pathname
    })
    this.getCartGoods();
  }
  getCartGoods = async ()=>{
    const {userinfo} = this.props;
    let uid = userinfo.uid || '';
    // console.log(uid);
    if(uid){
      try{
        let p = await cartApi.getcart(uid);
        // console.log(p.data);
        if(p.data.flag){
          store.dispatch(add(p.data.data))
        }else{
          console.log('获取失败');
        }
      }catch(err){
        console.log(err);
      }
    }else{
      store.dispatch(add([]))
    }
  }
  // shouldComponentUpdate(){
  //   this.getCartGoods();
  //   return true
  // }
  render() {
    return (
      <div className="App">
        <Layout />
      </div>
    );
  }
}
export default App;
