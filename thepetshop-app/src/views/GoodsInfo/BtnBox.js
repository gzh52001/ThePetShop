import './btnBox.scss'
import React,{Component,useState} from 'react';
import { List, Stepper } from 'antd-mobile';

class BtnBox extends Component {
    constructor(){
        super();

        this.state = {
            boxShow:false,
            goodsNum:1,
            checkBtn:null
        }
    }
    shouldComponentUpdate(nextProps, nextState){
        const {onBoxshow,} = nextProps
        const {checkBtn} = nextState
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
            return false
        }
        
    }

    render(){
        const {boxShow,checkBtn,goodsNum} = this.state;
        const {title,btnboxHeight,onBoxshow,bimBoxStyle} = this.props
        console.log(this.props);
        console.log(bimBoxStyle);
        
        const data = ['粉色','鸡巴色','sssefewrwrt342634gfwerdfssdfsdfdsfsdss','sssssdfsdfdsfsdfsdfs']
        return (
            <>
                <div className='btnBox-wrap' style={boxShow?{opacity:'1',zIndex:'1'}:{opacity:'0',zIndex:'-1'}} onClick={()=>{
                    this.setState({
                        boxShow:false
                    })
                }}>
                </div>
                
                <div className='isBox' style=
                {boxShow?{
                        animation: 'btnShow .5s forwards',height:btnboxHeight?btnboxHeight:'360px'
                    }
                    :
                    onBoxshow?{
                        animation: 'btnNot .5s forwards',height:btnboxHeight?btnboxHeight:'360px'
                    }:{height:'0'}
                    }>
                    <div className="closeBox" onClick={()=>{this.setState({
                        boxShow:false
                    })}}>
                        <i className="iconfont icon-cuowu3"></i>
                    </div>
                    <h2 className="btnbox-title">{title}</h2>
                    {/* {
                        bimBoxStyle
                    } */}

                    <div className="spec-wrap" style={bimBoxStyle=='box1'?{}:{display:'none'}}>
                        <div className='goods-box'>
                        <div className='img-item'>
                            <img alt="" src={'https://img2.epetbar.com/common/upload/commonfile/2020/05/010/0101949_734383.jpg'}></img>
                        </div>
                        <div className='gtitle-info'>
                            <h3 className="goods-price">￥<span>29.9</span></h3>
                            <p className="goods-stock">库存{22}件</p>
                            <h4 className="goods-select">请选择：{'类型'}</h4>
                        </div>
                        </div>
                    
                        <div className='checkSize'>
                        <h2>规格</h2>
                        <div className='isSizeBox'>
                            {
                            data.map((item,index)=>(
                                <span key={index} className={item==checkBtn?'checkBtn btnActive':'checkBtn' } onClick={()=>{
                                    if(checkBtn==data[index]){
                                    this.setState({checkBtn:data.length+1})
                                    }else{
                                    this.setState({checkBtn:data[index]})
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
                                    this.setState({goodsNum:val})
                                }}
                                />}
                            >
                            <h2 className="all-buyNum">购买数量 <span className="isBuyNum">(限购10件)</span></h2>
                            </List.Item>
                        </div>

                    </div>
                
                
                </div>
            </>
        )
    }
}	
export default BtnBox;