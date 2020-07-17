import request from '@/utils/request.js';
import {host1,host2} from '@/config.json';

export default {
    // 注册
    reg({username,userpass,phone,email}){
        // console.log(username,userpass,phone,email);
        let data = {
            username,
            password:userpass,
            phonenum:parseInt(phone.replace(/\s/g,'')),
            email
        }
        // console.log(data);
        return request({
            method: 'post',
            url:host1+'/user/reg',
            data
        })
    },
    checkuser(username){
         return request({
            method: 'get',
            url:host1+'/user/checkname',
            params:{
                username
            }
        })
    }
}