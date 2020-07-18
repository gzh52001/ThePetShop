import request from '@/utils/request'

export default {
    searchGoods(value,sort,page,num){
        return request({
            method:'get',
            url: '/goods/searchandsort',
            params:{
                value,
                sort,
                page,
                num
            }
        })
    }
}