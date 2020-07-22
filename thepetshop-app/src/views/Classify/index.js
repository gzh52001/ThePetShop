import React, { useState, useCallback, useEffect } from 'react';
import Navbar from '@/components/Navbar';

import TabR from './TabR';
import TabL from './TabL';
import Mycontext from './classifycontext';

import './tabs.scss';
function Classify(props) {
    const [tid, changeTid] = useState(1);

    let changeid = (tid) => {
        changeTid(tid)
    }

    return (
        <div style={{ height: "100%" }}>
            <Navbar name='商品分类' props={props} />
            <div className='tabbox'>
                <Mycontext.Provider value={{tid,changeid,props}}>
                    <TabR />{/** 左边菜单 */}
                    <TabL />{/**右边分类 */}
                </Mycontext.Provider>
            </div>
        </div>
    )
}
export default Classify;