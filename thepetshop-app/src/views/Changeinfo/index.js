import React from 'react';
import Navbar from '@/components/Navbar';
import '@/assets/icon/iconfont.css';
import './changeinfo.scss';
function Changeinfo(props) {
    return (
        <div>
            <Navbar name="个人资料" props={props} />
            <div className='info-box'>
                <div className='info'>
                    <p>头像</p>
                    <p>
                        <span>asdas</span>
                        <i className='iconfont icon-arrow-right-copy' />
                    </p>
                </div>
                <div className='info'>
                    <p>账号</p>
                    <p>
                        <span>asdas</span>
                        <i className='iconfont icon-arrow-right-copy' />
                    </p>
                </div>
                <div className='info'>
                    <p>昵称</p>
                    <p>
                        <span>asdas</span>
                        <i className='iconfont icon-arrow-right-copy' />
                    </p>
                </div>
                <div className='info'>
                    <p>账户等级</p>
                    <p>
                        <span>asdas</span>
                        <i className='iconfont icon-arrow-right-copy' />
                    </p>
                </div>
                <div className='info'>
                    <p>收货地址</p>
                    <p>
                        <span>asdas</span>
                        <i className='iconfont icon-arrow-right-copy' />
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Changeinfo;