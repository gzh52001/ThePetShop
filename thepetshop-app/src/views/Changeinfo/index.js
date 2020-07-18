import React,{useState,useEffect} from 'react';
import { List } from 'antd-mobile';
import Navbar from '@/components/Navbar';
import '@/assets/icon/iconfont.css';
import './changeinfo.scss';
import {getUser} from '@/utils/auth';
function Changeinfo(props) {//修改个人资料
    let [useinfo,changeinfo] = useState([]);
    useEffect(()=>{
        let useinfo = getUser()
        changeinfo(useinfo)
    },[])
    const Item = List.Item;
    // console.log(props);
    console.log(useinfo);
    let userimg = <img src={useinfo.userface} alt='用户头像'></img>
    console.log(userimg);
    return (
        <div>
            <Navbar name="个人资料" props={props} />
            <div className='info-box'>
                <List>
                    <Item extra={userimg}>头像</Item>
                </List>
                <List>
                    <Item extra={useinfo.username}>
                    账号
                    </Item>
                </List>
                <List>
                    <Item arrow="horizontal" extra={useinfo.username}>
                    昵称
                    </Item>
                </List>
                <List>
                    <Item arrow="horizontal" extra={'v1'}>
                    账户等级
                    </Item>
                </List>
                <List>
                    <Item arrow="horizontal" extra={useinfo.address?useinfo.address:'添加地址'}>
                    收货地址
                    </Item>
                </List>
            </div>
        </div>
    )
}

export default Changeinfo;