<template>
  <header>
    <h2>{{title}}</h2>
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
      if (ra[len - 1] === "login") {
        return "登录";
      } else if (ra[len - 1] === "register") {
        return "注册";
      } else if (ra[len - 3] === "member" && ra[len - 2] === "center") {
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
</style>
