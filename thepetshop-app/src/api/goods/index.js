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
    },

    // 获取相应商品
    getGoodsInfo(gid){
        return request({
            method:"get",
            url:'/goods/goodsinfo',
            params:{
                gid
            }
        })
    },

    // 加入购物车
    goSetGoodsCart(uid,gid,count,gsize){
        return request({
            method:"get",
            url:'/goods/addcart',
            params:{
                uid,
                gid,
                count,
                gsize
            }
        })
    }
}