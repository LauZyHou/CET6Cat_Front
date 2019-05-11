<template>
  <section>
    <!-- 1 标题 -->
    <div class="tit">
      <h2>查看帖子</h2>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path : '/app/home/index' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path : '/app/home/forum' }">交流论坛</el-breadcrumb-item>
        <el-breadcrumb-item>查看帖子</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!-- 2 帖子主体 -->
    <div class="container" v-if="detail.id!==0">
      <!-- 2-1 帖子标题 -->
      <el-row>
        <el-col :span="20" id="post-tit">{{detail.name}}</el-col>
        <el-col :span="4" id="post-op">
          <!-- <button @click="onlyPoster">只看楼主</button> -->
          <!-- <button :disabled="true">删除</button> -->
        </el-col>
      </el-row>
      <!-- 2-2 帖子内容 -->
      <el-row class="building">
        <el-col :span="6" class="lft">
          <h4>
            <router-link
              :to="'/app/member/users/'+detail.uper.id"
              target="_blank"
            >{{detail.uper.name?detail.uper.name:'无名用户'}}</router-link>
          </h4>
          <router-link :to="'/app/member/users/'+detail.uper.id" target="_blank">
            <img
              :src="detail.uper.head_img?detail.uper.head_img:'/static/headimg/default.jpg'"
              :alt="detail.uper.name"
            >
          </router-link>
        </el-col>
        <el-col :span="18">
          <pre>{{detail.content}}</pre>
        </el-col>
      </el-row>
      <!-- 2-3 回帖(已经按时间顺序排好) -->
      <el-row v-for="rep in detail.replies" v-bind:key="rep.id" class="building">
        <el-col :span="6" class="lft">
          <h4>
            <router-link
              :to="'/app/member/users/'+rep.uper.id"
              target="_blank"
            >{{rep.uper.name?rep.uper.name:'无名用户'}}</router-link>
          </h4>
          <router-link :to="'/app/member/users/'+rep.uper.id" target="_blank">
            <img
              :src="rep.uper.head_img?rep.uper.head_img:'/static/headimg/default.jpg'"
              :alt="rep.uper.name"
            >
          </router-link>
        </el-col>
        <el-col :span="18">
          <pre>{{rep.content}}</pre>
        </el-col>
      </el-row>
    </div>
    <!-- 3 TODO分页 -->
    <!--
    <div class="pagination">
      <el-pagination background layout="prev, pager, next" :total="50"></el-pagination>
    </div>
    -->
    <!-- 4 操作按钮 -->
    <div id="op">
      <!-- 向上 -->
      <el-button icon="el-icon-arrow-up" @click="onTop"></el-button>
      <br>
      <!-- 回帖(就是向下到底) -->
      <el-button type="primary" icon="el-icon-edit-outline" @click="onBottom"></el-button>
      <br>
      <!-- 收藏/取消收藏 -->
      <el-button type="warning" :icon="'el-icon-star-'+(detail.isFaved?'on':'off')" @click="onFav"></el-button>
      <br>
      <!-- 向下 -->
      <el-button icon="el-icon-arrow-down" @click="onBottom"></el-button>
    </div>
    <!-- 5 发表回复 -->
    <div id="reply">
      <!-- 5-1 回复模块标题 -->
      <el-row>
        <el-col :span="8">
          <h3>发表回复</h3>
        </el-col>
        <el-col :span="16">
          发帖请遵守
          <router-link to>CET6Cat社区规范</router-link>
        </el-col>
      </el-row>
      <!-- 5-2 回复表单  -->
      <el-form :model="form">
        <!-- 5-2-1 内容 -->
        <div class="padding-lr">
          <el-input
            type="textarea"
            :autosize="{ minRows: 10, maxRows: 24}"
            placeholder="请输入内容"
            v-model="form.content"
          ></el-input>
        </div>
        <!-- 5-2-2 操作 -->
        <br>
        <el-row class="padding-lr">
          <el-col :span="2" :offset="16">
            <el-button type="primary" @click="onSubmit">提交回复</el-button>
          </el-col>
          <el-col :span="6">
            <el-button type="info" @click="onClear">清空</el-button>
          </el-col>
        </el-row>
      </el-form>
    </div>
  </section>
</template>

<script>
import { addFavPost, delFavPost, addReply } from "../../../api/api";

export default {
  name: "posts",
  data() {
    return {
      detail: {
        id: 0,
        replies: null,
        name: "帖子不存在",
        content: "找不到你想访问的帖子",
        category: 0,
        add_time: "",
        uper: 0,
        isFaved: false
      },
      form: {
        content: null,
        post: null
      }
    };
  },
  methods: {
    //根据帖子id获取帖子详细内容
    getDetail(pid) {
      this.$axios.get("/api/posts/" + pid + "/").then(res => {
        for (let key in res.data) {
          this.$set(this.detail, key, res.data[key]);
        }
      });
      /*
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
      */
    },
    //只看楼主
    onlyPoster() {},
    //点击[提交回复]按钮
    onSubmit() {
      var that = this;
      if (null === this.form.content || 0 === this.form.content.length)
        window.alert("缺少内容");
      else {
        //添加"回帖回的是哪个帖子"这一字段
        this.form.post = this.detail.id;
        console.log(this.form.uper);
        //调用回帖API
        addReply(this.form)
          .then(res => {
            window.alert("回帖成功!");
            //回帖成功重新获取一下该帖子
            this.getDetail(this.detail.id);
            //清空一下
            this.onClear();
          })
          .catch(error => {
            if (null !== error.response && null !== error.response.data)
              window.alert(error.response.data);
            else window.alert("[error]回帖失败!");
          });
      }
    },
    //清空输入的回帖
    onClear() {
      this.form.content = null;
    },
    //去底部
    onBottom() {
      var h = document.body.scrollHeight;
      window.scrollTo(0, h); //到达文档底部
    },
    //去顶部
    onTop() {
      window.scrollTo(0, 0); //到达文档顶部
    },
    //点击[添加收藏/取消收藏]按钮
    onFav() {
      var that = this;
      //已收藏,取消收藏
      if (this.detail.isFaved) {
        delFavPost({ id: this.$route.params.id })
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
        addFavPost({ base: this.$route.params.id })
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
    }
  },
  created() {
    this.getDetail(this.$route.params.id);
  },
  beforeRouteUpdate(to, from, next) {
    //在帖子路由之间转移.id设置为0表示还没找到帖子不渲染DOM
    this.detail.id = 0;
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

/* 2 帖子主体 */
/*-----------------------------------------------------------------*/

.container {
  background-color: white;
  width: 80%;
  margin: 0 auto;
  padding-top: 10px;
  padding-bottom: 10px;
}

/*---------------------------------------------------*/
.container > div {
  border-bottom: 1px solid black;
}

#post-tit {
  background-color: rgb(212, 237, 238);
  font-size: 20px;
  height: 100%;
}

/* 2-2 帖子内容 2-3 回帖 */
/*---------------------------------------------------*/
.building,
.building > div {
  min-height: 270px;
}

.building > .lft {
  border-right: 1px solid black;
  text-align: center;
}

.building > .lft img {
  width: 200px;
  height: 200px;
  border-radius: 100px;
}

.building h4 {
  margin-top: 10px;
  font-size: 20px;
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

/* 5 发表回复 */
/*-----------------------------------------------------------------*/
#reply {
  background-color: white;
  width: 80%;
  min-height: 300px;
  margin: 10px auto 0;
  text-align: center;
  padding-top: 5px;
  padding-bottom: 5px;
}

/* 5-1 回复模块标题 */
/*----------------------------------------------------*/

#reply > div:first-child {
  font-size: 14px;
  font-weight: normal;
  color: darkslategray;
}

#reply > div:first-child a {
  color: #fa8341;
}

.padding-lr {
  padding: 0 10px 10px;
}
</style>

