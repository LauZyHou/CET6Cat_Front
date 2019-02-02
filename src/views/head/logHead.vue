<template>
  <header>
    <h2>{{title}}页</h2>
  </header>
</template>

<script>
  export default {
    name: "logHead",
    data() {
      return {
        title: "xxx"
      }
    },
    methods: {
      checkRoute(route) {
        //判断是登录页还是注册页
        let fuc = route.path.split("/")[2];
        if (fuc === "login") {
          this.title = "登录";
        } else if (fuc === "register") {
          this.title = "注册";
        } else {
          this.title = "未知";
        }
      }
    },
    mounted() {
      this.checkRoute(this.$route);
    },
    //FIXME
    beforeRouteUpdate(to,from,next) {//这里用不了,不是动态参数
      this.checkRoute(to);
      next();
    }
  }
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
