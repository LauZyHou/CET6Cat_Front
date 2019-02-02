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
