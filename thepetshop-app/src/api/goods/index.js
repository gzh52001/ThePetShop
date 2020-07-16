import request from '@/utils/request.js'
import url from '@/utils/url'

// const url = "http://192.168.0.105:3099";

export default{
    randomGoods(num) {
        return request({
            method:'get',
            url:url+'/goods/randomgoods',
            params:{
                num
            }
        })
    }
    
}