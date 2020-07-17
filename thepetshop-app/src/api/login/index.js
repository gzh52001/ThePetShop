import request from '@/utils/request.js';
import host from '@/config.js';

export default{
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
            url:host+'/user/login',
            data
        })
    }
    
}