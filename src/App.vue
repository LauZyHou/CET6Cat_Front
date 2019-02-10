<template>
  <router-view></router-view>
</template>

<script>
export default {
  name: "App"
};
</script>

<style scoped>
</style>

<style>
body {
  margin: 0;
  padding: 0;
  top: -10px;
}

html,
body {
  height: 100%;
}

* {
  margin: 0;
  /*padding: 0*/
}

/*-----------------------------------------------------------------*/

.fl {
  float: left !important;
}

.fr {
  float: right !important;
}

/*清除浮动*/
.clearfix::after,
.clearfix::before {
  clear: both;
  content: ".";
  display: block;
  font-size: 0;
  height: 0;
  visibility: hidden;
}

/*-----------------------------------------------------------------*/

/*注意router-link最后也都渲染成a标签了,这里直接为a标签配置*/
a {
  color: #333;
  text-decoration: none;
}

a:hover {
  /*取消a标签下划线*/
  text-decoration: none;
  color: dodgerblue;
}

/*-----------------------------------------------------------------*/

dd img,
li img,
p img {
  /* 	把此元素放置在父元素的中部*/
  vertical-align: middle;
}

/*-----------------------------------------------------------------*/

input {
  /*font-size: 12px;*/
  outline: 0;
}

body,
button,
input,
select,
textarea {
  font: 12px/1.5 "Microsoft YaHei", Tahoma, Helvetica, Arial, simsun;
}

ol,
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}
</style>
