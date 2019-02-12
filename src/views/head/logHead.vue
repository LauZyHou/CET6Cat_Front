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
      if (ra[2] === "login") {
        //#/app/login
        return "登录";
      } else if (ra[2] === "register") {
        //#/app/register
        return "注册";
      } else if (ra[2] === "member" && ra[3] === "center") {
        //#/app/member/center
        // if (ra[len - 1] === "profile") return "我的资料";
        // else if (ra[len - 1] === "favorite") return "我的收藏";
        // else if (ra[len - 1] === "vip") return "VIP服务";
        // else if (ra[len - 1] === "setting") return "设置";
        return "个人中心";
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
  position: fixed;
  left: 10px;
  top: 11px;
  color: lightblue;
  font-size: 20px;
}
</style>
