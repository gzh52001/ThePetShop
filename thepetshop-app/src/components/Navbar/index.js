import React from 'react';
import { NavBar, Icon } from 'antd-mobile';

import './style.scss';
function Navbar(props) {
    // console.log(props);
    const skip = '跳过';
    return (
        <NavBar
            mode="light"
            icon={<Icon type="left" size='md' />}
            onLeftClick={() => console.log('onLeftClick')}
            rightContent={props.isshow?null:skip}
            className='border-1px navbar'
        >
            {props.name}
        </NavBar>
    )
}

export default Navbar;