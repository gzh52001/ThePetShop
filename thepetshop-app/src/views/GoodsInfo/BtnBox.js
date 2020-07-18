import './btnBox.scss'
import React,{Component} from 'react';

class BtnBox extends Component {
    constructor(){
        super();

        this.state = {
            boxShow:false
        }
    }
    shouldComponentUpdate(nextProps, nextState){
        const {onBoxshow} = nextProps
        if(this.state.boxShow!=onBoxshow){
            this.setState({
                boxShow:onBoxshow
            })
            return true
        }else{
            if(nextState.boxShow==false){
                return true
            }
            return false
        }
    }

    render(){
        const {boxShow} = this.state;
        const {title,btnboxHeight,btnBoxStyle,ss,onBoxshow} = this.props
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
                    {
                        ss
                    }
                </div>
            </>
        )
    }
}	
export default BtnBox;