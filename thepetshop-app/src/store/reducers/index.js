import {combineReducers} from 'redux';
import gInfoReducer from './gInfo';

const reducer = combineReducers({
    gInfo:gInfoReducer,
})


export default reducer;