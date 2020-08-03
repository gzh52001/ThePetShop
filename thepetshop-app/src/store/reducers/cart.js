import {ADD_TO_GOOD,CAHNGE_NUM,CAHNGE_CHECK,ALL_CHECK,DEL_GOODS,ADD_TO_CART,CLEAR_CART,CHANGE_ISNUM} from '../actions/cartAction';
const initState = {
    goods:[],//购物车商品
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
                    if(item.cid===action.cid){
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
                    if(item.cid===action.cid){
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
                    if(item.cid === goods.cid){
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
        //加入购物车
        case ADD_TO_CART:
            // console.log(1111);
            // console.log(state.goods.some(item=>item.gid === action.good.gid));
            return {
                ...state,
                goods:state.goods.some(item=>item.gid === action.good.gid) ? state.goods.map(item=>{
                    if(item.gid===action.good.gid){
                        item.count += action.good.count
                    }
                    return item
                }): [action.good,...state.goods]
            }
        //修改isnum
        case CHANGE_ISNUM:
            return {
                ...state,
                goods:state.goods.map(item=>{
                    if(item.cid===action.cid){
                        item.isnum = action.istrue
                    }
                    return item;
                })
            }
        default:
            return state;
    }
}

export default reducer 