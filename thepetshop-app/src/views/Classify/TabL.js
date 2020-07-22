import React, { useContext, useEffect, useState } from 'react';
import Mycontext from './classifycontext';
import goodsApi from '@/api/goods';
function TabL() {
    let { tid,props } = useContext(Mycontext);
    let [goodslist, changelist] = useState([]);
    // console.log(tid);
    useEffect(() => {
        goodsApi.allGoods(tid,1,100).then(res => {
            // console.log(res.data);
            if (res.data.flag) {
                changelist(res.data.data.goodsinfo)
            }
        }).catch(err => {
            console.log(err);
        })
    }, [tid])
    return (
        <div className="Tabl">
            <div className='imgBox'>
                <img src="http://img-new.boqiicdn.com/Data/Shop/0/0/0/shoppicpath1594970690.jpg?imageslim" alt='图片'/>
            </div>
            <ul className='linkBox'>
                {
                    goodslist.map(item => (
                        <li key={item.gid} onClick={()=>props.history.push('/goodsInfo/'+item.gid)}>
                            <a>
                                <img src={item.gimgs} alt={item.gtitle} />
                                <p>{item.gtitle}</p>
                            </a>
                        </li>
                    ))
                }
           </ul>
        </div>
    )
}
export default TabL;