import axios from 'axios';

//本地测试环境
let local_host = 'http://localhost:8000';

//----------------------------------[注册/登录用]----------------------------------

//注册
export const register = params => {
    return axios.post(`${local_host}/users/`, params);
}

//登录
export const login = params => {
    return axios.post(`${local_host}/login/`, params);
}

//发送[短信验证码]
export const verifyCode = params => {
    return axios.post(`${local_host}/code/`, params);
}

//获取[个人信息](id随便传个1就行,靠的是headers里的token来判断用户)
export const getUserProfile = params => {
    return axios.get(`${local_host}/users/1/`);
}

//----------------------------------[论坛帖子用]----------------------------------

//添加[帖子](用户发帖)
export const addPost = params => {
    return axios.post(`${local_host}/posts/`, params);
}

//----------------------------------[用户主页用]----------------------------------

//获取[用户信息](需要指明用户的id)
export const getUserMsg = params => {
    return axios.get(`${local_host}/usermsg/` + params.id);
}

//----------------------------------[收藏/取消收藏]----------------------------------

//获取[收藏视频]
export const listFavVideo = params => {
    return axios.get(`${local_host}/favvideo/`);
}

//获取[收藏帖子]
export const listFavPost = params => {
    return axios.get(`${local_host}/favpost/`);
}

//获取[收藏阅读]
export const listFavReading = params => {
    return axios.get(`${local_host}/favreading/`);
}

//获取[收藏作文]
export const listFavEssay = params => {
    return axios.get(`${local_host}/favessay/`);
}

//获取[首页轮播图]
export const listBanner = params => {
    return axios.get(`${local_host}/banners/`);
}

//----------------------------------[关注/取关]----------------------------------

//关注[指定用户]
export const addMyWatch = params => {
    return axios.post(`${local_host}/mywatch/`, params);
}

//取关[指定用户]
export const delMyWatch = params => {
    return axios.delete(`${local_host}/mywatch/` + params.id, params);
}

//----------------------------------[单词页用]----------------------------------

//获取[用户的组号]
export const getGroupNum = params => {
    return axios.get(`${local_host}/punch/1/`);
}

//获取[指定组号的20个单词]
export const getWords = params => {
    return axios.get(`${local_host}/words/`, { params: params });
}

//打卡
export const putPunch = params => {
    return axios.put(`${local_host}/punch/1/`, params);
}

//----------------------------------[]----------------------------------