import React, { Component } from 'react';
import { NavBar, Checkbox, Flex, Button, NoticeBar, Stepper, Icon, Toast, Modal } from 'antd-mobile';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { withLogin } from '@/utils/hoc';
import cartApi from '@/api/shoppingcart';
import { getUser } from '@/utils/auth';
import Allaction from '@/store/actions/cartAction';
import './cart.scss';
const CheckboxItem = Checkbox.CheckboxItem;
const AgreeItem = Checkbox.AgreeItem;

@connect(({ cart: { goods } ,user:{userinfo}}) => ({
    goods: goods,
    totalPrice: goods.filter(item => item.ischeck === 1).reduce((prev, item) => prev + item.gprice * item.count, 0),
    totalGoods: goods.length,
    isAllcheck:goods.every(item=>item.ischeck),// 设置全选是否是选中状态
    userinfo
}), dispatch => ({
    addgoods(goods){
        dispatch(Allaction.add(goods))
    },
    changenum(gid, uid, gsize, count) {//改变商品数量
        // console.log(gid, uid,gsize,count);
        dispatch({
            type: 'CHANGE_NUM',
            gid,
            count,
            uid,
            gsize
        })
    },
    changecheck(cid, check) {//修改选中状态
        dispatch(Allaction.ischeck(cid, check))
    },
    goodsallCheck(check) {//全选
        dispatch(Allaction.allCheck(check))
    },
    delgoods(gids) {//删除选中商品
        dispatch(Allaction.delGoods(gids))
    },
    changeshownum(cid,istrue){//修改isnum
        dispatch(Allaction.changeisnum(cid,istrue))
    }
}))
@withLogin
class Cart extends Component {
    constructor() {
        super();
        this.state = {
            userinfo: {},
            num: 1,
            isdel: false
        }
    }
    //管理
    isdel = (e) => {
        if (e.target.innerText === '完成') {
            this.setState({
                isdel: false
            })
        } else {
            this.setState({
                isdel: true
            })
        }
    }
    // 修改选中
    check = async (cid, e) => {
        const { changecheck, goods } = this.props;
        // const { userinfo: { uid } } = this.state;
        // console.log(gid,e);
        try {
            const num = e.target.checked ? 1 : 0;
            // console.log(gid, gsize);
            //修改后台商品选中状态
            let p = await cartApi.checkcart(cid, e.target.checked);
            if (p.data.flag) {
                changecheck(cid, num);
                let istrue = true;
                goods.forEach(item => {
                    if (!item.ischeck) {
                        istrue = false;
                        return
                    }
                })
                this.setState({
                    isAllcheck: istrue
                })
                // console.log(goods);
            } else {
                console.log('出错了');
            }
        } catch (err) {
            console.log(err);
        }

    }
    //全选
    changeallcheck = async (e) => {
        const { goodsallCheck } = this.props;
        const { userinfo: { uid } } = this.state;
        const num = e.target.checked ? 1 : 0;
        try {
            let p = await cartApi.checkAll(uid, num);
            if (p.data.flag) {
                // console.log(p.data);
                this.setState({
                    isAllcheck: e.target.checked
                })
                goodsallCheck(num);
            } else {
                console.log('全选失败');
            }
        } catch (err) {
            console.log(err);
        }

    }
    // 删除选中商品 或 结算选中商品
    delOrpay = async (e) => {
        const { goods, delgoods } = this.props;
        const { userinfo: { uid ,address} } = this.state;
        let istrue = false;
        goods.forEach(item => {
            if (item.ischeck) {
                istrue = true;
                return
            }
        })
        let cids = goods.filter(item => item.ischeck)
        if (!istrue) {
            Toast.fail('请先选中商品', 2);
            return;
        }
        // console.log(e.target.innerText);
        if (e.target.innerText === '删除') {//删除商品
            // console.log('gids====',gids);
            Modal.alert('删除商品', '您确定要删除吗???', [
                { text: '取消' },
                {
                    text: '确定',
                    onPress: async () => {
                        try {
                            let p = await cartApi.delgood();
                            if (p.data.flag) {
                                delgoods(cids);
                                Toast.success('删除成功', 2);
                            } else {
                                Toast.fail('删除失败', 2)
                            }
                        } catch (err) {
                            console.log(err);
                        }
                    }
                },
            ])
        } else if (e.target.innerText === '结 算') {
            try {
                if(address){
                    let p = await cartApi.addorder(uid);
                    if (p.data.flag) {
                        // console.log(gids);
                        Toast.success('结算成功', 2);
                        let p = await cartApi.delgood();
                        if (p.data.flag) {
                            delgoods(cids);
                            // Toast.success('删除成功', 2);
                        } else {
                            // Toast.fail('删除失败', 2)
                            console.log('删除失败');
                        }
                    } else {
                        Toast.fail('结算失败', 2)
                    }
                }else{
                    Toast.fail('请先去填写自己的收货地址',2)
                }
            } catch (err) {
                console.log(err);
            }
        }
        // console.log(e.target);

    }
    async componentDidMount() {
        this.setState({
            userinfo: getUser()
        })
        this.getCartGoods();
    }

    goto = (gid)=>{
        this.props.history.push('/goodsInfo/'+gid)
    }
    getCartGoods = async ()=>{
        const {userinfo,addgoods} = this.props;
        let uid = userinfo.uid || '';
        // console.log(uid);
        if(uid){
          try{
            let p = await cartApi.getcart(uid);
            // console.log(p.data);
            if(p.data.flag){
                p.data.data.forEach(item=>{
                    item.isnum = false;
                })
                console.log(p.data.data);
                addgoods(p.data.data)
            }else{
            //   console.log('获取失败');
            }
          }catch(err){
            console.log(err);
          }
        }else{
            addgoods([])
        }
      }

    render(login) {
        const { isdel, userinfo: { address, uid } } = this.state;
        // console.log(this.props);
        const { goods, changenum, totalPrice, totalGoods,isAllcheck,changeshownum } = this.props;
        // console.log(goods)
        // console.log(totalGoods);
        return (
            <div className='cart'>
                {/* <div className='topBack' onClick={()=>history.push(path)} style={path?{}:{display:'none'}}>
                    <i className="iconfont icon-jiantou-copy"></i>
                </div> */}
                {/* 购物车顶部 */}
                <NavBar
                    className='cart-top'
                    mode="light"
                    rightContent={
                        isdel ? <span onClick={this.isdel}>完成</span> : <span onClick={this.isdel}>管理</span>
                    }
                >购物车({login ? totalGoods : '0'})</NavBar>

                {
                    login ?
                        
                        <>
                            {
                                    totalGoods > 0 ?
                                    <>
                                        <div className='cart-main'>
                                            {/* 购物车中间 */}
                                            <NoticeBar mode="closable" icon={null}>
                                                共{goods.length}件宝贝  收货地址：{address}
                                            </NoticeBar>
                                            {
                                                goods.map(item => (
                                                    <dl key={item.cid}>
                                                        <dd>
                                                            <CheckboxItem checked={item.ischeck} onChange={this.check.bind(this, item.cid)} />
                                                            <img onClick={this.goto.bind(null,item.gid)} src={item.gimgs}></img>
                                                        </dd>
                                                        <dt>
                                                            <h4>{item.gtitle}</h4>
                                                            <p>{item.gsize}</p>
                                                            <div className='cart-main-num'>
                                                                <span>
                                                                    ￥{item.gprice}
                                                                </span>
                                                                <div className='cart-main-num_1'>
                                                                    {
                                                                        item.isnum ?
                                                                            <>
                                                                                <Stepper
                                                                                    style={{ width: '70px', minWidth: '70px', height: '20px' }}
                                                                                    showNumber
                                                                                    value={item.count}
                                                                                    onChange={changenum.bind(this, item.gid, uid, item.gsize)}
                                                                                    max={6}
                                                                                    min={1}
                                                                                />
                                                                                <Icon type="cross-circle-o" size='sm' color='#ff6e2d' onClick={changeshownum.bind(this,item.cid,false)} />
                                                                            </>
                                                                            :
                                                                            <div className='smNum' onClick={changeshownum.bind(this,item.cid,true)}>
                                                                                x{item.count}
                                                                            </div>
                                                                    }
                                                                </div>
                                                            </div>
                                                        </dt>
                                                    </dl>
                                                ))
                                            }
                                        </div>
                                        <div className='cart-footer'>
                                            {/* 购物车底部 */}
                                            <Flex justify='between' className='footer-box'>
                                                <Flex.Item className='foot-left'>
                                                    <AgreeItem data-seed="logId" onChange={this.changeallcheck} checked={isAllcheck}>
                                                        全选
                                                    </AgreeItem>
                                                </Flex.Item>
                                                <Flex.Item className='foot-right'>
                                                    {
                                                        isdel ? <Button type='ghost' className='foot-btn1' onClick={this.delOrpay}> 删除</Button>
                                                            :
                                                            <>
                                                                <span className='foot-title'>合计:<em>￥{totalPrice}</em></span>
                                                                <Button className='foot-btn2' onClick={this.delOrpay}>结算</Button>
                                                            </>
                                                    }

                                                </Flex.Item>
                                            </Flex>
                                        </div>
                                    </>
                                    :
                                    <div className='nologin'>
                                        <div  className="isFont">
                                            <div className='notLogin'></div>
                                            购物车空空如也，去<Link to='/main/classify'>选购商品</Link>吧~</div>
                                    </div>
                            }
                        </>   
                        :
                        <>
                            <div className='nologin'>
                                <div className='notLogin-top'>
                                    登录后可同步账户购物车中的商品
                                    <span><Link to='/login'>登录</Link></span>
                                </div>
                                <div className="isFont">
                                    <div className='notLogin'></div>
                                    登录后可同步购物车中商品
                                </div>
                            </div>
                        </>
                }


            </div>
        )
    }
}

export default Cart;