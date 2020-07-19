import React,{useEffect, useState,useCallback} from 'react';
import { NavBar, Icon, Tabs, Carousel, WingBlank } from 'antd-mobile';
import {Link,} from 'react-router-dom';
import './style.scss'
import BtnBox from './BtnBox'


function GoodsInfo(props) {


  // 顶部分页
  const tabs = [
    { title: '商品', sub: '1' },
    { title: '详情', sub: '2' },
    { title: '评价', sub: '3' },
  ];
  // 轮播图
  const [lbImgs, setLbImgs] = useState({
    data: ['https://img2.epetbar.com/common/upload/commonfile/2020/05/010/0101949_734383.jpg', 'https://img2.epetbar.com/common/upload/commonfile/2020/05/010/0101949_734383.jpg', 'https://img2.epetbar.com/common/upload/commonfile/2020/05/010/0101949_734383.jpg'],
  }) 
  const [lbImgHeight, setLbImgHeight] = useState({
    imgHeight:375,
  })
  const [isRouter,setisRouter] = useState(props.history.location.state)
  const [goodsData, setGoodsData] = useState([])
  useEffect(()=>{
    async function getThisGdata(){
      try {
        
      } catch (error) {
        console.log(error);
      }
    }
    getThisGdata();
  })

  // 弹出盒子
  const [onBoxshow1,changebtnshow1] = useState(0);
  const [boxDom,setBoxDom] = useState('');

  const [checkBtn,changeCheckBtn] = useState(null);

  const [goodsNum,changeGoodsNum] = useState(1);
  

  useEffect(()=>{
    console.log(boxDom);
    setBoxDom(boxDom)
  },[boxDom])
  // function specification(){
  //   return (
      
  //   )
  // }
  function dom2(){
    return (
      <div >dom2</div>
    )
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
              <Link key='goCart' className="goCart" to="/cart">
                  <i className="iconfont icon-gouwuche" />
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
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '150px', backgroundColor: '#fff' }}>
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
                          lbImgs.data.map((val,index) => (
                            <a
                              key={index}
                              href="http://www.alipay.com"
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
                          ))
                        }
                      </Carousel>
                    </WingBlank>
                  </div>
                  {/* 商品信息 */}
                  <div className='goods-blurb'>
                    <div className='goods-num'>
                      <span className="now">￥22</span>
                      <del className="old">￥22</del>
                      <b className="gQty">已售 222</b>
                    </div>
                    <p className="goods-title">ssssssssssss</p>
                  </div>

                  {/* 按钮区 */}
                  <div className='activity-wrap'>
                    <div className='btn' onClick={()=>{
                      changebtnshow1(onBoxshow1+1)
                      setBoxDom('box1')
                    }}>
                      <span>请选择规格</span>
                      <i className="iconfont icon-arrow-right-copy" />
                      
                    </div>

                    <div className='btn' onClick={()=>{
                      changebtnshow1(onBoxshow1+1)
                      setBoxDom('box2')
                    }}>
                      <span>请选择规格2</span>
                      <i className="iconfont icon-arrow-right-copy" />
                    </div>
                  
                  </div>
                      

                  <h2>{boxDom}</h2>
                  {/* 弹出盒子 */}
                  <BtnBox 
                    onBoxshow={!!onBoxshow1}
                    // onBoxshow={true}
                    title=''

                    // btnboxHeight={boxDom.isHeight}
                    bimBoxStyle={boxDom}
                    btnboxHeight={'420px'}
                    // bimBoxStyle={specification()}
                    // checkBtn={checkBtn}
                  >
                  </BtnBox>


                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '150px', backgroundColor: '#fff' }}>
                  Content of second tab
                              </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '150px', backgroundColor: '#fff' }}>
                  Content of third tab
                              </div>
              </Tabs>
            </div>
          </NavBar>
        </div>
    </div>
  )
}

export default GoodsInfo;