import './btnBox.scss'
import React,{Component,useState} from 'react';
import { List, Stepper,Toast } from 'antd-mobile';
class BtnBox extends Component {
    constructor(){
        super();

        this.state = {
            boxShow:false,
            goodsNum:1,
            checkBtn:null,
            btnboxHeight:'',
            gdata:{}
        }
    }
    
    shouldComponentUpdate(nextProps, nextState){
        const {onBoxshow,} = nextProps
        const {checkBtn,goodsNum} = nextState
        
        if(this.state.boxShow!=onBoxshow){
            this.setState({
                boxShow:onBoxshow
            })
            return true
        }else{
            if(nextState.boxShow==false){
                return true
            }
            if(checkBtn){
                return true
            }
            if(goodsNum){
                return true
            }
            return false
        }
        
    }

    render(){
        const {boxShow,checkBtn,goodsNum,btnboxHeight} = this.state;
        const {title,onBoxshow,btmBoxStyle,setCart,gdata} = this.props
        const size = gdata?JSON.parse(gdata.gsize):'';
        const goodsImg = gdata?gdata.gimgs:'';
        const data = ['粉色','红色','绿色','sssefewrwrt342634gfwerdfssdfsdfdsfsdss','sssssdfsdfdsfsdfsdfs']
        return (
            <div>
                <div className='btnBox-wrap' style={boxShow?{opacity:'1',zIndex:'1'}:{opacity:'0',zIndex:'-1'}} onClick={()=>{
                    this.setState({
                        boxShow:false
                    })
                }}>
                </div>
                <div className='isBox' style=
                {boxShow?{
                        animation: 'btnShow .5s forwards',minHeight:btnboxHeight?btnboxHeight:'360px'
                    }
                    :
                    onBoxshow?{
                        animation: 'btnNot .5s forwards',minHeight:btnboxHeight?btnboxHeight:'360px'
                    }:{height:'0'}
                    }>
                    <div className="closeBox" onClick={()=>{this.setState({
                        boxShow:false
                    })}}>
                        <i className="iconfont icon-cuowu3"></i>
                    </div>

                    <div className="spec-wrap" style={btmBoxStyle=='box1'?{minHeight:'360px'}:{display:'none'}}>
                        <div className='goods-box'>
                        <div className='img-item'>
                            <img alt="" src={gdata?gdata.gimgs[0]:''}></img>
                        </div>
                        <div className='gtitle-info'>
                            <h3 className="goods-price">￥<span>{
                                gdata?
                                checkBtn?
                                    (parseInt(checkBtn)=='NaN'?gdata.gprice:parseInt(checkBtn)*gdata.gprice)
                                    :
                                    gdata.gprice
                                :
                                22.1
                            }</span></h3>
                            <p className="goods-stock">库存{gdata?gdata.gxiaoliang:2222}件</p>
                            <h4 className="goods-select">请选择：{checkBtn?checkBtn:'类型'}</h4>
                        </div>
                        </div>
                    
                        <div className='checkSize'>
                        <h2>规格</h2>
                        <div className='isSizeBox'>
                            {
                            (size?size:data).map((item,index)=>(
                                <span key={index} className={item==checkBtn?'checkBtn btnActive':'checkBtn' } onClick={()=>{
                                    // console.log(checkBtn);
                                    
                                    
                                    if(checkBtn==(size?size:data)[index]){
                                        this.setState({checkBtn:'',goodsNum:1})
                                    }else{
                                        this.setState({checkBtn:(size?size:data)[index]})
                                    }
                                }
                                }>{item}</span>
                            ))
                            }
                        </div>
                        </div>

                        <div className='buyNum-box'>
                        {/* <h2 className="all-buyNum">购买数量 <span className="isBuyNum">(限购10件)</span></h2> */}
                            <List.Item
                            wrap
                            extra={
                                <Stepper
                                style={{ width: '100%', minWidth: '100px' }}
                                showNumber
                                max={10}
                                min={1}
                                value={goodsNum}
                                onChange={(val)=>{
                                    let too=false;
                                    (size?size:data).forEach(item=>{
                                        if(item==checkBtn){
                                            too = true
                                        }
                                    })
                                    if(too){
                                        this.setState({goodsNum:val})
                                    }else{
                                        Toast.fail('请选择规格', 1);
                                        return this.setState({goodsNum:1})
                                    }
                                }}
                                />}
                            >
                            <h2 className="all-buyNum">购买数量 <span className="isBuyNum">(限购10件)</span></h2>
                            </List.Item>
                        </div>

                        <div className='isOkBtn'>

                                <div className='btnBox'>
                                    <div className='cancel-btn'>
                                        <span onClick={()=>this.setState({boxShow:false})}>取消</span>
                                    </div>
                                    <div className='define-btn'>
                                        <span onClick={()=>{
                                            let too=false;
                                            (size?size:data).forEach(item=>{
                                                if(item==checkBtn){
                                                    too = true
                                                }
                                            })
                                            if(too){
                                                let priceDom = document.querySelector('.goods-price span').innerHTML;
                                                setCart({checkBtn,goodsNum,priceDom})
                                                this.setState({
                                                    boxShow:false
                                                })
                                            }else{
                                                Toast.fail('请选择规格', 1);
                                            }
                                        }}>
                                            确认
                                    </span>
                                </div>
                            
                        </div>
                        </div>

                    </div>
                
                    
                    <div className='coupon-wrap' style={btmBoxStyle=='box2'?{height:'360px'}:{display:'none'}}>
                        <div className='coupon-show' style={{overflowY:'auto',paddingBottom: '20px'}}>
                            <h2 className="wrap-title">优惠券</h2>
                            <div className='coupon-item'>
                                <div className='coupon-price'>
                                    ￥
                                    <span className="price-num">30</span>
                                </div>
                                <div className='coupon-title'>
                                    <h3 className="coupon-condition">满359减30元</h3>
                                    <p>订单满359.00元可用</p>
                                    <p>使用期限2020.03.12—2020.12.31</p>
                                </div>
                                <span className="getCoupon">立 即 领 取</span>
                            </div>
                            <div className='coupon-item'>
                                <div className='coupon-price'>
                                    ￥
                                    <span className="price-num">40</span>
                                </div>
                                <div className='coupon-title'>
                                    <h3 className="coupon-condition">满399减4元</h3>
                                    <p>订单满399.00元可用</p>
                                    <p>使用期限2020.03.12—2020.12.31</p>
                                </div>
                                <span className="getCoupon">立 即 领 取</span>
                            </div>
                            <div className='coupon-item'>
                                <div className='coupon-price'>
                                    ￥
                                    <span className="price-num">50</span>
                                </div>
                                <div className='coupon-title'>
                                    <h3 className="coupon-condition">满459减50元</h3>
                                    <p>订单满459.00元可用</p>
                                    <p>使用期限2020.03.12—2020.12.31</p>
                                </div>
                                <span className="getCoupon">立 即 领 取</span>
                            </div>
                            <div className='coupon-item'>
                                <div className='coupon-price'>
                                    ￥
                                    <span className="price-num">10000</span>
                                </div>
                                <div className='coupon-title'>
                                    <h3 className="coupon-condition">满1减10000元</h3>
                                    <p>订单满1.00元可用</p>
                                    <p>使用期限2020.03.12—2999.12.31</p>
                                </div>
                                <span className="getCoupon">立 即 领 取</span>
                            </div>
                            <div className='marginBox' style={{height:'20px'}}></div>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}	
export default BtnBox;