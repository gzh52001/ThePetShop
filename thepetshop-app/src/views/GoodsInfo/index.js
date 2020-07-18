import React,{useEffect, useState} from 'react';
import { NavBar, Icon, Tabs, Carousel, WingBlank } from 'antd-mobile';
import './style.scss'
import BtnBox from './BtnBox'
function GoodsInfo() {

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
  useEffect(()=>{
  })

  // 弹出盒子
  const [onBoxshow1,changebtnshow1] = useState(0);
  const [boxDom,setBoxDom] = useState('');

  function dom1(){
    return (
      <div >dom1</div>
    )
  }
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
            onLeftClick={() => console.log('onLeftClick')}
            rightContent={[
              <Icon key="0" type="search" />,
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
                                onLoad={() => {
                                  // fire window resize event to change height
                                  window.dispatchEvent(new Event('resize'));
                                  setLbImgHeight({ imgHeight: 'auto' });
                                }}
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
                    <div className='btn1' onClick={()=>{
                      changebtnshow1(onBoxshow1+1)
                      setBoxDom(dom1())
                    }}>
                      <span>请选择规格</span>
                      <i className="iconfont icon-arrow-right-copy" />
                      {/* <div className='btn1-show'>
                        <div className='isBox'></div>
                      </div> */}
                      
                      <BtnBox 
                        onBoxshow={!!onBoxshow1}
                        // onBoxshow={true}
                        title=''
                        // btnboxHeight="0px"
                        ss={boxDom}
                      >
                      </BtnBox>
                    </div>
                  </div>


                  <div className='activity-wrap'>
                    <div className='btn1' onClick={()=>{
                      changebtnshow1(onBoxshow1+1)
                      setBoxDom(dom2())
                    }}>
                      <span>请选择规格2</span>
                      <i className="iconfont icon-arrow-right-copy" />
                    </div>
                  </div>

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