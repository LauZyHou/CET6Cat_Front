<template>
  <section>
    <!-- 1 标题 -->
    <div class="tit">
      <h2>背单词</h2>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/app/home/index' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>六级词汇</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!-- 2 背单词卡片 -->
    <card></card>
  </section>
</template>

<script>
import card from "./card";

export default {
  name: "word",
  components: {
    card: card
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
</style>
