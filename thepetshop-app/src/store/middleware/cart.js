import {put,takeLatest} from 'redux-saga/effects';
import cartApi from '@/api/shoppingcart';
import { Toast } from 'antd-mobile';
import {changenum} from '../actions/cartAction';

function* changegoodsnum({type, gid,count,uid,gsize}){
    // console.log(type, gid,count,uid,gsize);
    const p = yield cartApi.getStock(gid);
    // console.log(p.data.flag);
    if(p.data.flag){
        if(count>p.data.data.stock){
            Toast.fail('库存量不足');
        }else{
            yield put(changenum(gid,count));//设置redux的商品数量
            yield cartApi.changenum(uid,gid,gsize,count);//设置数据库的商品数量
        }
    }else{
        Toast.fail('库存量不足');
    }
}


function* init(){
    yield takeLatest('CHANGE_NUM',changegoodsnum)
}

export default init;