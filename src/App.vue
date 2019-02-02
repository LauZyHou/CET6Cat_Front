<template>
  <router-view></router-view>
</template>

<script>
  export default {
    name: "App"
  }
</script>

<style scoped>

</style>

<style>
  body {
    margin: 0;
    padding: 0;
    top: -10px;
  }

  html, body {
    height: 100%;
  }

  * {
    margin: 0;
    /*padding: 0*/
  }

  .fr{
    float: right !important;
  }

  /*清除浮动*/
  .clearfix::after, .clearfix::before {
    clear: both;
    content: ".";
    display: block;
    font-size: 0;
    height: 0;
    visibility: hidden;
  }

  input{
    /*font-size: 12px;*/
    outline: 0;
  }

  body, button, input, select, textarea {
    font: 12px/1.5 "Microsoft YaHei",Tahoma,Helvetica,Arial,simsun;
  }

  ul{
    list-style: none;
    margin: 0;
    padding: 0;
  }
</style>
