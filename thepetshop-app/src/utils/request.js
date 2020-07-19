import axios from 'axios';

const request = axios.create({
    baseURL:process.env.REACT_APP_SERVICE_URL,//REACT_APP_SERVICE_URL
    timeout: 5000,
})
export default request;
