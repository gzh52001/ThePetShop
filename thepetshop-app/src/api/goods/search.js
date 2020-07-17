import request,{host} from '@/utils/request'
console.log(host+'/goods/searchandsort');
export default {
    searchGoods(value,sort,page,num){
        return request({
            method:'get',
            url:host + '/goods/searchandsort',
            params:{
                value,
                sort,
                page,
                num
            }
        })
    }
}