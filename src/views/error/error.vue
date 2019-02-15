<template>
  <section>
    <!-- 背景层 -->
    <div :style="backImg">
      <router-view></router-view>
    </div>
  </section>
</template>

<script>
export default {
  name: "error",
  data() {
    return {};
  },
  computed: {
    //根据路由得到错误码
    errorCode() {
      let ra = this.$route.path.split("/"); //routeArray
      let len = ra.length;
      return ra[len - 1];
    },
    //根据错误码得到不同的背景图样式
    backImg() {
      return (
        "background-image: url('/static/error/" + this.errorCode + ".jpg');"
      );
    }
  }
};
</script>


<style scoped>
section {
  height: 492px;
  background-color: #ccff99;
  padding-top: 20px;
}

/* 背景层 */
section > div {
  width: 80%;
  height: 460px;
  margin: 0 auto;
  text-align: center;
  background-position: 0 -55px;
  background-repeat: no-repeat;
  background-size: cover;
}
</style>

<style>
</style>
