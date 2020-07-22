import request from '@/utils/request';//引入axios对象

const BAST_API = process.env.REACT_APP_SERVICE_URL;

export default {
    getAdminList() {        //获取商品列表
        return request({
            method: 'get',
            url: `${BAST_API}/admin/getadmin`,
        });
    },
}