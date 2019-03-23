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

//获取个人信息(id随便传个1就行,靠的是headers里的token来判断用户)
export const getUserProfile = params => {
    return axios.get(`${local_host}/users/1/`);
}