import request from '@/utils/request';//引入axios对象

const BAST_API = process.env.REACT_APP_SERVICE_URL;

export default {
    getGoodsList(sort,page, num) {        //获取商品列表
        return request({
            method: 'get',
            url: `${BAST_API}/goods/allgoods`,
            params:{
                sort,
                page,
                num
            }
        });
    },
    getGoodsDetailed(gid) {        //获取商品详情
        return request({
            method: 'get',
            url: `${BAST_API}/goods/goodsinfo`,
            params:{
                gid
            }
        });
    },
    searchGoods(value) {        //搜索商品和销量排序
        return request({
            method: 'get',
            url: `${BAST_API}/goods/searchandsort`,
            params:{
                value,
            }
        });
    },
    roundGoodsList(num) {      //随机获取商品
        return request({
            method: 'get',
            url: `${BAST_API}/goods/randomgoods`,
            params:{
                num
            }
        });
    },
    getGoodsTitle() {      //获取商品分类名
        return request({
            method: 'get',
            url: `${BAST_API}/goods/getclassify`,
        });
    },
    getGoodsOrder(uid) {      //获取订单列表
        return request({
            method: 'get',
            url: `${BAST_API}/goods/getorder`,
            params:{
                uid
            }
        });
    },

}
