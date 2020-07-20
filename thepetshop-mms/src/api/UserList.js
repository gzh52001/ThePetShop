import request from '@/utils/request';//引入axios对象

const BAST_API = process.env.REACT_APP_SERVICE_URL;

export default {
    getUserList(sort,page, num) {        //获取用户列表
        return request({
            method: 'get',
            url: `${BAST_API}/admin/userlist`,
            params: {
                sort,
                page,
                num
            }
        });
    },
    getUserDetailed(uid) {        //获取用户列表
        return request({
            method: 'get',
            url: `${BAST_API}/admin/userinfo`,
            params: {
                uid
            }
        });
    },
    searchUser(type,value) {        //获取用户列表
        return request({
            method: 'get',
            url: `${BAST_API}/admin/searchuser`,
            params: {
                type,
                value
            }
        });
    },
    delUserList(uid) {      //删除用户
        return request({
            method: 'delete',
            url: `${BAST_API}/admin/deluser`,
            data: {
                uid
            }
        });
    },
    delAllUserList(uids) {      //批量删除用户
        return request({
            method: 'delete',
            url: `${BAST_API}/admin/delpartuser`,
            data: {
                uids
            }
        });
    },
    changeUserList(uid,msg) {      //批量删除用户
        return request({
            method: 'put',
            url: `${BAST_API}/admin/edituser`,
            data: {
                uid,
                msg
            }
        });
    },
}
