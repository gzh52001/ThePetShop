import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Carousel, WingBlank, Grid, Tabs, WhiteSpace } from 'antd-mobile';
import GoodsApi from '@/api/goods';


import './style.scss'
import TextArea from 'antd/lib/input/TextArea';

class Home extends Component {
    constructor() {
        super();
        this.state = {
            data: ['1', '2', '3'],
            imgHeight: 176,
            // 限时秒杀
            tabs: [],
            killdata: [],
            killTime :[
                {
                    title:'09:00'
                },
    
                {
                    title:'10:00'
                },
    
                {
                    title:'11:00'
                },
    
                {
                    title:'12:00'
                },
    
                {
                    title:'13:00'
                },
    
                {
                    title:'14:00'
                },
    
                {
                    title:'15:00'
                },
    
                {
                    title:'16:00'
                },
    
                {
                    title:'17:00'
                },
    
                {
                    title:'18:00'
                },
    
                {
                    title:'19:00'
                },
    
                {
                    title:'20:00'
                },
    
                {
                    title:'21:00'
                },
    
                {
                    title:'22:00'
                },
    
            ],
            // 分类展示
            // ["海淘精选", "猫咪主粮", "狗狗主粮", "营养保健", "狗狗零食", "猫咪零食", "日常用品", "医疗护理"]
            classifyTabs: [
                {
                    title: '海淘精选',
                    classifyData:[],
                    tid:0
                },
                {
                    title: '狗狗窝垫',
                    classifyData:[],
                    tid:3
                },
                {
                    title: '狗狗主粮',
                    classifyData:[],
                    tid:1
                },
                {
                    title: '营养保健',
                    classifyData:[],
                    tid:6
                },
                {
                    title: '狗狗零食',
                    classifyData:[],
                    tid:2
                },
                {
                    title: '狗狗美容',
                    classifyData:[],
                    tid:12
                },
                {
                    title: '日常用品',
                    classifyData:[],
                    tid:8
                },
                {
                    title: '医疗护理',
                    classifyData:[],
                    tid:7
                },
            ],
            classifyIdx:0,
            classifyFD:null,
            classifyPage:0,

            // 每日上新
            newDayData:[]
        }
    }

    componentDidMount() {
        // simulate img loading
        setTimeout(() => {
            this.setState({
                data: [
                    require('../../assets/img/banner-1.jpg'),
                    require('../../assets/img/banner-2.jpg'),
                    require('../../assets/img/banner-3.jpg'),
                    require('../../assets/img/banner-4.jpg'),
                    require('../../assets/img/banner-5.jpg'),
                    require('../../assets/img/banner-6.jpg'),
                    require('../../assets/img/banner-7.jpg'),
                ]
            });
        }, 100);
        // 限时秒杀，打开网站第一个高亮
        this.killShow();
        // 调用请求限时秒杀数据函数
        this.killData();

        // 调用请求分类展示数据函数
        this.getClassifyData();

        // 调用请求每日上新数据函数
        this.getNewDayData();

        this.topStyle();
    }

    componentDidUpdate(){
        this.topStyle()
    }

    // 懒加载
    topStyle(){
        let home = document.getElementsByClassName('show-wrap')[0]
        let head = document.getElementsByClassName('home-head')[0]
        let icon1 = head.querySelector('.goMine .iconfont')
        let icon2 = head.querySelector('.goCart .iconfont')
        let search = head.querySelector('.home-search')
        let istop = document.querySelector('.classify-wrap .am-tabs-tab-bar-wrap')

        let istops = 0
        let domHeight = document.getElementsByClassName('home')[0].offsetHeight
        const {classifyIdx,classifyTabs,classifyFD,classifyPage} = this.state
        home.onscroll = ()=>{
            istops = home.scrollTop + window.innerHeight;
            if(home.scrollTop<=200){
                head.style.background = `rgba(255,255,255,${home.scrollTop/50})`;
                icon1.style.color = `rgba(51,51,51,${home.scrollTop/50})`
                icon2.style.color = `rgba(51,51,51,${home.scrollTop/50})`
                search.style.background = '#f6f6f6'
            }
            if(home.scrollTop<=20){
                icon1.style.color = `rgb(255,255,255)`
                icon2.style.color = `rgb(255,255,255)`
                search.style.background = `rgb(255,255,255)`
            }
            if(home.scrollTop>=1070){
                istop.style.cssText = `
                    z-index: 999;
                    position: fixed;
                    top: 0;
                `
            }else{
                istop.style.cssText = `position:sticky`;
            }
            // console.log(home.scrollTop);
            if(istops>=domHeight){
                if(classifyFD==null){
                    GoodsApi.allGoods(classifyIdx,classifyPage+1,8).then(res=>{
                        if(res.data.flag){
                            classifyTabs.forEach(item=>{
                                if(item.tid==classifyIdx){
                                    item.classifyData = [...item.classifyData,...res.data.data.goodsinfo]
                                }
                            })
                            this.setState({
                                classifyTabs,
                                classifyPage:classifyPage+1,
                                classifyFD:null
                            })
                        }
                    });
                }
            }
        }
    }

    render() {
        // 宫格（home的nav跳转圈圈）
        const data = Array.from(new Array(5)).map((_val, i) => ({
            // icon: 'https://gw.alipayobjects.com/zos/rmsportal/nywPmnTAvTmLusPxHPSu.png',
            // text: `name${i}`,
        }));

        // 限时秒杀
        const { tabs, killdata,classifyTabs,newDayData } = this.state;

        // 每日上新
        const newdata = Array.from(newDayData).map((item, i) => ({
            icon: item.gimgs,
            title: item.gtitle,
            price: item.gprice,
        }));
        return (

            <div className="home">
                {/* 顶部 */}
                <div className='home-head'>
                    <Link className="goMine" to="/mine">
                        <i className="iconfont icon-geren11"></i>
                    </Link>
                    <h1 className='home-search' onClick={()=>{this.props.history.push('/search')}}>
                        <i className="iconfont icon-sousuo1"></i>
                        请输入搜索关键字
                    </h1>
                    <Link className="goCart" to="/cart">
                        <i className="iconfont icon-gouwuche" />
                    </Link>
                </div>
                {/* 轮播图 */}
                <WingBlank>
                    <Carousel
                        autoplay={true}
                        infinite
                        autoplayInterval={2000}
                    >
                        {this.state.data.map(val => (
                            <a
                                key={val}
                                href="http://www.alipay.com"
                                style={{ display: 'inline-block', width: '100%', height: this.state.imgHeight }}
                            >
                                <img
                                    src={val}
                                    alt=""
                                    style={{ width: '100%', verticalAlign: 'top' }}
                                    onLoad={() => {
                                        // fire window resize event to change height
                                        window.dispatchEvent(new Event('resize'));
                                        this.setState({ imgHeight: 'auto' });
                                    }}
                                />
                            </a>
                        ))}
                    </Carousel>
                </WingBlank>
                {/* 圈圈跳转 */}
                <div className='home-nav'>
                    <Grid data={data} hasLine={false} columnNum={5} onClick={(data,index)=>{
                        
                        if(index===4){
                            this.props.history.push('/main/classify')
                        }else{
                            this.props.history.push('/goodsInfo')
                        }

                    }} />
                </div>

                {/* 礼包广告 */}
                <div className="home-discounts">
                    <img src={require('../../assets/img/libao.gif')} />
                </div>

                {/* title分隔 */}
                <div className='home-title'>
                    <img src={require('../../assets/img/home-title.jpg')} />
                </div>

                {/* 限时秒杀 */}
                <div className="home-kill">
                    <WhiteSpace />
                    <Tabs 
                        tabs={tabs}
                        swipeable={false} 
                        onTabClick = { (tab, index) => {this.killActive(tab,index)}}
                        tabBarUnderlineStyle={{display:'none'}}
                        
                        renderTabBar={props =>  
                        <Tabs.DefaultTabBar {...props} page={3.6}/>}
                        tabBarActiveTextColor='rgba(255,255,255,1)'
                        tabBarInactiveTextColor='rgba(255,255,255,.6)'
                    >
                        {this.renderContent(killdata)}
                    </Tabs>
                    <WhiteSpace />
                </div>

                {/* 每日上新 */}
                <div className='newDay-img'>
                    <img src={require('../../assets/img/setNewDay.jpg')} />
                </div>
                <div className='newDay-wrap'>
                    <Grid
                     data={newdata} 
                     carouselMaxRow={1} 
                     isCarousel 
                     hasLine={false}
                    //  onClick={_el => console.log(_el)} 
                    itemStyle={{height:'170px' ,padding:'5px 0' }}
                     renderItem={dataItem => (
                        <div style={{ padding: '5px' }}>
                          <img src={dataItem.icon} style={{ width: '75px', height: '75px' }} alt="" />
                          <div style={{ color: '#888', fontSize: '14px', marginTop: '12px' }}>
                            <span className="new-title">{dataItem.title}</span>
                            <span className="price">￥{dataItem.price}</span>
                          </div>
                        </div>
                      )}
                    />
                </div>

                {/* vip卡 */}
                <div className='vip-card'>
                    <img src={require('../../assets/img/isVip.gif')} />
                </div>

                {/* 分类展示模块 */}
                <div className='classify-wrap'>
                    <div>
                        <WhiteSpace />
                        <Tabs
                         tabs={classifyTabs} 
                         useOnPan={false}
                         swipeable={false}
                         tabBarActiveTextColor='#f55b50'
                         tabBarUnderlineStyle={{borderColor:'#f55b50'}}
                         onTabClick={ (tab, index) => {this.classifyShow(tab,index)}}
                        //  animated={false} 
                         renderTabBar={props => <Tabs.DefaultTabBar {...props} page={4.7} />}
                        >
                            {this.classifyContent}
                        </Tabs>
                        <WhiteSpace />
                    </div>
                </div>

            </div>
        )
    }


    // 每日上新
    // 获取商品数据
    async getNewDayData(){
        try {
            let p = await GoodsApi.randomGoods(8);
            if(p.data.flag){
                this.setState({
                    newDayData:p.data.data
                })
            }
        } catch (error) {
            console.log(error);
        }
    }

    // 分类展示模块
    // 点击触发的函数
    classifyContent = tab =>
    (<div className="classify-info" >
      {
          tab.classifyData.map((item,index)=>(
            <div key={index} className='classify-item'>
                <div className='img-item'>
                    <img src={item.gimgs} />
                </div>
                <h3>{item.gtitle}</h3>
                <div className='price-item'>
                    <span className="now">￥{item.gprice}</span>
                    <del className="old">￥{item.gprice}</del>
                </div>
            </div>
          ))
      }
    </div>);
    // 请求数据
    async getClassifyData(){
        try {
            const {classifyTabs} = this.state
                classifyTabs.forEach(async (item,index)=>{
                    let p2 = await GoodsApi.allGoods(item.tid);
                    if(p2.data.flag){
                        item.classifyData = p2.data.data.goodsinfo;
                    }
                })
                this.setState({
                    classifyTabs:classifyTabs
                })
        } catch (error) {
            console.log(error);
        }
    }

    classifyShow(tab,index){
        const {classifyTabs} = this.state;
        let home = document.getElementsByClassName('show-wrap')[0]
        if(home.scrollTop>=1070){
            document.getElementsByClassName('show-wrap')[0].scrollTop = 1070
        }
        this.setState({
            classifyIdx:classifyTabs[index].tid,
            classifyPage:0,
            classifyFD:null
        })
    }

    
    // 限时秒杀
    // 渲染页面
    renderContent = (data) =>(
        <div className="kill-wrap" style={{ display: 'flex', alignItems: 'center'}}>
            {
                data.map(item => (
                    <div className="kill-item" key={item.gtitle}>
                        <div className='img-item'>
                            <img src={item.gimgs}/>
                        </div>
                        <h3>{item.gtitle}</h3>
                        <div className='price-item'>
                            <span className="now">￥{item.gprice}</span>
                            <del className="old">￥{item.gprice}</del>
                        </div>
                    </div>
                ))
            }
        </div>
    );
    // 获取限时秒杀数据
    async killData(){
        try {
            let p = await GoodsApi.randomGoods(10);
            if (p.data.flag) {
                this.setState({
                    killdata: p.data.data
                })
            }
        } catch (error) {
            console.log(error);
        }
    }
    // 限时秒杀点击
    killActive = (tab,index)=>{
        let killTime = this.killTime();
        let activeTime = killTime[index].title.props.children[0].props.children;
        killTime.forEach((item,idx)=>{
            item.title = <>
                <h4>{killTime[idx].title.props.children[0].props.children}</h4>
                <span className={idx==index?"spanActive":""}>即将开始</span>
            </>
            if(idx==0){
                item.title = <>
                    <h4>{killTime[idx].title.props.children[0].props.children}</h4>
                    <span className={idx==index?"spanActive":""}>抢购中</span>
                </>
            }
        })
        this.killData()
        this.setState({
            tabs:killTime
        })
    }
    // 打开网站第一个高亮
    killShow(){
        let arr = this.killTime();
        let nowHours = this.getNowHours();
        arr.forEach((item,index)=>{
            if(index==0){
                item.title= <>
                    <h4>{item.title}</h4>
                    <span className="spanActive">{parseInt(item.title)==nowHours?'抢购中':'即将开始'}</span>
                </>
            }else{
                item.title= <>
                    <h4>{item.title}</h4>
                    <span>{parseInt(item.title)==nowHours?'抢购中':'即将开始'}</span>
                </>
            }
        })
        this.setState({
            tabs:arr
        })
    }
    // 获取时间条
    killTime(){
        const {killTime} = this.state;
        let nowHours = this.getNowHours();
        let num = 0;
        if(nowHours>=9&&nowHours<=22){
            for(let i=0;i<killTime.length;i++){
                // console.log(killTime[i].title);
                if(parseInt(killTime[i].title)<nowHours){
                    num++;
                }
            }
            killTime.splice(0,num)
            return killTime
        }else{
            return killTime
        }
        // let nowMinutes = this.jialing(d1.getMinutes());
        // let nowTime = nowHours + ':' + nowMinutes
    }
    // 获取当前小时
    getNowHours(){
        const d1 = new Date();
        return d1.getHours();
    }
}
export default Home;