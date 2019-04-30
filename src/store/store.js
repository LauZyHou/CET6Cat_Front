import Vue from "vue";
import Vuex from "vuex";
import cookie from '../static/js/cookie';
import { stat } from "fs";

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        //cookie中的用户信息
        userInfo: {
            name: cookie.getCookie('name') || '',
            token: cookie.getCookie('token') || ''
        }
    },
    getters: {
        userInfo: (state) => {
            return state.userInfo;
        }
    },
    mutations: {
        setUserInfo: (state, payload) => {
            state.userInfo = {
                name: cookie.getCookie('name'),
                token: cookie.getCookie('token')
            }
        }
    },
    actions: {
        setUserInfo: (context, payload) => {
            context.commit("setUserInfo", payload);
        }
    }
});

export default store;

/*
//对posts数组按时间从新到旧排序的比较函数
let cmpByLastTime = function (a, b) {
    let aTime, bTime;
    let aLen = a.replies.length;
    let bLen = b.replies.length;
    if (aLen > 0)
        aTime = a.replies[aLen - 1].time;
    else
        aTime = a.time;
    if (bLen > 0)
        bTime = b.replies[bLen - 1].time;
    else
        bTime = b.time;
    // console.log(bTime,aTime);
    return bTime - aTime;
}


//对papers/essays数组按时间从新到旧排序的比较函数
let cmpByTime = function (a, b) {
    return b.time - a.time;
}

export const store = new Vuex.Store({
    strict: true,//在严格模式下,不允许非mutation操作vuex中store管理的数据
    state: {//state中存储数据
        posts: [//帖子(list信息)
            {
                id: 1,
                title: "帖子标题A",
                content: "帖子内容A",
                poster: {
                    name: "发帖人A",
                },
                time: 1531707123,
                replies: [
                    {
                        content: "回帖A1",
                        replyer: {
                            name: "回帖人A1"
                        },
                        time: 1531707555,
                    },
                    {
                        content: "回帖A2",
                        replyer: {
                            name: "回帖人A2"
                        },
                        time: 1831607555,//最后回帖的
                    }
                ]
            },
            {
                id: 2,
                title: "帖子标题B",
                content: "帖子内容B",
                poster: {
                    name: "发帖人B",
                },
                time: 1831707123,//这个帖子更新
                replies: [
                ]
            },
        ],
        videos: [//视频(list信息)
            { id: 1, name: "你家的猫" },
            { id: 2, name: "c" },
            { id: 3, name: "c" },
            { id: 4, name: "c" },
            { id: 5, name: "c" },
            { id: 6, name: "c" },
            { id: 7, name: "c" }
        ],
        papers: [//文章(list信息)
            { id: 1, name: "测试文章A", time: 1531707123, content: "测试测试" },
            { id: 2, name: "测试文章B", time: 1531807123, content: "测试测试" },
            { id: 3, name: "测试文章C", time: 1531708123, content: "测试测试" },
        ],
        essays: [//作文(list信息)
            { id: 1, name: "测试作文A", time: 1531707123, content: "测试测试" },
            { id: 2, name: "测试作文B", time: 1531807123, content: "测试测试" },
            { id: 3, name: "测试作文C", time: 1531708123, content: "测试测试" },
        ]
    },
    getters: {//getters中获取数据(只读不写)

    },
    mutations: {//mutations中注册改变state的事件(只写不读)
        sortPostsByLastTime(state, payload) {
            state.posts.sort(cmpByLastTime);
        },
        sortPapersByTime(state, payload) {
            state.papers.sort(cmpByTime);
        },
        sortEssaysByTime(state, payload) {
            state.essays.sort(cmpByTime);
        }
    },
    actions: {//actions用于提交mutation,可以实现异步操作

    }
});
*/