<template>
  <!-- 遮罩层 -->
  <div id="mask">
    <!-- 占位盒子 -->
    <div></div>
    <h1>404 Not Found</h1>
    <h2>不存在的资源</h2>
  </div>
</template>

<script>
export default {
  name: "E404"
};
</script>


<style scoped>
@import url("../../static/css/error-mask.css");
</style>
