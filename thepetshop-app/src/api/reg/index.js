import request from '@/utils/request.js';

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
            url:'/user/reg',
            data
        })
    },
    checkuser(username){
         return request({
            method: 'get',
            url:'/user/checkname',
            params:{
                username
            }
        })
    }
}