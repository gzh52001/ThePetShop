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
    delGoodsList(gid){     //删除商品
        return request({
            method: 'delete',
            url: `${BAST_API}/admin/delgoods`,
            data:{
                gid
            }
        });
    },
    delAllGoodsList(gids){      //删除选中商品
        return request({
            method: 'delete',
            url: `${BAST_API}/admin/delpartgoods`,
            data:{
                gids
            }
        });
    },
    addGoods(gtitle,gdesc,gbrandtitle,tid,gprice,gsize,stock,gimgs){      //添加商品
        return request({
            method: 'put',
            url: `${BAST_API}/admin/addgoods`,
            data:{
                gtitle,
                gdesc,
                gbrandtitle,
                tid,
                gprice,
                gsize,
                stock,
                gimgs
            }
        });
    },
    searchAllGoods(type,value,page,num){
        return request({
            method: 'get',
            url: `${BAST_API}/admin/searchgoods`,
            params:{
                type,
                value,
                page,
                num
            }
        });
    },
    delgoodsList(uid,otime){
        return request({
            method:"delete",
            url:`${BAST_API}/goods/delorder`,
            data:{
                uid,
                otime
            }
        })
    }

}
