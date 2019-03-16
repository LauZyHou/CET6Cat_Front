import axios from 'axios';

//本地测试环境
let local_host = 'http://localhost:8000';

//注册
export const register = params => {
    return axios.post(`${local_host}/users/`, params);
}

//登录
export const login = params => {
    return axios.post(`${local_host}/login/`, params)
}

//发送短信验证码
export const verifyCode = params => {
    return axios.post(`${local_host}/code/`, params);
}