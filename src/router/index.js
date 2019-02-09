//系统库
import Vue from 'vue'
import Router from 'vue-router'

//三方库
import cookie from '../static/js/cookie'

//组件
import app from '../views/app/app'
import logHead from '../views/head/logHead'
import login from '../views/login/login'
import foot from '../views/foot/foot'
import register from '../views/register/register'
import head from '../views/head/head'
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
            head: head,
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
              path: "word/:group",
              name: "word",
              component: word,
              meta: {
                title: "六级词汇",
                need_log: false //true
              }
            },
            {//交流论坛list页
              path: "forum/:page",
              name: "forum",
              component: forum,
              meta: {
                title: "交流论坛",
                need_log: false
              }
            },
            {//视频list页
              path: "course/:page",
              name: "course",
              component: course,
              meta: {
                title: "在线视频",
                need_log: false
              }
            },
            {//阅读分析list页
              path: "reading/:page",
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
            {//作文交流页面
              path: "essay",
              name: "essay",
              component: essay,
              meta: {
                title: "高分作文交流",
                need_log: false
              }
            },
            {//论坛发帖页面
              path: "post",
              name: "post",
              component: post,
              meta: {
                title: "论坛发帖",
                need_log: false//true
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
              path: "papers/:id",
              name: "papers",
              component: papers,
              meta: {
                title: "查看文章",
                need_log: false
              }
            }
            //FIXME 添加/app/home的子路由
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
