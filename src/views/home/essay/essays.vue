<template>
  <section>
    <!-- 1 标题 -->
    <div class="tit">
      <h2>查看作文</h2>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path : '/app/home/index' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path : '/app/home/essay/1' }">高分作文</el-breadcrumb-item>
        <el-breadcrumb-item>查看作文</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!-- 2 文章主体 -->
    <div class="container" v-if="detail.id!==0">
      <!-- 2-1 文章标题 -->
      <el-row>
        <el-col :span="20" id="essay-tit">{{detail.name}}</el-col>
        <el-col :span="4" id="essay-op">
          <button @click="addEnshrine">添加收藏</button>
          <button :disabled="!mineOrAdmin">删除</button>
        </el-col>
      </el-row>
      <!-- 2-2 文章内容盒子 -->
      <div id="content">
        <!-- 2-2-1 文章内容 -->
        <div>
          <p>{{readingDetail}}</p>
        </div>
        <!-- 2-2-2 底部操作 -->
        <table>
          <tr>
            <td>
              <el-button type="primary" icon="el-icon-arrow-up" @click="preEssay">上一篇</el-button>
            </td>
            <td>
              <el-button type="primary" icon="el-icon-arrow-down" @click="nextEssay">下一篇</el-button>
            </td>
          </tr>
        </table>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "essays",
  data() {
    return {
      mineOrAdmin: false,
      detail: {
        id: 0,
        name: "作文不存在",
        content: "找不到你想访问的作文",
        add_time: "",
        source: 0
      },
      //服务器上的文件文本内容读取到该字段中
      readingDetail: ""
    };
  },
  methods: {
    //根据作文id获取详细内容
    getDetail(eid) {
      //获取detail
      this.$axios
        .get("/api/essays/" + eid + "/")
        .then(res => {
          for (let key in res.data) {
            this.$set(this.detail, key, res.data[key]);
          }
          return this.detail.content;
        })
        .then(uri => {
          //读取完成后读取其对应服务器上的文件资源
          if (uri) {
            this.$axios.get(uri).then(res => {
              this.readingDetail = res.data;
            });
          }
        });
    },
    //添加收藏
    addEnshrine() {
      //TODO添加收藏
      window.alert("添加收藏");
    },
    //获取指定id的作文
    getEssay(pid) {
      //TODO
    },
    //去上一篇
    preEssay() {
      this.$router.push({ name: "essays", params: { id: this.detail.id - 1 } });
    },
    //去下一篇
    nextEssay() {
      this.$router.push({ name: "essays", params: { id: this.detail.id + 1 } });
    }
  },
  created() {
    this.getDetail(this.$route.params.id);
  },
  beforeRouteUpdate(to, from, next) {
    //在文章路由之间转移(上一篇下一篇时).id设置为0表示还没找到帖子不渲染DOM
    this.detail.id = 0;
    this.readingDetail = "";
    this.getDetail(to.params.id);
    next();
  }
};
</script>

<style scoped>
section {
  /* background-color: #ccff99; */
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


