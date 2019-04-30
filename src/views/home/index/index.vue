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
        <el-carousel-item :v-if="banners" v-for="b in banners" :key="b.id">
          <!-- 这里判断一下path域即可知道是否使用了指定URI,如果path不为空则使用其指定的URI -->
          <!-- 2-1-1 若path不为空且以'/'开头,则为站内其它资源(约定:站内资源省略服务器IP) -->
          <img
            v-if="b.path && b.path[0]==='/'"
            :src="'/api' + b.path"
            :alt="b.name ? b.name : '站内资源'"
          >
          <!-- 2-1-2 若path不为空且不以'/'开头,则为站外资源(约定:站外资源提供完整URI) -->
          <img v-else-if="b.path" :src="b.path" :alt="b.name ? b.name : '站外资源'">
          <!-- 2-1-3 否则,是数据库中的轮播图 -->
          <img v-else :src="'/api'+b.img" :alt="b.name ? b.name : '数据库内轮播图'">
        </el-carousel-item>
      </el-carousel>
      <!-- 2-2 广告栏 -->
      <div class="ad-hori">
        <!-- <img src="/static/advertisement/ver1.jpg" alt="广告"> -->
      </div>
      <!-- 2-3 六级新闻 -->
      <!--
      <div class="hot">
        <h2>
          六级新闻
          <router-link to target="_blank">->更多</router-link>
        </h2>
      </div>
      -->
      <!-- 2-4 热门视频 -->
      <div class="hot">
        <h2>
          热门视频
          <router-link to="/app/home/course/" target="_blank">->更多</router-link>
        </h2>
        <hot-video></hot-video>
      </div>
      <!-- 2-5 近期热帖 -->
      <div class="hot">
        <h2>
          近期热帖
          <router-link to="/app/home/forum/" target="_blank">->更多</router-link>
        </h2>
        <hot-post></hot-post>
      </div>
      <!-- 2-6 六级词汇 -->
      <div class="hot">
        <h2>
          六级词汇
          <router-link :to="'/app/home/word/'" target="_blank">->更多</router-link>
        </h2>
        <word-cloud :kind="0"></word-cloud>
      </div>
      <!-- 2-7 阅读分析 -->
      <div class="hot">
        <h2>
          阅读分析
          <router-link to="/app/home/reading/" target="_blank">->更多</router-link>
        </h2>
        <hot-reading></hot-reading>
      </div>
      <!-- 2-8 高分作文 -->
      <div class="hot">
        <h2>
          高分作文
          <router-link to="/app/home/essay/" target="_blank">->更多</router-link>
        </h2>
        <hot-essay></hot-essay>
      </div>
    </div>
  </section>
</template>

<script>
import { listBanner } from "../../../api/api";
import WordCloud from "../../../components/echarts/WordCloud";
import HotVideo from "../../../components/hot/HotVideo";
import HotReading from "../../../components/hot/HotReading";
import HotEssay from "../../../components/hot/HotEssay";
import HotPost from "../../../components/hot/HotPost";

export default {
  name: "index",
  data() {
    return {
      banners: null
    };
  },
  created() {
    //获取首页轮播图
    listBanner().then(res => {
      this.banners = res["data"];
    });
  },
  components: {
    "word-cloud": WordCloud,
    "hot-video": HotVideo,
    "hot-reading": HotReading,
    "hot-essay": HotEssay,
    "hot-post": HotPost
  }
};
</script>

<style scoped>
section {
  /* background-color: #ccff99; */
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
  min-height: 200px;
  border-bottom: 1px solid black;
}
</style>
