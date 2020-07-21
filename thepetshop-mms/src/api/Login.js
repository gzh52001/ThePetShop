import request from '@/utils/request';//引入axios对象

const BAST_API = process.env.REACT_APP_SERVICE_URL;

export default {
    loginIn(username, password, keep) {
        return request({
            method: 'post',
            url:  `${BAST_API}/admin/login`,
            data: {
                username,
                password,
                keep
            }
        });
    },
    adminReg(username, password) {
        return request({
            method: 'post',
            url:  `${BAST_API}/admin/reg`,
            data: {
                username,
                password,
            }
        });
    },
    verifyToken(token) {
        return request({
            method: 'get',
            url: BAST_API + '/admin/verify',
            params:{
                token
            }
        });
    },
    checkUserName(username){
        return request({
            method: 'get',
            url: BAST_API + '/admin/checkname',
            params:{
                username
            }
        });
    },
    getCaptcha() {
        return request({
            method: 'get',
            url: BAST_API + '/user/getcaptcha',
        });
    },
}
