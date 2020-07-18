const TOKEN_KEY = 'petshop-app-token';
const USERINFO_KEY = 'petshop-app-userinfo';

//获取token
export function getToken(){
    return localStorage.getItem(TOKEN_KEY);
}
//设置token
export function setToken(token){
    localStorage.setItem(TOKEN_KEY,token);
}

//获取用户信息
export function getUser(){
    return JSON.parse(localStorage.getItem(USERINFO_KEY));
}

//设置用户信息
export function setUser(userinfo){
    localStorage.setItem(USERINFO_KEY,JSON.stringify(userinfo));
}

//删除信息
export function removeInfo(){
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USERINFO_KEY);
}