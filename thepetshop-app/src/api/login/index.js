import request from '@/utils/request.js';
import {host1,host2} from '@/config.json';

// const url = "http://192.168.0.105:3099";

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
            url:host1+'/user/login',
            data
        })
    }
    
}