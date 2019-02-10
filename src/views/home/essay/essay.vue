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
    <div class="container">
      <div class="essay" v-for="essay in essays" :key="essay.time">
        <essay-box :essay="essay"></essay-box>
      </div>
    </div>
    <!-- 3 分页 -->
    <div class="pagination">
      <el-pagination background layout="prev, pager, next" :total="1000"></el-pagination>
    </div>
  </section>
</template>

<script>
import essayBox from "./essayBox";

export default {
  name: "essay",
  data() {
    return {};
  },
  computed: {
    essays() {
      //提交mutation:对sotre中的essays按时间从新到旧排序
      this.$store.commit("sortEssaysByTime");
      //获取vuex的store中的作文数据
      let essays = this.$store.state.essays;
      //TODO分页
      return essays;
    }
  },
  components: {
    "essay-box": essayBox
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

/* 2 作文的容器 */
/*-----------------------------------------------------------------*/

.container {
  background-color: white;
  width: 80%;
  margin: 0 auto;
  padding-top: 10px;
  padding-bottom: 10px;
}

.essay {
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
</style>
