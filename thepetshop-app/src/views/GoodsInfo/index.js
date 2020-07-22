import React,{useEffect, useState,useCallback,useRef} from 'react';
import { NavBar, Icon, Tabs, Carousel, WingBlank,Toast,Card, WhiteSpace } from 'antd-mobile';
import {Link,} from 'react-router-dom';
import './style.scss'
import BtnBox from './BtnBox'
import GoodsApi from '@/api/goods'
import {getToken,getUser} from '@/utils/auth';
import Allaction from '@/store/actions/cartAction';
import store from '@/store';

function GoodsInfo(props) {
  const token = getToken()//获取token
  // 此页面样式修改的数据
  const [domStyle,changeStyle] = useState('');

  // 商品数据
  const [ginfoData,setgiData] = useState(0);
  useEffect(()=>{
    const goodsGid = props.location.pathname.split('/')[2]
        GoodsApi.getGoodsInfo(goodsGid).then(res=>{
          if(res.data.flag){
            // console.log(res.data.data[0].imgdetail)
            let imgs = JSON.parse(res.data.data[0].imgdetail)
            // console.log(imgs[0])
            // imgs = Array.prototype.slice.call(imgs);
            let data = {
              ...res.data.data[0],
              imgdetail:imgs,
              gimgs:JSON.parse(res.data.data[0].gimgs)
            }
            setgiData(data)
          }
        })
  },[props])

  // 收藏
  const [wishlist,setWishlist] = useState(false);
  const changeWish = useCallback(()=>{
    if(!wishlist){
      Toast.success('收藏成功!', 1);
    }else{
      Toast.fail('取消收藏!', 1);
    }
    setWishlist(!wishlist)
  },[wishlist])

  // 顶部分页
  const tabs = [
    { title: '商品', sub: '1' },
    { title: '详情', sub: '2' },
    { title: '评价', sub: '3' },
  ];
  // 轮播图
  // }) 
  const [lbImgHeight, setLbImgHeight] = useState({
    imgHeight:375,
  })
  const [isRouter,setisRouter] = useState(props.history.location.state)

  // 弹出盒子
  const [onBoxshow1,changebtnshow1] = useState(0);
  const [boxDom,setBoxDom] = useState('');

  // 加入的商品数据
  const goodsDatRef = useRef('');
  const [cartNow,changeNow] = useState(false);//控制购物车跳转
  // 加入购物车
  const setCart = useCallback((data)=>{
    if(data.checkBtn){
      goodsDatRef.current = data
    }
    if(goodsDatRef.current.checkBtn){
      // console.log("ok:",goodsDatRef.current);
      changeStyle({
        btnFont:goodsDatRef.current.checkBtn,
        goodsPrice:goodsDatRef.current.priceDom,
        goodsNum:goodsDatRef.current.goodsNum
      });
      
      changeNow(true)
    }else{
      changebtnshow1(onBoxshow1+1)
      setBoxDom('box1')
      Toast.fail('请选择规格', 1);
      changeNow(false)
    }
  },[onBoxshow1])

  const goCart = async ()=>{
    let {uid} = getUser()
    let count = goodsDatRef.current.goodsNum
    let gsize = null;
    let {gid,gtitle,gimgs,gprice} = ginfoData;
    // console.log(gimgs[1]);
    if(gimgs.length>1){
      gimgs = gimgs[1];
    }else{
      gimgs = gimgs[0];
    }
    // console.log(gimgs);
    // console.log(ginfoData);
    // let nowprice = goodsDatRef.current.priceDom
    JSON.parse(ginfoData.gsize).forEach((item,index) => {
      if(goodsDatRef.current.checkBtn==item){
        return gsize = index
      }
    });
    // console.log("去也",'uid:'+uid,'gid:'+gid,'count:'+count,'gsize:'+gsize);
    try {
      let p = await GoodsApi.goSetGoodsCart(uid,gid,count,gsize)
      if(p.data.flag){
        Toast.success('加入购物车成功!', 1);
        store.dispatch(Allaction.add2cart({gid,gtitle,gimgs,gprice,ischeck:0,count,gsize}))
      }else{
        Toast.fail('加入购物车失败!!!', 1);
      }
    } catch (error) {
      console.log(error);
    }

  }
  return (
    <div className='goodsInfo-wrap'>
        <div className='goodsInfo-head'>
          <NavBar
            mode="light"
            icon={<Icon type="left" />}
            onLeftClick={() =>
                props.history.push(isRouter)
              }
            rightContent={[
              <Link key='goCart' className="goCart" to="/main/cart">
                  <i className="iconfont icon-gouwuche" style={{fontSize:'20px'}} />
              </Link>
              // <Icon key="1" type="ellipsis" />,
            ]}
          >
            <div className='goodsInfo-paging'>
              <Tabs tabs={tabs}
                initialPage={0}
                swipeable={false}
                // onChange={(tab, index) => { console.log('onChange', index, tab); }}
                // onTabClick={(tab, index) => { console.log('onTabClick', index, tab); }}
              >
                {/* 商品页 */}
                <div className="gInfo-show1" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '150px', backgroundColor: '#fff' }}>
                  {/* 轮播图 */}
                  <div className='goodsInfo-banner'>
                    <WingBlank>
                      <Carousel
                        autoplay
                        infinite
                        dotStyle={{marginBottom:'7px',background:'transparent',border:'1px solid #888888'}}
                        dotActiveStyle={{width:'20px',borderRadius:'4px',marginBottom:'7px'}}
                        // beforeChange={(from, to) => console.log(`slide from ${from} to ${to}`)}
                        // afterChange={index => console.log('slide to', index)}
                      >
                        {
                          ginfoData.gimgs?ginfoData.gimgs.map((val,index) => (
                            <a
                              key={index}
                              href="###"
                              style={{ display: 'inline-block', width: '100%', height: `${lbImgHeight.imgHeight}px`,overflow:'hidden' }}
                            >
                              <img
                                src={val}
                                alt=""
                                style={{ width: '100%', verticalAlign: 'top' }}
                                // onLoad={() => {
                                //   // fire window resize event to change height
                                //   window.dispatchEvent(new Event('resize'));
                                //   setLbImgHeight({ imgHeight: 'auto' });
                                // }}
                              />
                            </a>
                          )):''
                        }
                      </Carousel>
                    </WingBlank>
                  </div>
                  {/* 商品信息 */}
                  <div className='goods-blurb'>
                    <div className='goods-num'>
                      <span className="now">￥{
                        // goodsDatRef.current?goodsDatRef.current.priceDom:ginfoData.gprice
                        ginfoData.gprice
                      }</span>
                      <del className="old">￥{(ginfoData.gprice * 1.2).toFixed(2)}</del>
                      <b className="gQty">已售 {ginfoData.gxiaoliang}</b>
                    </div>
                      <h2 className="goods-gdesc">{ginfoData.gtitle}</h2>
                      <p className="goods-title">{ginfoData.gdesc}</p>
                  </div>

                  {/* 按钮区 */}
                  <div className='activity-wrap'>
                    <div className='btn' onClick={()=>{
                      changebtnshow1(onBoxshow1+1)
                      setBoxDom('box1')
                    }}>
                      <span>{
                        domStyle.btnFont?
                          '已选择：'+domStyle.btnFont+' 价格：'+goodsDatRef.current.priceDom
                        :
                          '请选择规格'
                      }</span>
                      <i className="iconfont icon-arrow-right-copy" />
                      
                    </div>

                    <div className='btn' onClick={()=>{
                      changebtnshow1(onBoxshow1+1)
                      setBoxDom('box2')
                    }}>
                      <span>优惠券</span>
                      <i className="iconfont icon-arrow-right-copy" />
                    </div>
                  
                  </div>

                  {/* 商品详情 */}
                  <div className='goods-imgs'>
                    <h2 className="gi-txt">—— 详情 ——</h2>
                    <div className='shops-wrap'>
                      <WingBlank size="lg">
                        <WhiteSpace size="lg" />
                          <Card>
                            <Card.Header
                              // title="This is title"
                              thumb={ginfoData.gbrandlogo}
                              extra={<span style={{color:'orange'}}>金牌品牌</span>}
                            />
                            <Card.Body>
                              <div>{ginfoData.gbrandtitle}</div>
                            </Card.Body>
                            <Card.Footer content="" extra={<div>好品牌，值得信赖</div>} />
                          </Card>
                          <WhiteSpace size="lg" />
                        </WingBlank>
                      {/* <div className='img-item'>
                        <img alt="" src={ginfoData.gbrandlogo} />
                      </div>
                      <h2 className="shops-name">{ginfoData.gbrandtitle}</h2> */}
                    </div>
                    <div className='img-box'>
                      {
                          ginfoData.imgdetail?ginfoData.imgdetail.map(item=>(
                            <img alt='' key={item} src={item} />
                          )):''
                      }
                    </div>
                  </div>

                    {/* 底部 */}
                  <div className='setCart-wrap'>
                    <div className='btmIcon'>
                      <div onClick={()=>props.history.push('/main/home')}>
                        <i className="iconfont icon-home-line" />
                        <span className="font">主页</span>
                      </div>
                      <div onClick={changeWish}>
                        <i className={wishlist?'wishlistShow iconfont icon-shoucang2':'iconfont icon-shoucang1'} />
                        <span className="font">收藏</span>
                      </div>
                    </div>
                    <div className='btmBtn'>
                      <div className='go-buys'>
                        <span onClick={
                          cartNow
                          ?
                          token?()=>props.history.push('/cart'):()=>Toast.fail('亲，你还未登录哦', 1)
                          :
                          setCart
                        }>立即购买</span>
                      </div>
                      <div className='set-cart'>
                        <span onClick={
                          cartNow
                          ?
                          token?goCart:()=>Toast.fail('亲，你还未登录哦', 1)
                          :
                          setCart
                        }>加入购物车</span>
                      </div>
                    </div>
                    
                  </div>
                      
                  {/* 弹出盒子 */}
                  <BtnBox 
                    onBoxshow={!!onBoxshow1}
                    setCart={(e)=>setCart(e)}
                    // btnboxHeight={boxDom.isHeight}
                    btmBoxStyle={boxDom}
                    gdata={ginfoData}
                    // bimBoxStyle={specification()}
                    // checkBtn={checkBtn}
                  >
                  </BtnBox>


                </div>
                  
                <div className="gInfo-show2" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '150px', backgroundColor: '#fff' }}>
                  
                  
                  {/* 商品详情 */}
                  <div className='goods-imgs'>
                  <div className='shops-wrap'>
                      <WingBlank size="lg">
                        <WhiteSpace size="lg" />
                          <Card>
                            <Card.Header
                              // title="This is title"
                              thumb={ginfoData.gbrandlogo}
                              extra={<span style={{color:'orange'}}>金牌品牌</span>}
                            />
                            <Card.Body>
                              <div>{ginfoData.gbrandtitle}</div>
                            </Card.Body>
                            <Card.Footer content="" extra={<div>好品牌，值得信赖</div>} />
                          </Card>
                          <WhiteSpace size="lg" />
                        </WingBlank>
                      {/* <div className='img-item'>
                        <img alt="" src={ginfoData.gbrandlogo} />
                      </div>
                      <h2 className="shops-name">{ginfoData.gbrandtitle}</h2> */}
                    </div>
                    <div className='img-box'>
                      {
                          ginfoData.imgdetail?ginfoData.imgdetail.map(item=>(
                            <img alt='' key={item} src={item} />
                          )):''
                      }
                    </div>
                  </div>
                
                
                </div>
                <div className="gInfo-show3" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '150px', backgroundColor: '#fff' }}>
                  —— 该功能正在开发中 ——
                </div>
              </Tabs>
            </div>
          </NavBar>
        </div>
    </div>
  )
}

export default GoodsInfo;