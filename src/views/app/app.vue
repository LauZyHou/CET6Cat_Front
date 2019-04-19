<template>
  <div>
    <router-view name="head"></router-view>
    <router-view name="content"></router-view>
    <router-view name="foot"></router-view>
  </div>
</template>

<script>
export default {
  name: "app"
};
</script>

<style scoped>
section {
  background-image: url("/api/media/img/background.png");
}
</style>

<style>
/* 通用阴影 */
/*-----------------------------------------------------------------*/
.tit,
.container {
  box-shadow: 0 5px 15px 0 rgba(0, 0, 0, 0.08);
  transition-duration: 0.5s;
}

/*
.tit:hover,
.container:hover {
  box-shadow: 0 10px 15px 0 rgba(0, 0, 0, 0.18);
  transition-duration: 0.5s;
}
*/

/* 通用的文本样式 */
pre {
  font-size: 18px;
  font-family: "微软雅黑";
  white-space: pre-wrap;
  word-wrap: break-word;
}
</style>
