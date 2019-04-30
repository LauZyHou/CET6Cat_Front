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

//----------------------------------[用户相关操作]----------------------------------

//获取[个人信息](id随便传个1就行,靠的是headers里的token来判断用户)
export const getUserProfile = params => {
    return axios.get(`${local_host}/users/1/`);
}

//部分更新[个人信息](id随便传个1就行,靠的是headers里的token来判断用户)
export const patchUserProfile = params => {
    return axios.patch(`${local_host}/users/0/`, params);
}

//----------------------------------[论坛帖子用]----------------------------------

//添加[帖子](用户发帖)
export const addPost = params => {
    return axios.post(`${local_host}/posts/`, params);
}

//添加[回帖](用户回帖)
export const addReply = params => {
    return axios.post(`${local_host}/reply/`, params);
}

//----------------------------------[用户主页用]----------------------------------

//获取[用户信息](需要指明用户的id)
export const getUserMsg = params => {
    return axios.get(`${local_host}/usermsg/` + params.id);
}

//----------------------------------[获取/添加/移除收藏]----------------------------------

//--------------------获取

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

//--------------------添加

//添加[收藏视频]
export const addFavVideo = params => {
    return axios.post(`${local_host}/favvideo/`, params);
}

//添加[收藏帖子]
export const addFavPost = params => {
    return axios.post(`${local_host}/favpost/`, params);
}

//添加[收藏阅读]
export const addFavReading = params => {
    return axios.post(`${local_host}/favreading/`, params);
}

//添加[收藏作文]
export const addFavEssay = params => {
    return axios.post(`${local_host}/favessay/`, params);
}

//--------------------移除

//移除[收藏视频]
export const delFavVideo = params => {
    return axios.delete(`${local_host}/favvideo/` + params.id);
}

//移除[收藏帖子]
export const delFavPost = params => {
    return axios.delete(`${local_host}/favpost/` + params.id);
}

//移除[收藏阅读]
export const delFavReading = params => {
    return axios.delete(`${local_host}/favreading/` + params.id);
}

//移除[收藏作文]
export const delFavEssay = params => {
    return axios.delete(`${local_host}/favessay/` + params.id);
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

//获取[某用户关注的用户]
export const listMyWatch = id => {
    return axios.get(`${local_host}/mywatch/` + id);
}

//获取[关注某用户的用户]
export const listMyFans = id => {
    return axios.get(`${local_host}/watchme/` + id);
}

//----------------------------------[单词相关]----------------------------------

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

//获取词云
export const listWordCloud = params => {
    return axios.get(`${local_host}/wordcloud/`);
}

//----------------------------------[(主页上的)热门]----------------------------------

//获取[热门视频]
export const listHotVideo = params => {
    return axios.get(`${local_host}/hotvideo/`);
}

//获取[热门作文]
export const listHotEssay = params => {
    return axios.get(`${local_host}/hotessay/`);
}

//获取[热门帖子]
export const listHotPost = params => {
    return axios.get(`${local_host}/hotpost/`);
}

//获取[热门文章]
export const listHotReading = params => {
    return axios.get(`${local_host}/hotreading/`);
}

//获取[首页轮播图]
export const listBanner = params => {
    return axios.get(`${local_host}/banners/`);
}

//----------------------------------[搜索]----------------------------------

//主页顶部[全局模糊查询]
export const searchGlobal = content => {
    return axios.get(`${local_host}/globalsearch/?s=` + content);
}

//----------------------------------[专项训练]----------------------------------

//单词测验组卷
export const listTword = params => {
    return axios.get(`${local_host}/wordtrain/`);
}

//上传当前用户的错误单词id
export const addFaultTWord = params => {
    return axios.post(`${local_host}/wordtrain/`, params);
}

//获取当前用户的错误单词id
export const getFaultWord = params => {
    return axios.get(`${local_host}/wordtrain/0/`);
}

//获取听力资源列表
export const listAudio = () => {
    return axios.get(`${local_host}/audios/`);
}

//获取指定的听力资源
export const retrieveAudio = id => {
    return axios.get(`${local_host}/audios/` + id);
}

//获取翻译资源列表
export const listTranslate = () => {
    return axios.get(`${local_host}/translate/`);
}

//获取指定的翻译资源
export const retrieveTranslate = id => {
    return axios.get(`${local_host}/translate/` + id);
}

//----------------------------------[向网络上的指定URI发起请求]----------------------------------

//GET请求
export const getURI = uri => {
    return axios.get(uri);
}

//----------------------------------[其它]----------------------------------

//获取用户站内资源的学习次数
export const getStudyNum = () => {
    return axios.get(`${local_host}/userstudy/`);
}

//存储用户的翻译记录
export const postUserTranslate = params => {
    return axios.post(`${local_host}/usertranslate/`, params);
}

//获取用户的翻译记录
export const getUserTranslate = tid => {
    return axios.get(`${local_host}/usertranslate/` + tid);
}