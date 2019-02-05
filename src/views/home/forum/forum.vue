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
    <div class="container">
      <div class="post" v-for="post in posts">
        <post-box v-bind:post="post"></post-box>
      </div>
    </div>
    <!-- 3 分页 -->
    <div class="pagination">
      <el-pagination background layout="prev, pager, next" :total="1000"></el-pagination>
    </div>
    <!-- 4 发帖按钮 -->
    <div id="post">
      <el-button icon="el-icon-arrow-up" circle></el-button>
      <br>
      <br>
      <el-button type="primary" icon="el-icon-edit-outline" circle @click="toPost"></el-button>
      <br>
      <br>
      <el-button icon="el-icon-arrow-down" circle></el-button>
    </div>
  </section>
</template>

<script>
import postBox from "./postBox";

export default {
  name: "forum",
  data(){
    return{
    }
  },
  methods: {
    toPost() {
      this.$router.push({ path: `/app/home/post` });
    }
  },
  components: {
    "post-box": postBox
  },
  computed:{
    posts(){
      //提交mutation:对sotre中的posts按最后操作时间排序
      this.$store.commit("sortPostsByLastTime");
      //获取vuex的store中的帖子数据
      let posts=this.$store.state.posts;
      //TODO分页
      return posts;
    }
  }
};
</script>

<style scoped>
section {
  background-color: #ccff99;
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

#post {
  position: fixed;
  bottom: 300px;
  right: 40px;
}
</style>
