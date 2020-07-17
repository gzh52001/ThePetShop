import request from '@/utils/request';//引入axios对象

const BAST_API = process.env.REACT_APP_SERVICE_URL;

export default {
    getGoodsList(page, num) {        //获取商品列表
        return request({
            method: 'get',
            url: `${BAST_API}/goods/allgoods`,
            params:{
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
    searchGoods(value,page,num,sort) {        //搜索商品和销量排序
        return request({
            method: 'get',
            url: `${BAST_API}/goods/searchandsort`,
            params:{
                value,
                page,
                num,
                sort
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
    roundGoodsList() {      //获取商品分类名
        return request({
            method: 'get',
            url: `${BAST_API}/goods/getclassify`,
        });
    },

}
