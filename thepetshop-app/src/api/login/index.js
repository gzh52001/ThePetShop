import request from '@/utils/request.js';

export default{
    //登录
    login(username,userpass,keep) {
        let data = {};
        // console.log(typeof keep);
        if(keep){
            data={
                username,
                password:userpass,
                keep
            }
        }else{
            data={
                username,
                password:userpass
            }
        };
        return request({
            method:'post',
            url:'/user/login',
            data
        })
    },
    //验证token
    checkToken(token){
        return request({
            method:"get",
            url:"/user/verify",
            params:{
                token
            }
        })
    },
    //修改密码
    editpsw(uid,oldpsw,newpsw){
        return request({
            method:'put',
            url:"/user/editpsw",
            data:{
                uid,
                oldpsw,
                newpsw
            }
        })
    },
    //修改用户信息
    edituser(uid,key,value){
        return request({
            method:'put',
            url:'/user/edituser',
            data:{
                uid,
                key,
                value
            }
        })
    }
}