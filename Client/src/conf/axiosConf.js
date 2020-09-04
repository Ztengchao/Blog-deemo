import axios from 'axios';

axios.defaults.baseURL = "http://localhost:3916/";

axios.interceptors.request.use(function (config) {
    return config;
}, function (error) {
    return Promise.reject(error);
});

axios.interceptors.response.use(function (response) {
    return response.data
}, function (error) {
    return Promise.reject(error);
});
export default axios;