<template>
  <section>
    <!-- 标题 -->
    <div class="tit">
      <h2>交流论坛</h2>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/app/home/index' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>交流论坛</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!-- 帖子的容器 -->
    <div class="container">
      <div class="post" v-for="i in 18">帖子{{i}}</div>
    </div>
    <!-- 分页 -->
    <div class="pagination">
      <el-pagination background layout="prev, pager, next" :total="1000"></el-pagination>
    </div>
  </section>
</template>

<script>
export default {
  name: "forum"
};
</script>

<style scoped>
section {
  background-color: #ccff99;
  height: 1600px;
  padding-top: 20px;
}

/*-----------------------------------------------------------------*/

.tit {
  background-color: white;
  width: 80%;
  height: 50px;
  margin: 0 auto 20px;
  text-align: center;
}

/*-----------------------------------------------------------------*/

.container {
  background-color: white;
  width: 80%;
  margin: 0 auto;
  /* height: 1400px; */
  padding-top: 10px;
  padding-bottom: 10px;
}

.post {
  background-color: #ccff99;
  width: 90%;
  margin: 10px auto 10px;
  height: 70px;
}

/*-----------------------------------------------------------------*/

.pagination {
  background-color: white;
  width: 80%;
  height: 40px;
  margin: 10px auto 0;
  text-align: center;
}

/*-----------------------------------------------------------------*/

</style>
