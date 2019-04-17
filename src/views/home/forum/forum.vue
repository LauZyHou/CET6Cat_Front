<template>
  <section>
    <!-- 1 标题 -->
    <div class="tit">
      <h2>交流论坛</h2>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/app/home/index' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>交流论坛</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!-- 2 帖子的容器 -->
    <div class="container" v-if="postList">
      <div class="post" v-for="post in postList" :key="post.id">
        <post-box v-bind:post="post"></post-box>
      </div>
    </div>
    <!-- 2.5 页面加载时展示 -->
    <div v-else id="load-box" class="container">
      <img src="/static/loading.gif" alt="加载中">
    </div>
    <!-- 3 分页 -->
    <div class="pagination">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="count"
        :page-size="3"
        @current-change="pageChange"
      ></el-pagination>
    </div>
    <!-- 4 操作按钮 -->
    <div id="op">
      <el-button icon="el-icon-arrow-up" circle @click="onTop"></el-button>
      <br>
      <br>
      <el-button type="primary" icon="el-icon-edit-outline" circle @click="toPost"></el-button>
      <br>
      <br>
      <el-button icon="el-icon-arrow-down" circle @click="onBottom"></el-button>
    </div>
  </section>
</template>

<script>
import postBox from "./postBox";

export default {
  name: "forum",
  data() {
    return {
      count: 0,
      nextPage: "",
      prePage: "",
      postList: null
    };
  },
  methods: {
    toPost() {
      this.$router.push({ path: `/app/home/post` });
    },
    //改变页码时请求那一页的list
    pageChange(val) {
      this.postList = null;
      this.$axios.get("/api/posts/?page=" + val).then(res => {
        this.nextPage = res["data"]["next"];
        this.prePage = res["data"]["previous"];
        this.postList = res["data"]["results"];
      });
    },
    //去底部
    onBottom() {
      var h = document.body.scrollHeight;
      window.scrollTo(0, h); //到达文档底部
    },
    //去顶部
    onTop() {
      window.scrollTo(0, 0); //到达文档顶部
    }
  },
  created() {
    this.$axios.get("/api/posts/").then(res => {
      this.count = res["data"]["count"];
      this.nextPage = res["data"]["next"];
      this.prePage = res["data"]["previous"];
      this.postList = res["data"]["results"];
    });
  },
  components: {
    "post-box": postBox
  },
  computed: {
    //[作废,排序后期由后端模拟实现]
    posts() {
      //提交mutation:对sotre中的posts按最后操作时间排序
      this.$store.commit("sortPostsByLastTime");
      //获取vuex的store中的帖子数据
      let posts = this.$store.state.posts;
      //TODO分页
      return posts;
    }
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

/* 2 帖子的容器 */
/*-----------------------------------------------------------------*/
.container {
  background-color: white;
  width: 80%;
  margin: 0 auto;
  padding-top: 10px;
  padding-bottom: 10px;
  min-height: 270px;
}

.post {
  width: 90%;
  margin: 10px auto 10px;
  height: 70px;
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

/* 4 操作按钮 */
/*-----------------------------------------------------------------*/
#op {
  position: fixed;
  bottom: 300px;
  right: 40px;
}
</style>
