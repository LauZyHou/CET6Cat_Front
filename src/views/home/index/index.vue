<template>
  <section>
    <!-- 1 标题 -->
    <div class="tit">
      <h2>CET6Cat</h2>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/app/home/index' }">首页</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!-- 2 中间容器 -->
    <div class="container">
      <!-- 2-1 走马灯 -->
      <el-carousel height="400px" style="margin-top: 5px">
        <el-carousel-item v-for="item in 4" :key="item">
          <img src="/static/carousel/rs.jpg" alt="走马灯">
        </el-carousel-item>
      </el-carousel>
      <!-- 2-2 广告栏 -->
      <div class="ad-hori">
        <img src="/static/advertisement/ver1.jpg" alt="广告">
      </div>
      <!-- 2-3 六级新闻 -->
      <div id="videos" class="hot">
        <h2>六级新闻</h2>
        <router-link to target="_blank">更多</router-link>
      </div>
      <!-- 2-4 热门视频 -->
      <div id="videos" class="hot">
        <h2>热门视频</h2>
        <router-link to="/app/home/course/1" target="_blank">更多</router-link>
      </div>
      <!-- 2-5 近期热帖 -->
      <div id="videos" class="hot">
        <h2>近期热帖</h2>
        <router-link to="/app/home/forum/1" target="_blank">更多</router-link>
      </div>
      <!-- 2-6 六级词汇 -->
      <div id="videos" class="hot">
        <h2>六级词汇</h2>
        <router-link :to="'/app/home/word/'+wordGroup" target="_blank">更多</router-link>
        <br>这里放个词云
      </div>
      <!-- 2-7 阅读分析 -->
      <div id="videos" class="hot">
        <h2>阅读分析</h2>
        <router-link to="/app/home/forum/reading/1" target="_blank">更多</router-link>
      </div>
      <!-- 2-8 高分作文 -->
      <div id="videos" class="hot">
        <h2>高分作文</h2>
        <router-link to="/app/home/forum/essay/1" target="_blank">更多</router-link>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "index",
  data() {
    return {
      wordGroup: 1 //如果用户已经登录了,要取他上次背到的那一组
    };
  }
};
</script>

<style scoped>
section {
  background-color: #ccff99;
  padding-top: 20px;
  height: 100%;
}

/* 1 标题 */
/*-----------------------------------------------------------------*/

.tit {
  background-color: white;
  width: 80%;
  height: 50px;
  margin: 0 auto 20px;
  text-align: center;
}

/* 2 中间容器 */
/*-----------------------------------------------------------------*/

.container {
  background-color: white;
  width: 80%;
  margin: 0 auto;
  padding-top: 5px;
  padding-bottom: 10px;
}

/* 2-1 走马灯 */
/*-----------------------------------------------*/
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}

.el-carousel__item {
  text-align: center;
}

.el-carousel__item img {
  max-width: 100%;
  max-height: 100%;
}

/* 2-2 横向广告栏 */
/*-----------------------------------------------*/
.ad-hori {
  height: 80px;
  width: 100%;
  background-color: cadetblue;
  text-align: center;
}

.ad-hori > img {
  max-width: 100%;
  max-height: 100%;
}

/* 每个栏目的热门展示盒子 */
.hot {
  min-height: 300px;
  border-bottom: 1px solid black;
}
</style>
