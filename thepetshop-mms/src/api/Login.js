import request from '@/utils/request';//引入axios对象

const BAST_API = process.env.REACT_APP_SERVICE_URL;

export default {
    loginIn(username, password, keep) {
        return request({
            method: 'post',
            url: BAST_API+ "/admin/login",
            data: {
                username,
                password,
                keep
            }
        });
    },
    getUserInf(token) {
        return request({
            method: 'get',
            url: BAST_API + '/user/verify',
            params:{
                token
            }
        });
    }
}
