//对axios进行二次封装
import axios from 'axios/dist/axios';//引入axiosimport Vue from 'vue';

const request = axios.create({ // request==axios
    baseURL: '/',
    timeout: 5000//3秒：请求超时时间，如果3秒还没有拿到数据就断开

});

export default request;