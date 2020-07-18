import axios from 'axios';

const request = axios.create({
    baseURL: '/',//VUE_APP_BASE_URL
    timeout: 5000,
})

export default request;

export let host="http://10.3.141.22:3099";
// export let host="http://192.168.0.105:3099"