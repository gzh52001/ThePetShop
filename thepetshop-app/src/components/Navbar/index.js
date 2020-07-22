import React from 'react';
import { NavBar, Icon } from 'antd-mobile';

import './style.scss';

function Navbar(props) {//顶部导航
    const gotohome = function(){
        const {props:{history,location:{pathname,state}}} = props;
        if(pathname=='/dfhOrder'||pathname=='/MyOrder'){
            history.push('/main/mine')
        }else if(!state){
            history.push('/main/home');
        }else{
            history.push(state);
        }
    }
    return (
        <NavBar
            mode="light"
            icon={<Icon type="left" size='xs' />}
            onLeftClick={gotohome}
            className='border-1px navbar'
        >
            {props.name}
        </NavBar>
    )
}

export default Navbar;