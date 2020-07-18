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
        const {title,btnboxHeight} = this.props
        console.log(btnboxHeight);
        return (
            <>
                <div className='btnBox-wrap' style={boxShow?{opacity:'1',zIndex:'1'}:{opacity:'0',zIndex:'-1'}} onClick={()=>{
                    this.setState({
                        boxShow:false
                    })
                }}>
                </div>
                
                <div className='isBox' style={boxShow?{animation: 'btnShow 1s forwards',height:btnboxHeight?btnboxHeight:'360px'}:{animation: 'btnNot 1s forwards',height:btnboxHeight?btnboxHeight:'360px'}}>
                    <div className="closeBox" onClick={()=>{this.setState({
                        boxShow:false
                    })}}>
                        <i className="iconfont icon-cuowu3"></i>
                    </div>
                    <h2 className="btnbox-title">{title}</h2>
                </div>
            </>
        )
    }
}	
export default BtnBox;
// function btnBox({onBoxshow}){
//     // const [boxShow, changeBoxShow] = useState(false)
//     let boxShow = onBoxshow;
//     console.log(useState);
//     // function onBoxshow(too){
//     //     boxShow = true
//     // }
//     return (
//         <div className='btnBox-wrap' style={boxShow?{display:'block'}:{display:'none'}} onClick={()=>{
//             boxShow=false
//             console.log(boxShow);
//         }}>
//             <div className='isBox'></div>
//         </div>
//     )
// }