import React,{useState,useEffect,useContext} from 'react';
import goodsApi from '@/api/goods';
import Mycontext from './classifycontext';
function TabR (){
    let {changeid,props} = useContext(Mycontext);
    const [obj,changeCurrent] = useState({current:1,litab:[]});
    useEffect(()=>{
        goodsApi.getTypes().then(res=>{
            if(res.data.flag){
                changeCurrent({...obj,litab:res.data.data})
            }else{
                changeCurrent({litab:[]})
            }
        }).catch(err=>{
            console.log(err);
        })
    },[])
    const activeli = tid=>{
        changeCurrent({...obj,current:tid});
        changeid(tid);
    }
    return (
        <nav className='Tabr'>
            {
                obj.litab.map(item=><li key={item.tid} className={item.tid===obj.current?'active':null} onClick={activeli.bind(this,item.tid)}>{item.gid}<span>{item.goodstype}</span></li>)
            }
        </nav>
    )
}
export default TabR;