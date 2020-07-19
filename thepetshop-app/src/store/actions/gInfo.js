
export const ADD_TO_BTMBOX = 'ADD_TO_BTMBOX';

export function add(boxDom,btmBoxHeight){
    return {
        type:ADD_TO_BTMBOX,
        boxDom,
        btmBoxHeight
    }
}

export default{
    add
}