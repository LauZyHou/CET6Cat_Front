<template>
  <!-- 遮罩层 -->
  <div id="mask">
    <!-- 占位盒子 -->
    <div></div>
    <h1>401 Unauthorized</h1>
    <h2>请先
      <router-link to="/app/login">登录</router-link>
    </h2>
  </div>
</template>

<script>
export default {
  name: "E401"
};
</script>


<style scoped>
@import url("../../static/css/error-mask.css");
</style>
