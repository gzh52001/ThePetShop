import request from '@/utils/request';//引入axios对象

const BAST_API = process.env.REACT_APP_SERVICE_URL;

export default {
    getGoodsOrder(sort, page, num, isDeliver) {      //获取订单列表
        return request({
            method: 'get',
            url: `${BAST_API}/admin/getallorder`,
            params: {
                sort,
                page,
                num,
                isDeliver
            }
        });
    },
    getOrderDetailed(uid, gid, otime) {   //获取订单详情
        return request({
            method: 'get',
            url: `${BAST_API}/admin/getorderinfo`,
            params: {
                uid,
                gid,
                otime
            }
        });
    },
    deliverGoods(uid, gid, otime) {        //发货
        return request({
            method: 'post',
            url: `${BAST_API}/admin/delivergoods`,
            data: {
                uid,
                gid,
                otime
            }
        });
    },
    delPartOrder(otime) {        //批量删除订单
        return request({
            method: 'delete',
            url: `${BAST_API}/admin/delpartorder`,
            data: {
                otime
            }
        });
    },
    selectOrder(type, value, sort, page, num,isDeliver) {        //搜索订单
        return request({
            method: 'get',
            url: `${BAST_API}/admin/searchorder`,
            params: {
                type,
                value,
                sort,
                page,
                num,
                isDeliver
            }
        });
    },
}