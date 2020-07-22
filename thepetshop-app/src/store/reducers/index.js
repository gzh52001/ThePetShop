import {combineReducers} from 'redux';
import gInfoReducer from './gInfo';
import cartReducer from './cart';
import userinfoReducer from './userinfo';

const reducer = combineReducers({
    gInfo:gInfoReducer,
    cart : cartReducer,
    user:userinfoReducer
})


export default reducer;