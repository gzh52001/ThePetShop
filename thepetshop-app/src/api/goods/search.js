import request,{host} from '@/utils/request'
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