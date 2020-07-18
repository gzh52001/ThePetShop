import {useState} from 'react';
export function useStorage(key){
    let value = localStorage.getItem(key);
    if(value){
        value = JSON.parse(value);
    }
    const [state,change] = useState(value);
    const changeinfo = function(newval){
        change(newval);
        if(typeof newval === 'object'){
            newval = JSON.stringify(newval);
        }
        localStorage.setItem(key,newval);
    }

    return [state,changeinfo];
}