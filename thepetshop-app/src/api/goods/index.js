import request from '@/utils/request.js';
import {host1,host2} from '@/config.json';

// const url = "http://192.168.0.105:3099";

export default{
    randomGoods(num) {
        return request({
            method:'get',
            url:host2+'/goods/randomgoods',
            params:{
                num
            }
        })
    }
    
}