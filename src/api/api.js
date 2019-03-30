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

//获取[收藏视频]
export const listFavVideo = params => {
    return axios.get(`${local_host}/favvideo/`)
}

//获取[收藏帖子]
export const listFavPost = params => {
    return axios.get(`${local_host}/favpost/`)
}

//获取[收藏阅读]
export const listFavReading = params => {
    return axios.get(`${local_host}/favreading/`)
}

//获取[收藏作文]
export const listFavEssay = params => {
    return axios.get(`${local_host}/favessay/`)
}