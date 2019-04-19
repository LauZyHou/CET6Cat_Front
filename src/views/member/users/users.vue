<template>
  <section>
    <div class="clearfix" v-if="detail.vip!==null">
      <!-- 1 头像+短文本信息 -->
      <div :class="{fl:true, male:detail.gender, female:!detail.gender}">
        <!-- 1-1 头像 -->
        <img :src="detail.head_img?detail.head_img:'/static/headimg/default.jpg'" alt="头像">
        <!-- 1-2 短文本 -->
        <h2>{{detail.name?detail.name:'没有昵称'}}</h2>
        <br>
        <i class="el-icon-location">{{detail.college?detail.college:'未设置学校'}}</i>
        <br>
        <br>
        <el-button type="info" v-if="detail.watched" @click="onDelWatch">已关注</el-button>
        <el-button type="primary" v-else @click="onWatch">关注</el-button>
      </div>
      <!-- 2 进度+自我简介 -->
      <div class="fr">
        <!-- 2-1 进度(一共是103组) -->
        <h3>背单词进度</h3>
        <el-progress :percentage="detail.words_num / 103 *100" color="#8e71c7"></el-progress>
        <br>
        <!-- 2-2 活跃 -->
        <h3>活跃</h3>
        <div id="follow">
          关注：
          <router-link
            :to="'/app/member/watch_from/'+detail.id"
            target="_blank"
          >{{detail.follow_num}}</router-link>&nbsp;&nbsp;
          粉丝：
          <router-link
            :to="'/app/member/watch_to/'+detail.id"
            target="_blank"
          >{{detail.follower_num}}</router-link>
          &nbsp;&nbsp;
          连续打卡：{{detail.conti_punch}}&nbsp;&nbsp;
          发帖：{{detail.post_num}}
        </div>
        <br>
        <!-- 2-3 简介 -->
        <h3>个人简介</h3>
        <div class="brief">
          <article>{{detail.brief?detail.brief:'这个人很懒，什么都没有留下哦。'}}</article>
        </div>
      </div>
    </div>
    <!-- 页面加载时展示 -->
    <div v-else id="load-box">
      <img src="/static/loading.gif" alt="加载中">
    </div>
  </section>
</template>

<script>
import { getUserMsg, addMyWatch, delMyWatch } from "../../../api/api";
import cookie from "../../../static/js/cookie";

export default {
  name: "user",
  data() {
    return {
      detail: {
        id: null,
        name: null,
        gender: null,
        college: null,
        brief: null,
        head_img: null,
        conti_punch: null,
        words_num: null,
        vip: null,
        follow_num: null,
        follower_num: null,
        post_num: null,
        watched: null
      }
    };
  },
  methods: {
    getDetail(uid) {
      var that = this;
      //传token是为了后台判断"当前登录的用户有没有关注uid所指示的这个用户"
      //不用在这里手动传递Token,见main.js中的HTTP拦截器
      getUserMsg({ id: uid })
        .then(res => {
          for (let key in res.data) {
            this.$set(this.detail, key, res.data[key]);
          }
        })
        .catch(function(error) {
          if (error.response && error.response.data) {
            //直接根据HTTP状态码跳转到相应的错误页
            that.$router.push({ path: "/app/error/" + error.response.status });
          } else {
            window.alert("[error]出现了非请求错误");
          }
        });
    },
    onWatch() {
      //关注该用户
      addMyWatch({
        base: this.$route.params.id,
        token: cookie.getCookie("token")
      })
        .then(res => {
          window.alert("关注成功");
          this.detail.watched = true;
        })
        .catch(function(error) {
          //关注失败,对失败原因进行提示
          if (error.response && error.response.data) {
            if ("non_field_errors" in error.response.data) {
              window.alert(error.response.data["non_field_errors"]);
            } else if ("base" in error.response.data) {
              window.alert(error.response.data["base"]);
            }
          }
        });
    },
    onDelWatch() {
      //取关该用户
      delMyWatch({
        id: this.$route.params.id,
        token: cookie.getCookie("token")
      })
        .then(res => {
          window.alert("取关成功");
          this.detail.watched = false;
        })
        .catch(function(error) {
          //取关失败,对失败原因进行提示
          window.alert("[error]取消关注失败");
        });
    }
  },
  created() {
    this.getDetail(this.$route.params.id);
  },
  beforeRouteUpdate(to, from, next) {
    //在用户主页路由之间转移.vip设置为null表示还没请求到用户信息,不渲染DOM
    this.detail.vip = null;
    this.getDetail(to.params.id);
    next();
  }
};
</script>

<style scoped>
section {
  min-height: 472px;
  background-color: #ccff99;
  padding-top: 40px;
}

section > div {
  width: 80%;
  height: 400px;
  background-color: white;
  margin: 0 auto;
  box-shadow: 0 10px 15px 0 rgba(0, 0, 0, 0.18);
}

/* 1 头像+短文本信息 */
/*-----------------------------------------------------------------*/
section > div > .fl {
  width: 30%;
  text-align: center;
  padding-top: 20px;
  height: 380px;
}
.male {
  background-color: rgb(209, 234, 243);
}

.female {
  background-color: rgb(243, 209, 220);
}

/* 1-1 头像 */
/*------------------------------------------------------*/
section > div > .fl > img {
  width: 200px;
  height: 200px;
  border-radius: 50%;
}

/* 1-2 短文本 */
/*------------------------------------------------------*/
section > div > .fl > h2 {
  font-size: 30px;
}
section > div > .fl > i {
  font-size: 16px;
}

/* 2 进度+自我简介 */
/*-----------------------------------------------------------------*/
section > div > .fr {
  width: 64%;
  background-color: white;
  padding-top: 20px;
  height: 380px;
}
section > div > .fr {
  font-size: 14px;
}
section > div > .fr > h3 {
  font-size: 18px;
}

/* 2-2 活跃 */
/*------------------------------------------------------*/
#follow > a {
  color: #409eff;
}
#follow > a:hover {
  color: blue;
}

/* 2-3 简介 */
/*------------------------------------------------------*/
section > div > .fr > .brief {
  width: 96%;
  height: 200px;
  background-color: rgb(247, 250, 224);
}

/* 页面加载 */
/*------------------------------------------------------*/
#load-box {
  text-align: center;
}

#load-box > img {
  margin-top: 100px;
}
</style>


