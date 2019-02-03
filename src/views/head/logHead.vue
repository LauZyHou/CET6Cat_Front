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

      }
    },
    methods: {
    },
    computed:{
      title(){
        let fuc = this.$route.path.split("/")[2];
        if(fuc === "login"){
          return "登录";
        }else if(fuc === "register"){
          return "注册";
        }
        return "未知";
      }
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
