<template>
  <section>
    <!-- 1 标题 -->
    <div class="tit">
      <h2>阅读分析</h2>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/app/home/index' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>阅读分析</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!-- 2 文章list的容器 -->
    <div class="container" v-if="readingList">
      <div class="paper" v-for="r in readingList" :key="r.id">
        <paper-box :paper="r"></paper-box>
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
        :page-size="7"
        @current-change="pageChange"
      ></el-pagination>
    </div>
    <!-- 4 操作按钮 -->
    <div id="op">
      <el-button icon="el-icon-arrow-up" circle @click="onTop"></el-button>
      <br>
      <br>
      <el-button icon="el-icon-arrow-down" circle @click="onBottom"></el-button>
    </div>
  </section>
</template>

<script>
import paperBox from "./paperBox";

export default {
  name: "reading",
  data() {
    return {
      count: 0,
      nextPage: "",
      prePage: "",
      readingList: null
    };
  },
  computed: {
    //[作废]
    /*
    papers() {
      //提交mutation:对sotre中的papers按时间从新到旧排序
      this.$store.commit("sortPapersByTime");
      //获取vuex的store中的帖子数据
      let papers = this.$store.state.papers;
      //TODO分页
      return papers;
    }
    */
  },
  components: {
    "paper-box": paperBox
  },
  methods: {
    //改变页码时请求那一页的list
    pageChange(val) {
      this.readingList = null;
      this.$axios.get("/api/readings/?page=" + val).then(res => {
        this.nextPage = res["data"]["next"];
        this.prePage = res["data"]["previous"];
        this.readingList = res["data"]["results"];
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
    this.$axios.get("/api/readings/").then(res => {
      this.count = res["data"]["count"];
      this.nextPage = res["data"]["next"];
      this.prePage = res["data"]["previous"];
      this.readingList = res["data"]["results"];
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

/* 2 文章的容器 */
/*-----------------------------------------------------------------*/
.container {
  background-color: white;
  width: 80%;
  margin: 0 auto;
  padding-top: 10px;
  padding-bottom: 10px;
  min-height: 270px;
}

.paper {
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
