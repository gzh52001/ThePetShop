import React, { Component } from 'react';
import { Toast,Badge } from 'antd-mobile';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';
import '../../assets/icon/iconfont.css';
import './mine.scss';
import { getUser,getToken } from '@/utils/auth';
import { withLogin } from '@/utils/hoc';
import GoodsApi from '@/api/goods'
@connect(({user:{userinfo}})=>({
    userinfo
}))
@withLogin
class Mine extends Component {
    constructor() {
        super();
        this.state = {
            tools: [
                {
                    id: 1,
                    icon: 'icon-gouwuchekong',
                    title: '购物车',
                    span: '',
                    path: '/main/cart'
                },
                {
                    id: 2,
                    icon: 'icon-zhanghu2',
                    title: '账户',
                    span: '',
                    path: '/changeinfo'
                },
                {
                    id: 3,
                    icon: 'icon-ziyuan',
                    title: '红包',
                    span: '',
                    path: ''
                },
                {
                    id: 4,
                    icon: 'icon-duihuan1',
                    title: '兑换',
                    span: '',
                    path: ''
                },
                {
                    id: 5,
                    icon: 'icon-youhuiquan',
                    title: '优惠卷',
                    span: '',
                    path: ''
                },
                {
                    id: 6,
                    icon: 'icon-kefu',
                    title: '帮助与客服',
                    span: '',
                    path: ''
                },
                {
                    id: 7,
                    icon: 'icon-dingdanshijian',
                    title: '拼团订单',
                    span: '',
                    path: ''
                },
                {
                    id: 8,
                    icon: 'icon-shangdian',
                    title: '0元开店',
                    span: '最高返利70%',
                    path: ''
                },
                {
                    id: 9,
                    icon: 'icon-fanli',
                    title: '测评返现',
                    span: '月入2000元',
                    path: ''
                },
                {
                    id: 10,
                    icon: 'icon-gongyi',
                    title: '公益',
                    span: '',
                    path: ''
                },
                {
                    id: 11,
                    icon: 'icon-yaoqingfanli',
                    title: '邀请返利',
                    span: '首单返15%',
                    path: ''
                },
                {
                    id: 12,
                    icon: 'icon-shangdian-',
                    title: '神秘商店',
                    span: '单单有礼',
                    path: ''
                }
            ],
            orders: [
                {
                    id: 1,
                    icon: 'icon-fukuan',
                    title: '订单',
                    path: '/MyOrder',
                    count: 0
                },
                {
                    id: 2,
                    icon: 'icon-daifahuo1',
                    title: '代发货',
                    path: '/dfhOrder?dfh',
                    count: 0
                },
                {
                    id: 3,
                    icon: 'icon-daifahuo2',
                    title: '待收货',
                    path: '/dfhOrder?dsh',
                    count: 0
                },
                {
                    id: 4,
                    icon: 'icon-daipingjia',
                    title: '待评价',
                    path: '',
                    count: 0
                },
                {
                    id: 5,
                    icon: 'icon-tuihuoshouhou',
                    title: '退货退款',
                    path: '',
                    count: 0
                }
            ],
            info: [
                {
                    id: 1,
                    count: 0,
                    title: '关注'
                },
                {
                    id: 2,
                    count: 0,
                    title: '粉丝'
                }, {
                    id: 3,
                    count: 0,
                    title: '收藏'
                },
                {
                    id: 4,
                    count: 0,
                    title: '足迹'
                }
            ],
            userimg: '',
            myname: '',
        }
    }
    clickTool(path) {
        const {userinfo} = this.props;
        // console.log(JSON.stringify(userinfo)==='{}');
        if(JSON.stringify(userinfo)!=='{}' && path){
            this.props.history.push(path);
            return;
        }else if(JSON.stringify(userinfo)==='{}' && path){
            Toast.fail('请先登录',2);
            return;
        }
        Toast.info('该功能开发中', 1);
    }
    gotoUserinfo() {
        if(getUser()){
            this.props.history.push('/changeinfo');
            return;
        }
        Toast.fail('请先登录!!',2)
    }
    componentDidMount() {
        let token = getToken();
        const { orders } = this.state
        if(token){
            let {uid} = getUser();
            GoodsApi.getMyOrder(uid,0).then(res=>{
                // console.log(res.data);
                if(res.data.flag){
                    let num = 0;
                    res.data.data.forEach(item => {
                        if(item.deliver===0){
                            num++
                        }
                    });
                    orders[1].count = num
                    this.setState({
                        ...this.state,
                        orders:[...orders]
                    })
                }
            })
            GoodsApi.getMyOrder(uid,1).then(res=>{
                // console.log(res.data);
                if(res.data.flag){
                    let num = 0;
                    res.data.data.forEach(item => {
                        // console.log( res.data);
                        if(item.deliver===1){
                            num++
                        }
                    });
                    orders[2].count = num
                    this.setState({
                        ...this.state,
                        orders:[...orders]
                    })
                    // console.log(this.state.orders);
                }
            })
        }
        let userimg = getUser().userface;
        let myname = getUser().myname;
        this.setState({
            userimg,
            myname
        })
    }
    render(islogin) {
        // console.log(islogin);
        const { tools, orders, userimg, myname, info } = this.state;
        // console.log(userimg);
        return (
            <div className='mine'>
                <div className='mine_top'>
                    <span><i className='iconfont icon-dkw_xiaoxi' /></span>
                    <span onClick={this.gotoUserinfo.bind(this)}><i className='iconfont icon-shezhi' /></span>
                </div>
                <div className='mine_user'>
                    <div className='user-img-box'>
                        <a className='user-img-link'>
                            {
                                islogin ?
                                    <img src={userimg} alt='用户头像' />
                                    :
                                    (
                                        <img src={require('@/assets/img/nologin.jpg')} alt='用户头像' />
                                    )
                            }
                        </a>
                        {
                            islogin ? <a>{myname}</a> : <Link to='/login'>登录 / 注册</Link>
                        }
                    </div>
                    <div className='user-info-box'>
                        {
                            info.map(item => (
                                <dl key={item.id}>
                                    <dt>{item.count}</dt>
                                    <dd>{item.title}</dd>
                                </dl>
                            ))
                        }
                    </div>
                </div>
                <div className='mine_content'>
                    <div className='mine-order'>
                        <h4>
                            <p>我的订单</p>
                        </h4>
                        <div className='mine-order_content'>
                            {
                                orders.map(item => (
                                    <dl key={item.id} onClick={()=>this.props.history.push(item.path)}>
                                        <dt>
                                            <i className={'iconfont ' + item.icon} />
                                            {
                                                // item.count === 0 ?
                                                //     null
                                                //     :
                                                    <Badge text={item.count} overflowCount={99} />
                                            }

                                        </dt>
                                        <dd>
                                            {item.title}
                                        </dd>
                                    </dl>
                                ))
                            }

                        </div>
                        <div className='mine-order_link'>
                            <a>
                                <img src='https://api.boqiicdn.com/e7c498a5d97d6568353bd171a107e864.jpg' alt='优惠信息' />
                            </a>
                        </div>
                    </div>
                    <div className='mine-tool'>
                        <h4>
                            <p>我的工具</p>
                        </h4>
                        <div className='mine-tool_content'>
                            {
                                tools.map(item => (
                                    <dl key={item.id} onClick={this.clickTool.bind(this, item.path)}>
                                        <dt><i className={'iconfont ' + item.icon} /></dt>
                                        <dd>
                                            <p>{item.title}</p>
                                            {
                                                item.span ?
                                                    <span>{item.span}</span> :
                                                    null
                                            }
                                        </dd>
                                    </dl>
                                ))
                            }

                        </div>

                    </div>
                </div>
            </div>
        )
    }
}


export default Mine;