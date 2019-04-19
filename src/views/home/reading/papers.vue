<template>
  <section>
    <!-- 1 标题 -->
    <div class="tit">
      <h2>查看文章</h2>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path : '/app/home/index' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path : '/app/home/reading' }">阅读分析</el-breadcrumb-item>
        <el-breadcrumb-item>查看文章</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!-- 2 文章主体 -->
    <div class="container">
      <!-- 2-1 文章标题 -->
      <el-row>
        <el-col :span="20" id="paper-tit">{{detail.name}}</el-col>
        <el-col :span="4" id="paper-op">
          <button @click="onFav">{{this.detail.isFaved?'取消':'添加'}}收藏</button>
          <button :disabled="!mineOrAdmin">删除</button>
        </el-col>
      </el-row>
      <!-- 2-2 文章内容盒子 -->
      <div id="content">
        <!-- 2-2-1 文章内容 -->
        <div>
          <pre v-if="readingDetail">{{readingDetail}}</pre>
          <img v-else id="absolute-load" src="/static/loading.gif" alt="加载中">
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
import { addFavReading, delFavReading } from "../../../api/api";

export default {
  name: "papers",
  data() {
    return {
      mineOrAdmin: false,
      detail: {
        id: 0,
        source_name: "无效的来源",
        source_url: "无效的来源URL",
        name: "文章不存在",
        content: "找不到你想访问的文章",
        add_time: "",
        source: 0,
        isFaved: false
      },
      //服务器上的文件文本内容读取到该字段中
      readingDetail: null
    };
  },
  methods: {
    //根据文章id获取详细内容
    getDetail(rid) {
      //获取detail
      this.$axios
        .get("/api/readings/" + rid + "/")
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
        })
        .catch(error => {
          if (error.response && error.response.data) {
            //直接根据HTTP状态码跳转到相应的错误页
            this.$router.push({ path: "/app/error/" + error.response.status });
          } else {
            window.alert("[error]出现了非请求错误");
          }
        });
    },
    //点击[添加收藏/取消收藏]按钮
    onFav() {
      var that = this;
      //已收藏,取消收藏
      if (this.detail.isFaved) {
        delFavReading({ id: this.$route.params.id })
          .then(res => {
            window.alert("取消收藏成功!");
            this.detail.isFaved = false;
          })
          .catch(error => {
            window.alert("[error]取消收藏失败");
          });
      }
      //未收藏,添加收藏
      else {
        addFavReading({ base: this.$route.params.id })
          .then(res => {
            window.alert("添加收藏成功!");
            this.detail.isFaved = true;
          })
          .catch(error => {
            //添加失败,对失败原因进行提示
            if (error.response && error.response.data) {
              if ("non_field_errors" in error.response.data) {
                window.alert(error.response.data["non_field_errors"]);
                //这里都是因为视频已经收藏过了,说明前端收藏状态有点问题,这里切一下收藏状态
                //什么时候可能出现这种问题?当用户没登录打开这个页面,登录了以后再在这个页面上点收藏时
                //这样就不用去刷新整个页面了
                that.detail.isFaved = true;
              } else if ("base" in error.response.data) {
                window.alert(error.response.data["base"]);
              }
            }
          });
      }
    },
    //去上一篇
    prePaper() {
      this.$router.push({ name: "papers", params: { id: this.detail.id - 1 } });
    },
    //去下一篇
    nextPaper() {
      this.$router.push({ name: "papers", params: { id: this.detail.id + 1 } });
    }
  },
  created() {
    this.getDetail(this.$route.params.id);
  },
  beforeRouteUpdate(to, from, next) {
    this.readingDetail = null;
    this.detail.name = "Loading...";
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

#absolute-load {
  position: absolute;
  left: 530px;
  height: 300px;
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


