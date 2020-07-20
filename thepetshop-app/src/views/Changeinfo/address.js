import React, { Component } from 'react';
import { Picker, Button, List, InputItem, Toast } from 'antd-mobile'
import Navbar from '@/components/Navbar';
import list from 'china-location/dist/location.json';
import './scss/address.scss';
import loginApi from '@/api/login'; 
import {getUser,setUser} from '@/utils/auth';


const CustomChildren = props => (
    <div
        onClick={props.onClick}
        style={{ backgroundColor: '#fff', paddingLeft: 15 }}
    >
        <div className="test" style={{ display: 'flex', height: '45px', lineHeight: '45px' }}>
            <div style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{props.children}</div>
            <div style={{ textAlign: 'right', color: '#888', marginRight: 15 }}>{props.extra}</div>
        </div>
    </div>
);

class Address extends Component {
    constructor() {
        super();
        this.state = {
            pickerValue: [],
            address: '',
            isaddress: false
        }
    }
    //提交
    submit = async () => {
        const { address } = this.state;
        let message = document.querySelector('.test').children[1].innerText;
        if (message === '请选择(可选)') {
            Toast.fail('请输入所在地区', 2);
            return;
        }
        message = message.replace(/,/g, '');
        let myAddress = message + address;
        //获取用户信息
        const userinfo = getUser();
        //获取用户id
        const {uid} = userinfo;
        //将地址提交到localhost
        try{
            let p = await loginApi.edituser(uid,'address',myAddress);
            if(p.data.flag){
                Toast.success('添加成功',2);
                setUser({
                    ...userinfo,
                    address:myAddress
                })
                this.props.history.push('/changeinfo')
            }else{
                Toast.fail('添加失败',2);
            }
        }catch(err){
            console.log(err);
        }
        console.log(myAddress);
    }
    //详细地址
    changeAddress = (val) => {
        this.setState({
            address: val,
            isaddress: false
        })
    }
    //地址验证
    checkaddress = (val) => {
        if (!val) {
            this.setState({
                isaddress: true
            })
        }
    }
    //地址验证红圈圈
    erroraddress = () => {
        Toast.fail('请输入详细地址', 2);
    }
    render() {
        let antdDistrict = [];//地址数组
        //地址获取
        Object.keys(list).forEach((index) => {
            let itemLevel1 = {};
            let itemLevel2 = {};
            itemLevel1.value = list[index].code;
            itemLevel1.label = list[index].name;
            itemLevel1.children = [];
            let data = list[index].cities;
            Object.keys(data).forEach((index) => {
                itemLevel2.value = data[index].code;
                itemLevel2.label = data[index].name;
                itemLevel2.children = [];
                let data2 = data[index].districts;
                let itemLevel3 = {};
                itemLevel3.children = [];
                Object.keys(data2).forEach((index) => {
                    itemLevel3.value = index;
                    itemLevel3.label = data2[index];
                    itemLevel2.children.push(itemLevel3);
                    itemLevel3 = {};
                });
                itemLevel1.children.push(itemLevel2);
                itemLevel2 = {};
            });
            antdDistrict.push(itemLevel1)
        });
        const { pickerValue, address, isaddress } = this.state;
        return (
            <div className='address'>
                <Navbar name='我的收货地址' props={this.props} />
                {/* 地区选择 */}
                <Picker
                    data={antdDistrict}
                    title="选择地区"
                    extra="请选择(可选)"
                    value={this.state.pickerValue}
                    onChange={v => this.setState({ pickerValue: v })}
                    onOk={v => this.setState({ pickerValue: v })}
                >
                    <CustomChildren>所在地区</CustomChildren>
                </Picker>
                {/* 详细地址 */}
                <List>
                    <InputItem
                        clear
                        placeholder="请输入详细地址"
                        value={this.state.address}
                        onChange={this.changeAddress}
                        error={isaddress}
                        onErrorClick={this.erroraddress}
                        onBlur={this.checkaddress}
                        className={isaddress ? 'red' : null}
                    >详细地址</InputItem>
                    {/* 提交地址按钮 */}
                    {
                        pickerValue.length > 0 && address && !isaddress ?
                            <Button type="warning" className='loginbtn' style={{ marginBottom: 15, marginTop: 25 }} onClick={this.submit}>提交 </Button>
                            :
                            <Button type="warning" disabled className='loginbtn' style={{ marginBottom: 15, marginTop: 25 }} >提交</Button>
                    }
                </List>

            </div>
        )
    }
}
export default Address