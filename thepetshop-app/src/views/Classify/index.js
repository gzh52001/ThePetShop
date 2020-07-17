import React, { useState, useCallback, useEffect } from 'react';
import Navbar from '@/components/Navbar';

import TabR from './TabR';
import TabL from './TabL';
import Mycontext from './classifycontext';

import './tabs.scss';
function Classify() {
    const [tid, changeTid] = useState(1);

    let changeid = (tid) => {
        changeTid(tid)
    }

    return (
        <div style={{ height: "100%" }}>
            <Navbar name='商品分类' />
            <div className='tabbox'>
                <Mycontext.Provider value={{tid,changeid}}>
                    <TabR />
                    <TabL />
                </Mycontext.Provider>
            </div>
        </div>
    )
}
export default Classify;