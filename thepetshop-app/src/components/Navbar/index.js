import React from 'react';
import { NavBar, Icon } from 'antd-mobile';

import './style.scss';
function Navbar(props) {
    // console.log(props);
    const gotohome = function(){
        const {history} = props;
        // console.log(props);
        history.push('/home')
    }
    return (
        <NavBar
            mode="light"
            icon={<Icon type="left" size='md' />}
            onLeftClick={gotohome}
            className='border-1px navbar'
        >
            {props.name}
        </NavBar>
    )
}

export default Navbar;