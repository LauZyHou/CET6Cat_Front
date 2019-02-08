<template>
  <section>
    <!-- 1 标题 -->
    <div class="tit">
      <h2>查看帖子</h2>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/app/home/index' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{path : '/app/home/forum/1'}">交流论坛</el-breadcrumb-item>
        <el-breadcrumb-item>查看帖子</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!-- 2 帖子主体 -->
    <div class="container">
      <!-- 2-1 帖子标题 -->
      <el-row>
        <el-col :span="20" id="post-tit">{{detail.title}}</el-col>
        <el-col :span="4" id="post-op">
          <button @click="onlyPoster">只看楼主</button>
          <button :disabled="!mineOrAdmin">删除</button>
        </el-col>
      </el-row>
      <!-- 2-2 帖子内容 -->
      <el-row class="building">
        <el-col :span="6" class="lft">{{detail.poster.name}}</el-col>
        <el-col :span="18">{{detail.content}}</el-col>
      </el-row>
      <!-- 2-3 回帖(已经按时间顺序排好) -->
      <el-row v-for="rep in detail.replies" v-bind:key="rep.time" class="building">
        <el-col :span="6" class="lft">{{rep.replyer.name}}</el-col>
        <el-col :span="18">{{rep.content}}</el-col>
      </el-row>
    </div>
    <!-- 3 分页 -->
    <div class="pagination">
      <el-pagination background layout="prev, pager, next" :total="1000"></el-pagination>
    </div>
    <!-- 4 操作按钮 -->
    <div id="op">
      <!-- 向上 -->
      <el-button icon="el-icon-arrow-up"></el-button>
      <br>
      <!-- 回帖 -->
      <el-button type="primary" icon="el-icon-edit-outline"></el-button>
      <br>
      <!-- 收藏 -->
      <el-button type="warning" icon="el-icon-star-off"></el-button>
      <br>
      <!-- 向下 -->
      <el-button icon="el-icon-arrow-down"></el-button>
    </div>
  </section>
</template>

<script>
export default {
  name: "posts",
  data() {
    return {
      pid: "0", //post id
      detail: {
        poster: {},
        replies: []
      },
      mineOrAdmin: false //帖子是不是自己的
    };
  },
  methods: {
    //根据帖子id获取帖子详细内容
    getPost(pid) {
      //FIXME 考虑将以下全部改成发送请求来获取
      //获取vuex的store中的帖子数据
      let posts = this.$store.state.posts;
      //查找对应的帖子
      for (let i = 0; i < posts.length; i++) {
        if (posts[i].id.toString() === pid) {
          return posts[i];
        }
      }
      //store中找不到帖子
      //FIXME 这里可能要考虑更新store
      return {
        id: pid,
        title: "帖子消失了",
        content: "帖子已经找不到了，看看别的帖子吧。",
        poster: {
          name: "未知用户"
        },
        time: new Date().getTime(),
        replies: []
      };
    },
    //只看楼主
    onlyPoster() {}
  },
  mounted() {
    this.pid = this.$route.params.id;
    this.detail = this.getPost(this.pid);
  },
  beforeRouteUpdate(to, from, next) {
    //在帖子路由之间转移
    this.pid = to.params.id;
    this.detail = this.getPost(this.pid);
    next();
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

/* 2 帖子主体 */
/*-----------------------------------------------------------------*/

.container {
  background-color: white;
  width: 80%;
  margin: 0 auto;
  padding-top: 10px;
  padding-bottom: 10px;
}

/* --------------------------------------------------- */
.container > div {
  border-bottom: 1px solid black;
}

#post-tit {
  background-color: #ccff99;
  font-size: 20px;
  height: 100%;
}

/* --------------------------------------------------- */
.building,
.building > div {
  min-height: 300px;
}

.building > .lft {
  border-right: 1px solid black;
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

