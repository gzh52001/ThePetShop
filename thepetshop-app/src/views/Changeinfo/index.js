import React, { useState, useEffect } from 'react';
import { List, Modal, Toast, Button } from 'antd-mobile';
import Navbar from '@/components/Navbar';
import '@/assets/icon/iconfont.css';
import './scss/changeinfo.scss';
import { getUser, setUser, removeInfo } from '@/utils/auth';
import loginApi from '@/api/login';
function Changeinfo(props) {//修改个人资料
    let [useinfo, changeinfo] = useState({});
    useEffect(() => {
        let useinfo = getUser()
        changeinfo(useinfo)
    }, [])
    const Item = List.Item;
    const prompt = Modal.prompt;
    const alert = Modal.alert;
    let userimg = <img src={useinfo.userface} alt='用户头像'></img>
    //修改密码
    const changepass = () => {
        const { history } = props;
        history.push('./changepass')
    }
    //修改用户信息
    const changeuerinfo = (key, title) => {
        const uid = useinfo.uid;
        prompt(
            title,
            `请输入新的${title}`,
            [
                { text: '取消' },
                {
                    text: '确认', onPress: async (value) => {
                        if (title === '手机号码') {
                            if (!value || value.length < 11 || !/^1\d{10}$/.test(value)) {
                                Toast.fail('请输入正确的11位手机号码', 3);
                                return;
                            }
                        } else if (title === '邮箱') {
                            if (!value || !/^([a-zA-Z\d])(\w|\-)+@[a-zA-Z\d]+\.[a-zA-Z]{2,4}$/.test(value)) {
                                Toast.fail('请输入正确格式的邮箱，如:xxxxxx@xx.xxx,注:数字或字母开头', 3);
                                return;
                            }
                        }
                        try {
                            let p = await loginApi.edituser(uid, key, value);
                            if (p.data.flag) {
                                Toast.success('修改成功', 2);
                                changeinfo({
                                    ...useinfo,
                                    [key]: value
                                })
                                setUser({
                                    ...useinfo,
                                    [key]: value
                                })
                            } else {
                                Toast.success('修改失败', 2);
                            }
                        } catch (err) {
                            console.log(err);
                        }
                    }
                },
            ],
            'default',
        )
    }
    //添加地址
    const address = () => {
        const { history } = props;
        history.push('/address');
    }
    //退出登录
    const logout = () => {
        alert('退出', '你确定要退出吗???', [
            { text: '取消' },
            {
                text: '狠心退出',
                onPress: () => {
                    removeInfo();
                    Toast.success('退出成功',2);
                    props.history.push('/main/home');
                }
            },
        ])
    }
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
                    <Item arrow="horizontal" onClick={changepass}>
                        修改密码
                    </Item>
                </List>
                <List>
                    <Item arrow="horizontal" extra={useinfo.myname} onClick={changeuerinfo.bind(this, 'myname', '昵称')}>
                        昵称
                    </Item>
                </List>
                <List>
                    <Item arrow="horizontal" extra={useinfo.phonenum} onClick={changeuerinfo.bind(this, 'phonenum', '手机号码')}>
                        手机号码
                    </Item>
                </List>
                <List>
                    <Item arrow="horizontal" extra={useinfo.email} onClick={changeuerinfo.bind(this, 'email', '邮箱')}>
                        邮箱
                    </Item>
                </List>
                <List>
                    <Item arrow="horizontal" extra={useinfo.address ? useinfo.address : '添加地址'} onClick={address}>
                        收货地址
                    </Item>
                </List>
                <List>
                    <Item arrow="horizontal" extra={'v8'}>
                        账户等级
                    </Item>
                </List>
                <Button type="warning" className='loginbtn' style={{ marginBottom: 15, marginTop: 25 }} onClick={logout}>退出 </Button>
            </div>
        </div>
    )
}

export default Changeinfo;