export const ADD_USER_INFO = 'add_user_info';
export const DEL_USER_INFO = 'del_user_info';

export function addUser(info){
    return {
        type:ADD_USER_INFO,
        info
    }
}
export function delUser(){
    return {
        type:DEL_USER_INFO,
    }
}