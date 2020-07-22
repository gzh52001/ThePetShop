import request from '@/utils/request';

export default {
    //获取购物车商品
    getcart(uid) {
        // console.log(uid);
        return request({
            method: 'get',
            url: '/goods/getcart',
            params: {
                uid
            }
        })
    },
    //修改选中状态
    checkcart(cid,check) {
        return request({
            method: 'put',
            url: '/goods/checkcart',
            data: {
                cid,
                check
            }
        })
    },
    //删除选中商品
    delgood(){
        return request({
            method:'delete',
            url:'/goods/delcartpart'
        })
    },
    //全选商品
    checkAll(uid,check){
        return request({
            method:'put',
            url:'/goods/checkcartall',
            data:{
                uid,
                check
            }
        })
    },
    //修改商品数量
    changenum(uid,gid,gsize,count){
        return request({
            method:'put',
            url:'/goods/changecartcount',
            data:{
                uid,
                gid,
                gsize,
                count
            }
        })
    },
    //获取商品库存
    getStock(gid){
        return request({
            method:'get',
            url:'/goods/getsomestock',
            params:{
                gid
            }
        })
    },
    //加入订单
    addorder(uid){
        return request({
            method:'put',
            url:'/goods/addorder',
            data:{
                uid
            }
        })
    }

}