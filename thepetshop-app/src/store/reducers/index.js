import {combineReducers} from 'redux';
import gInfoReducer from './gInfo';
import cartReducer from './cart';

const reducer = combineReducers({
    gInfo:gInfoReducer,
    cart : cartReducer
})


export default reducer;