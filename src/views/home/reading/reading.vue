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
    <div class="container">
      <div class="paper" v-for="paper in papers" :key="paper.time">
        <paper-box :paper="paper"></paper-box>
      </div>
    </div>
    <!-- 3 分页 -->
    <div class="pagination">
      <el-pagination background layout="prev, pager, next" :total="1000"></el-pagination>
    </div>
  </section>
</template>

<script>
import paperBox from "./paperBox";

export default {
  name: "reading",
  data() {
    return {};
  },
  computed: {
    papers() {
      //提交mutation:对sotre中的papers按时间从新到旧排序
      this.$store.commit("sortPapersByTime");
      //获取vuex的store中的帖子数据
      let papers = this.$store.state.papers;
      //TODO分页
      return papers;
    }
  },
  components: {
    "paper-box": paperBox
  }
};
</script>

<style scoped>
section {
  background-color: #ccff99;
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
}

.paper {
  background-color: #ccff99;
  width: 90%;
  margin: 10px auto 10px;
  height: 70px;
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
</style>
