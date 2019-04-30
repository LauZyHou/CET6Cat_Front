<template>
  <div id="video-container">
    <!-- 1 热门视频列表 -->
    <div v-if="videoList" id="video-box">
      <ul>
        <li v-for="v in videoList" :key="v.id">
          <router-link :to="'/app/home/videos/'+v.id" target="_blank">
            <img :src="v.thumb" :alt="v.name">
          </router-link>
        </li>
      </ul>
    </div>
    <!-- 2 加载动画 -->
    <div v-else id="load-box">
      <img src="/static/loading.gif" alt="加载中">
    </div>
  </div>
</template>

<script>
import { listHotVideo } from "../../api/api";

export default {
  name: "HotVideo",
  data() {
    return {
      videoList: null
    };
  },
  created() {
    listHotVideo()
      .then(res => {
        this.videoList = res.data;
      })
      .catch(error => {
        window.alert("获取热门视频失败!");
      });
  }
};
</script>

<style scoped>
#video-container {
  width: 100%;
  background-color: rgb(220, 218, 255);
}

/* 1 热门视频列表 */
/*------------------------------------------------------*/
#video-box {
  background-color: white;
  width: 80%;
  margin: 0 auto;
  padding-top: 10px;
  padding-bottom: 10px;
  /*border-box定义的盒子,不会随着padding和boder的加入而增大盒子的占用空间*/
  box-sizing: border-box;
}

ul {
  /*弹性布局*/
  display: flex;
  /*弹性元素在必要时换行*/
  flex-wrap: wrap;
  /*清除列表标记项的类型*/
  list-style-type: none;
  padding: 0;
}

li {
  /*当父元素的宽度大于所有子元素的宽度的和时,索取剩余空间*/
  flex-grow: 1;
  /*弹性元素的原始宽度*/
  flex-basis: 140px;
  text-align: center;
  /* padding: 30px; */
  min-width: 180px;
  height: 150px;
  border: 1px solid #222;
  margin: 10px;
  background-color: black;
}

li img {
  max-width: 100%;
  max-height: 100%;
}

/* 2 页面加载 */
/*------------------------------------------------------*/
#load-box {
  text-align: center;
}

#load-box > img {
  margin-top: 30px;
}
</style>


