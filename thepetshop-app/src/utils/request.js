import axios from 'axios';
import { Toast } from 'antd-mobile';

const request = axios.create({
    baseURL:process.env.REACT_APP_SERVICE_URL,//REACT_APP_SERVICE_URL
    timeout: 5000,
})

request.interceptors.request.use(config=>{
    Toast.loading('加载中...', 30, () => {
        console.log("???");
    });
    return config
}, error=>{
    Toast.hide();
    return error
})

request.interceptors.response.use(response=>{
    Toast.hide();
    return response;
},error=>{
    Toast.hide();
    return Promise.reject(error);
})
export default request;
