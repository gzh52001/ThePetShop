import React from 'react';
import {Flex} from 'antd-mobile';
import './style.scss';
import '@/assets/icon/iconfont.css';
function Loginfoot() {
    return (
        <div className='loginfooter'>
            <p className='foot_title'>使用社交账号</p>
            <Flex justify="between" className="foot_shejiao">
                <span><i className='iconfont icon-sousuo2'></i></span>
                <span><i className='iconfont icon-zhifubao'></i></span>
                <span><i className='iconfont icon-weibo'></i></span>
            </Flex>
            <p className="foot_desc">登录即代表同意《波奇网服务协议》</p>
        </div>
    )
}

export default Loginfoot;