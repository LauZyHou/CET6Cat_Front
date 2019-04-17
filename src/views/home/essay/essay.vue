<template>
  <section>
    <!-- 1 标题 -->
    <div class="tit">
      <h2>高分作文</h2>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/app/home/index' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>高分作文</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!-- 2 作文list的容器 -->
    <div class="container" v-if="essayList">
      <div class="essay" v-for="essay in essayList" :key="essay.id">
        <essay-box :essay="essay"></essay-box>
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
      <el-button icon="el-icon-arrow-down" circle @click="onBottom"></el-button>
    </div>
  </section>
</template>

<script>
import essayBox from "./essayBox";

export default {
  name: "essay",
  data() {
    return {
      count: 0,
      nextPage: "",
      prePage: "",
      essayList: null
    };
  },
  computed: {
    /*
    essays() {
      //提交mutation:对sotre中的essays按时间从新到旧排序
      this.$store.commit("sortEssaysByTime");
      //获取vuex的store中的作文数据
      let essays = this.$store.state.essays;
      //TODO分页
      return essays;
    }
    */
  },
  components: {
    "essay-box": essayBox
  },
  methods: {
    //改变页码时请求那一页的list
    pageChange(val) {
      this.essayList = null;
      this.$axios.get("/api/essays/?page=" + val).then(res => {
        this.nextPage = res["data"]["next"];
        this.prePage = res["data"]["previous"];
        this.essayList = res["data"]["results"];
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
    this.$axios.get("/api/essays/").then(res => {
      this.count = res["data"]["count"];
      this.nextPage = res["data"]["next"];
      this.prePage = res["data"]["previous"];
      this.essayList = res["data"]["results"];
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

/* 2 作文的容器 */
/*-----------------------------------------------------------------*/
.container {
  background-color: white;
  width: 80%;
  margin: 0 auto;
  padding-top: 10px;
  padding-bottom: 10px;
  min-height: 270px;
}

.essay {
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
