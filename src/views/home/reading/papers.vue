<template>
  <section>
    <!-- 1 标题 -->
    <div class="tit">
      <h2>查看文章</h2>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path : '/app/home/index' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path : '/app/home/reading/1' }">阅读分析</el-breadcrumb-item>
        <el-breadcrumb-item>查看文章</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!-- 2 文章主体 -->
    <div class="container">
      <!-- 2-1 文章标题 -->
      <el-row>
        <el-col :span="20" id="post-tit">{{detail.title}}</el-col>
        <el-col :span="4" id="post-op">
          <button @click="addEnshrine">添加收藏</button>
          <button :disabled="!mineOrAdmin">删除</button>
        </el-col>
      </el-row>
      <!-- 2-2 文章内容盒子 -->
      <div id="content">
        <!-- 2-2-1 文章内容 -->
        <div>
          <pre>{{detail.content}}这里是{{pid}}篇</pre>
        </div>
        <!-- 2-2-2 底部操作 -->
        <table>
          <tr>
            <td>
              <el-button type="primary" icon="el-icon-arrow-up" @click="prePaper">上一篇</el-button>
            </td>
            <td>
              <el-button type="primary" icon="el-icon-arrow-down" @click="nextPaper">下一篇</el-button>
            </td>
          </tr>
        </table>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "papers",
  data() {
    return {
      pid: 0,
      mineOrAdmin: false,
      detail: {
        title: "啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊",
        content: "  测试一下。"
      }
    };
  },
  methods: {
    //添加收藏
    addEnshrine() {
      //TODO添加收藏
      window.alert("添加收藏");
    },
    //获取指定id的文章
    getPaper(pid) {
      //TODO
    },
    //去上一篇
    prePaper() {
      this.$router.push({ name: "papers", params: { id: this.pid - 1 } });
    },
    //去下一篇
    nextPaper() {
      this.$router.push({ name: "papers", params: { id: this.pid + 1 } });
    }
  },
  mounted() {
    this.pid = parseInt(this.$route.params.id); //注意要转成int,这样后面+1,-1才能做数字操作
    // this.detail = this.getPaper(this.pid);
  },
  beforeRouteUpdate(to, from, next) {
    //在文章路由之间转移(上一篇下一篇时)
    this.pid = parseInt(to.params.id);
    // this.detail = this.getPaper(this.pid);
    next();
  }
};
</script>

<style scoped>
section {
  background-color: #ccff99;
  padding-top: 20px;
  padding-bottom: 10px;
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

/* 2 文章主体 */
/*-----------------------------------------------------------------*/

.container {
  background-color: white;
  width: 80%;
  margin: 0 auto;
  padding-top: 10px;
  padding-bottom: 10px;
}

/* 2-2 文章内容盒子 */
/*---------------------------------------------------*/
#content {
  border-top: 1px solid black;
  min-height: 400px;
  padding: 20px 0 0;
}

/* 2-2-1 文章内容 */
/*--------------------------------------*/
#content > div:first-child {
  margin: 0 auto;
  min-height: 360px;
  width: 80%;
  background-color: lightsteelblue;
  font-size: 20px;
}

/* 2-2-2 底部操作 */
/*--------------------------------------*/
table {
  width: 80%;
  margin: 0 auto;
  text-align: center;
  vertical-align: center;
}
</style>


