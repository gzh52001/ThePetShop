
export const ADD_TO_GOOD = 'add_to_goods';
export const CAHNGE_NUM = 'change_num';
export const CAHNGE_CHECK = 'change_check';
export const ALL_CHECK = 'all_check';
export const DEL_GOODS = 'del_goods';

// 获取购物车商品
export function add(goods){
    return {
        type:ADD_TO_GOOD,
        goods
    }
}
// 修改数量
export function changenum(gid,count){
    return {
        type:CAHNGE_NUM,
        gid,
        count
    }
}

// 修改选中状态
export function ischeck(gid,check){
    return {
        type:CAHNGE_CHECK,
        gid,
        check
    }
}

// 全选
export function allCheck(check){
    return {
        type:ALL_CHECK,
        check
    }
}

//删除选中商品 
export function delGoods(goods){
    return {
        type:DEL_GOODS,
        goods
    }
}

export default{
    add,
    changenum,
    ischeck,
    allCheck,
    delGoods
}