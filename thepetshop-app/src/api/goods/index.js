import request,{host} from '@/utils/request.js';

export default{
    randomGoods(num) {
        return request({
            method:'get',
            url:host+'/goods/randomgoods',
            params:{
                num
            }
        })
    },

    allGoods(tid,page,index){
        return request({
            method:'get',
            url: host + '/goods/allgoods',
            params:{
                tid,
                page,
                index
            }
        })
    }
    
}