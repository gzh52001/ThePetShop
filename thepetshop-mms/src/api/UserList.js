import request from '@/utils/request';//引入axios对象

const BAST_API = process.env.REACT_APP_SERVICE_URL;

export default {
    loginIn(username, password, keep) {
        return request({
            method: 'post',
            url: "http://192.168.0.105:3099/admin/login",
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
