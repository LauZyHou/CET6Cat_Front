<template>
  <header>
    <h2>{{title}}</h2>
    <router-link to="/app/home/index">Cet6Cat</router-link>
  </header>
</template>

<script>
export default {
  name: "logHead",
  data() {
    return {};
  },
  methods: {},
  computed: {
    title() {
      let ra = this.$route.path.split("/"); //routeArray
      let len = ra.length;
      //SUCCESSFUL Page
      if (ra[2] === "login") {
        //#/app/login
        return "登录";
      } else if (ra[2] === "register") {
        //#/app/register
        return "注册";
      } else if (ra[2] === "member") {
        //#/app/member/xxx
        switch (ra[3]) {
          case "center":
            return "个人中心";
          case "users":
            return "用户主页";
          case "prepaid":
            return "Cat币充值";
          case "situation":
            return "我的学习情况";
          case "watch_from":
            return "此用户关注的人";
          case "watch_to":
            return "此用户的粉丝";
          default:
            return "不存在的的member页";
        }
      } else if (ra[2] === "train" && ra[3] === "Tword") {
        return "单词测验";
      } else if (ra[2] === "train" && ra[3] === "Tlisten") {
        return "听力资源列表";
      } else if (ra[2] === "train" && ra[3] === "Tlistens") {
        return "听力测验";
      } else if (ra[2] === "train" && ra[3] === "Ttranslate") {
        return "翻译资源列表";
      } else if (ra[2] === "train" && ra[3] === "Ttranslates") {
        return "翻译测验";
      } else if (ra[2] === "search" && ra[3] === "Sglobal") {
        return "全局搜索";
      }
      //ERROR Page
      else if (ra[2] === "error") {
        if (ra[3] === "401") {
          return "请先登录";
        }
      }
      return "页面不存在";
    }
  }
};
</script>

<style scoped>
header {
  height: 57px;
  background-color: black;
}

h2 {
  color: lightgray;
  text-align: center;
  font-size: 30px;
}

a {
  position: absolute;
  left: 10px;
  top: 11px;
  color: lightblue;
  font-size: 20px;
}
</style>
