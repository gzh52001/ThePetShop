import React, { useContext, useEffect, useState } from 'react';
import Mycontext from './classifycontext';
import goodsApi from '@/api/goods';
function TabL() {
    let { tid } = useContext(Mycontext);
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
                <img src="http://img-new.boqiicdn.com/Data/Shop/0/0/0/shoppicpath1594970690.jpg?imageslim" />
            </div>
            <ul className='linkBox'>
                {
                    goodslist.map(item => (
                        <li key={item.gid}>
                            <a>
                                <img src={item.gimgs} />
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