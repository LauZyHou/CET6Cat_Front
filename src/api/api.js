import axios from 'axios';

//本地测试环境
let local_host = 'http://localhost:8000';

//注册
export const register = parmas => {
    return axios.post(`${local_host}/users/`, parmas);
}

//发送短信验证码
export const verifyCode = parmas => {
    return axios.post(`${local_host}/code/`, parmas);
}