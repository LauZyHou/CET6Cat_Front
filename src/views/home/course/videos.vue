<template>
  <section>
    <!-- 1 标题 -->
    <div class="tit">
      <h2>查看视频</h2>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/app/home/index' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{path : '/app/home/course'}">在线视频</el-breadcrumb-item>
        <el-breadcrumb-item>查看视频</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!-- 2 视频主体 -->
    <div class="container">
      <!-- 2-1 视频标题 -->
      <el-row>
        <el-col :span="20" id="video-tit">{{detail.name}}</el-col>
        <el-col :span="4" id="video-op">
          <button @click="onFav">{{this.detail.isFaved?'取消':'添加'}}收藏</button>
          <button :disabled="!mineOrAdmin">删除</button>
        </el-col>
      </el-row>
      <!-- 2-2 视频内容 -->
      <el-row id="video-box">
        <video controls="controls">
          <!-- axios是异步请求的,这里用v-if判断一下,请求完成后再加载这块DOM -->
          <source v-if="detail.content" :src="detail.content" type="video/mp4">
          <p>你的浏览器不支持video标签</p>
        </video>
      </el-row>
    </div>
  </section>
</template>

<script>
import { addFavVideo, delFavVideo } from "../../../api/api";

export default {
  name: "videos",
  data() {
    return {
      vid: "0",
      mineOrAdmin: false,
      detail: {
        id: 0,
        name: "无效的视频",
        content: null,
        category: 0,
        uper: 0,
        add_time: "",
        isFaved: false
      }
    };
  },
  methods: {
    getDetail() {
      this.$axios.get("/api/videos/" + this.vid + "/").then(res => {
        for (let key in res.data) {
          this.$set(this.detail, key, res.data[key]);
        }
      });
    },
    //点击[添加收藏/取消收藏]按钮
    onFav() {
      var that = this;
      //已收藏,取消收藏
      if (this.detail.isFaved) {
        delFavVideo({ id: this.$route.params.id })
          .then(res => {
            window.alert("取消收藏成功!");
            this.detail.isFaved = false;
          })
          .catch(error => {
            window.alert("[error]取消收藏失败");
          });
      }
      //未收藏,添加收藏
      else {
        addFavVideo({ base: this.$route.params.id })
          .then(res => {
            window.alert("添加收藏成功!");
            this.detail.isFaved = true;
          })
          .catch(error => {
            //添加失败,对失败原因进行提示
            if (error.response && error.response.data) {
              if ("non_field_errors" in error.response.data) {
                window.alert(error.response.data["non_field_errors"]);
                //这里都是因为视频已经收藏过了,说明前端收藏状态有点问题,这里切一下收藏状态
                //什么时候可能出现这种问题?当用户没登录打开这个页面,登录了以后再在这个页面上点收藏时
                //这样就不用去刷新整个页面了
                that.detail.isFaved = true;
              } else if ("base" in error.response.data) {
                window.alert(error.response.data["base"]);
              }
            }
          });
      }
    }
  },
  created() {
    this.vid = this.$route.params.id;
    this.getDetail();
  },
  beforeRouteUpdate(to, from, next) {
    //在视频路由之间转移
    this.vid = to.params.id;
    //配合v-if判断后面的请求完成后再加载视频,防止渲染之前的DOM
    this.detail.content = null;
    getDetail();
    next();
  }
};
</script>

<style scoped>
section {
  /* background-color: #ccff99; */
  padding-top: 20px;
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

/* 2 视频主体 */
/*-----------------------------------------------------------------*/

.container {
  background-color: white;
  width: 80%;
  margin: 0 auto;
  padding-top: 10px;
  padding-bottom: 10px;
}

/* 2-1 视频标题 */
/*----------------------------------------*/
#video-tit {
  background-color: #ccff99;
  font-size: 20px;
  height: 100%;
}

/* 2-2 视频内容 */
/*----------------------------------------*/
#video-box {
  margin: 0 auto;
}

#video-box video {
  background-color: black;
  width: 80%;
  height: 550px;
  margin: 10px 10% 0 !important;
}

/*-----------------------------------------------------------------*/
</style>


