<template>
  <div id="app">
    <app-header></app-header>
    <router-view></router-view>
    <app-footer></app-footer>
  </div>
</template>

<script>
  import Header from './components/Header'
  import Footer from './components/Footer'

  export default {
    name: 'App',
    data() {
      return {
        activeIndex: '1',
        activeIndex2: '1',
      };
    },
    components: {
      "app-header": Header,
      "app-footer": Footer
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    /*margin-top: 60px;*/
  }

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

  /*清除浮动*/
  .clearfix::after, .clearfix::before {
    clear: both;
    content: ".";
    display: block;
    height: 0;
    visibility: hidden;
  }

  ol,ul{
    list-style: none;
  }

  dd img, li img, p img {
    /* 	把此元素放置在父元素的中部*/
    vertical-align: middle;
  }

  /*一些小标记的样式*/
  .disTop, .nk-reward-tag, .plusFine, .race-tag, .sign-new, .sign-reward, .tag-audit, .tag-certify, .tag-hot, .tag-push, .tag-push-gray, .tag-push-orange, .tag-uncertify, .tag-vote {
    font-size: 12px;
    padding: 0 3px;
    height: 18px;
    line-height: 18px;
    border-radius: 3px;
    color: #fff;
    margin-left: 5px;
    display: inline-block;
  }

  .disTop, .sign-new, .tag-push {
    background: #25bb9b;
  }

  .plusFine {
    background: #ff6547;
  }

  .tag-label {
    border-radius: 12px;
    border: 1px solid #ddd;
    display: inline-block;
    padding: 2px 10px;
    color: #333;
    font-size: 12px;
    margin-right: 2px;
    background: #fff;
    margin-bottom: 5px;
    line-height: 16px;
    position: relative;
  }
</style>
