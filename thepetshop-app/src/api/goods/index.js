import request from '@/utils/request.js';
import {host1,host2} from '@/config.json';


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