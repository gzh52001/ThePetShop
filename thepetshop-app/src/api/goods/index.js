import request from '@/utils/request.js';

export default{
    randomGoods(num) {
        return request({
            method:'get',
            url:'/goods/randomgoods',
            params:{
                num
            }
        })
    },
    //所有商品
    allGoods(tid,page,index){
        return request({
            method:'get',
            url:   '/goods/allgoods',
            params:{
                tid,
                page,
                num:index
            }
        })
    },
    //获取商品分类
    getTypes(){
        return request({
            method:'get',
            url:   '/goods/getclassify'
        })
    }
}