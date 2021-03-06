import React,{useState,useEffect,useCallback,lazy} from 'react';
import Navbar from '@/components/Navbar';
import {getToken,getUser} from '@/utils/auth';
import GoodsApi from '@/api/goods';
import '../dfhOrder/style.scss'

// const Navbar = lazy(()=> import('@/components/Navbar')) 
// const {getToken,getUser} = lazy(()=> import('@/utils/auth')) 
// const GoodsApi = lazy(()=> import('@/api/goods')) 

const token = getToken()
function MyOrder (props){

    const [orderData,setOrderData] = useState('');
    useEffect(()=>{
        if(token){
            console.log(token);
            let {uid} = getUser();
            GoodsApi.getMyOrder(uid).then(res=>{
                if(res.data.flag){
                    let arr = res.data.data
                    arr.forEach(item => {
                        let time = item.otime;
                        let d = new Date(time)
                        item.otime = d.toLocaleString()
                        // console.log(item.deliver);
                    });
                    setOrderData(arr)
                    // setOrderData(res.data.data)
                }
            })
        }
    },[])

    const goto = useCallback((gid)=>{
        props.history.push('/goodsInfo/'+gid)
    },[])

    return (
        <div className='myorder-wrap'>
            <div className='top'>
                <Navbar name="全部订单" props={props} />
            </div>
            {/* <div className='myorder-goods' style={orderData&&token?{}:{display:'none'}}> */}
            <div className='myorder-goods' style={orderData?{}:{display:'none'}}>
                {
                    orderData?orderData.map((item,index)=>(
                        <div className='goods-item' key={index}>
                            {/* <div className='topTitle'>
                                <h2 className="gbrandtitle">沙雕国富旗舰店 {'>'}</h2>
                            </div> */}
                            <span className="fh-title">{item.deliver?'待收货':'商家还未发货'}</span>
                            <div className='goods-message'>
                                <img alt="" src={item.gimgs}  onClick={(goto.bind(null,item.gid))}/>
                                <h3 className="goods-title"  onClick={goto.bind(null,item.gid)}>{item.gtitle}
                                    <span className="goods-size">规格：{item.gsize}</span>
                                </h3>
                                <div className='goods-num-box'>
                                <span className="goods-price">￥<b>{(item.gprice).toFixed(2)}</b></span>
                                    <span className="goods-count">数量&times;{item.count}</span>
                                </div>
                            </div>
                            <div className='order-btm'>
                                <h2 className='odr-time'>日期：{item.otime.replace(/\//g,'.')}</h2>
                                <div className='order-btn'>
                                    <span className="goGoodsInfo" onClick={goto.bind(null,item.gid)}>查看商品</span>
                                    <span className="order-isok" style={
                                        item.deliver==1?{}:{display:'none'}
                                    }>确认收货</span>
                                </div>
                                
                            </div>
                        </div>
                    ))
                    :''
                }
            </div>
            <div className='noGoods' style={!token?{}:{display:'none'}}>
                <div className='noGoodsBg'></div>
                <h2>什么也找不到……</h2>
            </div>
        </div>
    )
}

export default MyOrder