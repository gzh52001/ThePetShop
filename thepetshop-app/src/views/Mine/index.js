import React, { Component } from 'react';
import { NavBar, Icon } from 'antd-mobile';

class Mine extends Component {
    render() {
        return (
            <div>
                <NavBar
                    mode="light"
                    rightContent={[
                        <Icon key="0" type="search" style={{ marginRight: '16px' }} />,
                        <Icon key="1" type="ellipsis" />,
                    ]}
                >NavBar</NavBar>
                Mine
            </div>
        )
    }
}

export default Mine;