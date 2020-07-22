import {ADD_USER_INFO,DEL_USER_INFO} from '../actions/user';
import {getUser} from '@/utils/auth';
const initState = {
    userinfo:getUser()||{}
}

function reducer(state=initState,action){
    switch(action.type){
        case ADD_USER_INFO :
            return {
                ...state,
                userinfo:action.info
            }
        case DEL_USER_INFO:
            return{
                ...state,
                userinfo:{}
            }
        default:
            return state
    }
}

export default reducer;