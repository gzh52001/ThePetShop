import {ADD_TO_GOOD,CAHNGE_NUM,CAHNGE_CHECK,ALL_CHECK,DEL_GOODS} from '../actions/cartAction';

const initState = {
    goods:[],//购物车商品
    goodsnum:0//某一商品得数量
}


function reducer(state= initState,action){
    // console.log(action.type);
    switch (action.type) {
        // 获取购物车商品
        case ADD_TO_GOOD:
            // console.log(action.goods);
            return {
                ...state,
                goods:action.goods
            }
        //修改数量
        case CAHNGE_NUM:
            return {
                ...state,
                goods:state.goods.map(item=>{
                    if(item.gid===action.gid){
                        item.count = action.count
                    }
                    return item;
                })
            }
        //商品选中
        case CAHNGE_CHECK:
            return {
                ...state,
                goods:state.goods.map(item=>{
                    if(item.gid===action.gid){
                        item.ischeck = action.check
                    }
                    return item;
                })
            }
        // 全选
        case ALL_CHECK:
            return {
                ...state,
                goods:state.goods.map(item=>{
                    item.ischeck = action.check;
                    return item;
                })
            }
        //删除选中商品 
        case DEL_GOODS:
            let arr = Object.assign([],state.goods);
            arr.forEach(item=>{
                action.goods.forEach(goods=>{
                    if(item.gid === goods.gid){
                        arr = Object.assign([],arr)
                        arr.splice(arr.indexOf(item),1);
                    }
                })
            })
            // console.log(arr);
            return {
                ...state,
                goods:arr
            }
        default:
            return state;
    }
}

export default reducer 