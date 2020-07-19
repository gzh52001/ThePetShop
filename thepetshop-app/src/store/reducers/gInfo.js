import { ADD_TO_BTMBOX } from '../actions/gInfo';

const initState = {
    infoList:{
        boxDom:'',
        btmBoxHeight:'370px'
    }
}


function reducer(state= initState,action){
    switch (action.type) {
        case ADD_TO_BTMBOX:
            return {
                ...state,
                boxDom:action.boxDom,
                btmBoxHeight:action.btmBoxHeight
            }
    
        default:
            return state;
    }
}

export default reducer 