//系统库
import Vue from 'vue'
import Router from 'vue-router'

//三方库
import cookie from '../static/js/cookie'
import store from '../store/store'

//组件
import app from '../views/app/app'
import logHead from '../views/head/logHead'
import login from '../views/login/login'
import foot from '../views/foot/foot'
import register from '../views/register/register'
import mainHead from '../views/head/head'

import home from '../views/home/home'
import index from '../views/home/index/index'
import word from '../views/home/word/word'
import forum from '../views/home/forum/forum'
import course from '../views/home/course/course'
import reading from '../views/home/reading/reading'
import online from '../views/home/online/online'
import essay from '../views/home/essay/essay'
import post from '../views/home/forum/post'
import posts from '../views/home/forum/posts'
import videos from '../views/home/course/videos'
import papers from '../views/home/reading/papers'
import essays from '../views/home/essay/essays'

import member from '../views/member/member'
import center from '../views/member/center/center'
import profile from '../views/member/center/profile'
import favorite from '../views/member/center/favorite'
import vip from '../views/member/center/vip'
import setting from '../views/member/center/setting'
import users from '../views/member/users/users'
import prepaid from '../views/member/prepaid/prepaid'
import situation from '../views/member/situation/situation'
import watch_from from '../views/member/watch/watch_from';
import watch_to from "../views/member/watch/watch_to";

import error from '../views/error/error'
import E401 from '../views/error/E401'
import E404 from '../views/error/E404'

import train from '../views/train/train'
import Tword from '../views/train/Tword'
import Tlisten from '../views/train/Tlisten';
import Tlistens from '../views/train/Tlistens';
import Ttranslate from '../views/train/Ttranslate';
import Ttranslates from '../views/train/Ttranslates';

import search from '../views/search/search';
import Sglobal from '../views/search/Sglobal';

Vue.use(Router);

let router = new Router({
  routes: [
    {//伪根
      path: '/app',
      component: app,
      children: [
        {//登录
          path: 'login',
          name: 'login',
          components: {
            head: logHead,
            content: login,
            foot: foot
          },
          meta: {
            title: "登录",
            need_log: false
          }
        },
        {//注册
          path: 'register',
          name: 'register',
          components: {
            head: logHead,
            content: register,
            foot: foot
          },
          meta: {
            title: "注册",
            need_log: false
          }
        },
        {//主体页
          path: "home",
          name: "home",
          components: {
            head: mainHead,
            content: home,
            foot: foot
          },
          meta: {
            need_log: false
          },
          children: [
            {//主页
              path: "index",
              name: "index",
              component: index,
              meta: {
                title: "主页",
                need_log: false
              }
            },
            {//背单词页面
              path: "word",
              name: "word",
              component: word,
              meta: {
                title: "六级词汇",
                need_log: true
              }
            },
            {//交流论坛list页
              path: "forum",
              name: "forum",
              component: forum,
              meta: {
                title: "交流论坛",
                need_log: false
              }
            },
            {//视频list页
              path: "course",
              name: "course",
              component: course,
              meta: {
                title: "在线视频",
                need_log: false
              }
            },
            {//阅读分析list页
              path: "reading",
              name: "reading",
              component: reading,
              meta: {
                title: "阅读分析",
                need_log: false
              }
            },
            {//在线模拟页面
              path: "online",
              name: "online",
              component: online,
              meta: {
                title: "在线模拟",
                need_log: false//true
              }
            },
            {//高分作文list页
              path: "essay",
              name: "essay",
              component: essay,
              meta: {
                title: "高分作文",
                need_log: false
              }
            },
            {//论坛发帖页面
              path: "post",
              name: "post",
              component: post,
              meta: {
                title: "论坛发帖",
                need_log: true
              }
            },
            {//论坛帖子详情页
              path: "posts/:id",
              name: "posts",
              component: posts,
              meta: {
                title: "查看帖子",
                need_log: false
              }
            },
            {//课程视频详情页
              path: "videos/:id",
              name: "videos",
              component: videos,
              meta: {
                title: "查看视频",
                need_log: false
              }
            },
            {//阅读分析详情页
              path: "readings/:id",
              name: "papers",
              component: papers,
              meta: {
                title: "查看文章",
                need_log: false
              }
            },
            {//高分作文详情页
              path: "essays/:id",
              name: "essays",
              component: essays,
              meta: {
                title: "查看作文",
                need_log: false
              }
            }
            //FIXME 添加/app/home的子路由
          ]
        },
        {//仅和用户自己相关的页
          path: "member",
          name: "member",
          components: {
            head: logHead,
            content: member,
            foot: foot
          },
          meta: {
            need_log: true
          },
          children: [
            {//个人中心
              path: "center",
              name: "center",
              component: center,
              meta: {
                title: "个人中心",
                need_log: true
              },
              children: [
                {//个人资料
                  path: "profile",
                  name: "profile",
                  component: profile,
                  meta: {
                    title: "个人资料-个人中心",
                    need_log: true
                  }
                },
                {//我的收藏
                  path: "favorite",
                  name: "favorite",
                  component: favorite,
                  meta: {
                    title: "我的收藏-个人中心",
                    need_log: true
                  }
                },
                {//VIP服务
                  path: "vip",
                  name: "vip",
                  component: vip,
                  meta: {
                    title: "VIP服务-个人中心",
                    need_log: true
                  }
                },
                {//设置
                  path: "setting",
                  name: "setting",
                  component: setting,
                  meta: {
                    title: "设置-个人中心",
                    need_log: true
                  }
                }
                //FIXME 添加/app/member/setting的子路由
              ]
            },
            {//用户主页
              path: "users/:id",
              name: "users",
              component: users,
              meta: {
                title: "用户主页",
                need_log: true
              },
            },
            {//充值页
              path: "prepaid",
              name: "prepaid",
              component: prepaid,
              meta: {
                title: "Cat币充值",
                need_log: true
              }
            },
            {//学习情况(图表)页
              path: "situation",
              name: "situation",
              component: situation,
              meta: {
                title: "学习情况",
                need_log: true
              }
            },
            {//某用户关注的用户页
              path: "watch_from/:id",
              name: "watch_from",
              component: watch_from,
              meta: {
                title: "此用户关注的人",
                need_log: true
              }
            },
            {//某用户的粉丝页
              path: "watch_to/:id",
              name: "watch_to",
              component: watch_to,
              meta: {
                title: "此用户的粉丝",
                need_log: true
              }
            }
            //FIXME 添加/app/member的子路由
          ]
        },
        {//error页父组件
          path: 'error',
          name: 'error',
          components: {
            head: logHead,
            content: error,
            foot: foot
          },
          meta: {
            title: "未明确的error页",
            need_log: false
          },
          children: [
            {//401 Unauthorized
              path: '401',
              name: 'E401',
              component: E401,
              meta: {
                title: "请先登录",
                need_log: false
              }
            },
            {//404 Not Found
              path: '404',
              name: 'E404',
              component: E404,
              meta: {
                title: "不存在的资源",
                need_log: false
              }
            },
            //FIXME 添加/app/error的子路由
          ]
        },
        {//专项训练
          path: 'train',
          name: 'train',
          components: {
            head: logHead,
            content: train,
            foot: foot
          },
          meta: {
            title: "未明确的train页",
            need_log: false
          },
          children: [
            {//单词测验
              path: 'Tword',
              name: 'Tword',
              component: Tword,
              meta: {
                title: "单词测验",
                need_log: true
              }
            },
            {//听力测验(list页)
              path: 'Tlisten',
              name: 'Tlisten',
              component: Tlisten,
              meta: {
                title: "听力资源列表",
                need_log: true
              }
            },
            {//听力测验(详情页)
              path: 'Tlistens/:id',
              name: 'Tlistens',
              component: Tlistens,
              meta: {
                title: "听力测验",
                need_log: true
              }
            },
            {//翻译测验(list页)
              path: 'Ttranslate',
              name: 'Ttranslate',
              component: Ttranslate,
              meta: {
                title: "翻译资源列表",
                need_log: true
              }
            },
            {//翻译测验(详情页)
              path: 'Ttranslates/:id',
              name: 'Ttranslates',
              component: Ttranslates,
              meta: {
                title: "翻译测验",
                need_log: true
              }
            },
          ]
        },
        {//搜索
          path: 'search',
          name: 'search',
          components: {
            head: logHead,
            content: search,
            foot: foot
          },
          meta: {
            title: "未明确的search页",
            need_log: false
          },
          children: [
            {//全局搜索
              path: 'Sglobal',
              name: 'Sglobal',
              component: Sglobal,
              meta: {
                title: "全局搜索",
                need_log: false
              }
            }
          ]
        }
        //FIXME 添加/app的子路由
      ]
    }
  ]
});

//进行路由判断
router.beforeEach((to, from, next) => {
  let nextPath = cookie.getCookie('nextPath')
  // console.log(nextPath)
  if (nextPath === "pay") {
    next({
      path: '/app/home/member/order',
    });
  } else {
    if (to !== undefined) {
      if (to.meta.need_log) {
        console.log(to.meta.need_log)
        if (!store.state.userInfo.token) {
          next({
            path: '/app/login',
          });
        } else {
          next();
        }
      } else {
        if (to.path === '/') {
          next({
            path: '/app/home/index',
          });
        } else {
          next();
        }
      }
    } else {
      if (to.path === '/') {
        next({
          path: '/app/home/index',
        });
      } else {
        next();
      }
    }
  }
});

//修改网页标题
router.afterEach((to, from, next) => {
  document.title = to.matched[to.matched.length - 1].meta.title;
});

//抛出路由
export default router;
