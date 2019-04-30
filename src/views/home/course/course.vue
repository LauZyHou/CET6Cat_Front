<template>
  <section>
    <!-- 1 标题 -->
    <div class="tit">
      <h2>在线视频</h2>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/app/home/index' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>在线视频</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!-- 2 视频的容器 -->
    <div class="container" v-if="videoList">
      <ul>
        <li v-for="v in videoList" v-bind:key="v.id">
          <!-- <router-link :to="'/app/home/videos/'+v.id"> -->
          <!-- <img :src="'/static/thumbnail/'+v.id+'.png'" :alt="v.name"> -->
          <!-- </router-link> -->
          <router-link :to="'/app/home/videos/'+v.id" target="_blank">
            <img :src="v.thumb" :alt="v.name">
          </router-link>
        </li>
      </ul>
    </div>
    <!-- 2.5 页面加载时展示 -->
    <div v-else id="load-box" class="container">
      <img src="/static/loading.gif" alt="加载中">
    </div>
    <!-- 3 分页 -->
    <div class="pagination">
      <el-pagination
        ref="pagination"
        background
        layout="prev, pager, next"
        :total="count"
        :current-page="page"
        :page-size="8"
        @current-change="pageChange"
      ></el-pagination>
    </div>
  </section>
</template>

<script>
export default {
  name: "course",
  data() {
    return {
      count: 0, //总条目数
      nextPage: "", //上一页
      prePage: "", //下一页
      videoList: null, //返回的results
      page: 1 //初始页为1
    };
  },
  computed: {
    //[作废,不使用vuex]
    videos() {
      //获取vuex的store中的帖子数据
      let videos = this.$store.state.videos;
      //TODO分页
      return videos;
    }
  },
  methods: {
    //改变页码时请求那一页的list
    pageChange(val) {
      this.videoList = null;
      this.$axios.get("/api/videos/?page=" + val).then(res => {
        this.nextPage = res["data"]["next"];
        this.prePage = res["data"]["previous"];
        this.videoList = res["data"]["results"];
      });
    }
  },
  created() {
    //一开始请求的即是第一页的list
    this.$axios.get("/api/videos/").then(res => {
      this.count = res["data"]["count"];
      this.nextPage = res["data"]["next"];
      this.prePage = res["data"]["previous"];
      this.videoList = res["data"]["results"];
    });
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

/* 2 视频的容器 */
/*-----------------------------------------------------------------*/
.container {
  background-color: white;
  width: 80%;
  margin: 0 auto;
  padding-top: 10px;
  padding-bottom: 10px;
  /*border-box定义的盒子,不会随着padding和boder的加入而增大盒子的占用空间*/
  box-sizing: border-box;
  /* 所以这里要270加上上面不增大盒子占用空间的20padding */
  min-height: 290px;
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
  min-width: 200px;
  height: 150px;
  border: 1px solid #222;
  margin: 10px;
  background-color: black;
}

li img {
  max-width: 100%;
  max-height: 100%;
}

/* 2.5 页面加载时展示 */
/*-----------------------------------------------------------------*/
#load-box {
  text-align: center;
}

#load-box > img {
  margin-top: 60px;
}

/* 3 分页 */
/*-----------------------------------------------------------------*/
.pagination {
  background-color: white;
  width: 80%;
  height: 40px;
  margin: 10px auto 0;
  text-align: center;
}
</style>
