import axios from 'axios';

const request = axios.create({ //axios请求
    baseURL: process.env.REACT_APP_SERVICE_URL,//REACT_APP_SERVICE_URL  基础路径
    timeout: 5000,
})
export default request;
