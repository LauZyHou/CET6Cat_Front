<template>
  <div id="profile">
    <!-- 1 小标题 -->
    <div id="tit">
      <h2>个人资料</h2>
    </div>
    <!-- 2 内容(当axios异步请求完成后渲染) -->
    <div class="clearfix" v-if="detail.username">
      <!-- 2-1 放头像 -->
      <div class="fl">
        <img :src="detail.head_img" alt="头像">
        <el-button type="text" @click="uploadHeadImg">修改头像</el-button>
      </div>
      <!-- 2-2 放文本资料 -->
      <div class="fr">
        <!-- 2-2-1 不变的资料 -->
        <div class="immobile">
          <el-row>
            <el-col :span="20">
              <p>TEL：{{detail.mobile}}</p>
            </el-col>
            <el-col :span="4">
              <router-link :to="'/app/member/users/'+detail.id">个人主页</router-link>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="3">
              关注
              <router-link to>10</router-link>
            </el-col>
            <el-col :span="3">
              粉丝
              <router-link to>3</router-link>
            </el-col>
            <el-col :span="1">|</el-col>
            <el-col :span="3">Cat币 {{detail.catb}}</el-col>
            <el-col :span="3">
              <router-link to="/app/member/prepaid">充值</router-link>
            </el-col>
          </el-row>
        </div>
        <!-- 2-2-2可变的资料 -->
        <div class="alterable">
          <el-row>
            <el-col :span="20">昵称：{{detail.name}}</el-col>
            <el-col :span="4">
              <a id="update" @click="uploadHeadImg">修改资料</a>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              性别：
              <template v-if="detail.gender">男</template>
              <template v-else>女</template>
            </el-col>
            <el-col :span="12">生日：{{detail.birthday}}</el-col>
          </el-row>
          <el-row>
            <el-col :span="12">学校：{{detail.college}}</el-col>
            <el-col :span="12">入学年份：2015</el-col>
          </el-row>
          <div class="brief">
            个人简介：
            <article>{{detail.brief}}</article>
          </div>
        </div>
      </div>
    </div>
    <!-- 3 页面加载时展示 -->
    <div v-else id="load-box">
      <img src="/static/loading.gif" alt="加载中">
    </div>
  </div>
</template>

<script>
import { getUserProfile } from "../../../api/api";
import cookie from "../../../static/js/cookie";

export default {
  name: "profile",
  data() {
    return {
      detail: {
        id: null,
        username: null,
        name: null,
        birthday: null,
        gender: false,
        mobile: null,
        email: null,
        college: null,
        catb: 0,
        brief: null,
        head_img: null,
        switch_sec: null,
        email_notice: null,
        conti_punch: null,
        last_punch: null,
        words_num: 0,
        vip: 0
      }
    };
  },
  methods: {
    getDetail() {
      //获取用户信息并写入detail
      var that = this;
      getUserProfile({ token: cookie.getCookie("token") }).then(res => {
        for (let key in res.data) {
          this.$set(this.detail, key, res.data[key]);
        }
      });
    },
    uploadHeadImg() {
      //TODO
      window.alert("上传成功");
    }
  },
  created() {
    this.getDetail();
  }
};
</script>

<style scoped>
#profile {
  padding: 20px;
}

/* 1 小标题 */
/*-----------------------------------------------------------------*/
#tit {
  height: 40px;
  border-bottom: 1px solid lightgray;
}

/* 2 内容 */
/*-----------------------------------------------------------------*/
/* 这里用普通兄弟选择器(而不用相邻兄弟选择器)可以顺便把样式给load-box */
#tit ~ div {
  margin-top: 20px;
  height: 300px;
}

/* 2-1 放头像 */
/*------------------------------------------------------*/
.fl {
  width: 20%;
  height: 100%;
  text-align: center;
  /* background-color: #cfcfcf; */
}

.fl img {
  width: 140px;
  height: 140px;
  border-radius: 50%;
}

/* 2-2 放文本资料 */
/*------------------------------------------------------*/
.fr {
  width: 80%;
  height: 100%;
  font-size: 16px;
}

/* 2-2-1 不变的资料 */
/*--------------------------------------------*/
.fr > .immobile {
  border-bottom: 1px solid lightgray;
}

.fr > .immobile .el-row {
  margin-bottom: 10px;
}

.fr > .immobile a {
  color: #fa8341;
}

.fr > .immobile p {
  color: gray;
}

/* 2-2-2 可变的资料 */
/*--------------------------------------------*/
.fr > .alterable {
  min-height: 250px;
  background-color: cornsilk;
}

.fr > .alterable .el-row {
  margin-top: 5px;
}

#update {
  color: #409eff;
  cursor: pointer;
}

.fr > .alterable > .brief {
  padding-top: 10px;
  width: 100%;
  /* height: 200px; */
  background-color: rgb(224, 231, 250);
}

/* 3 页面加载时展示 */
/*-----------------------------------------------------------------*/
#load-box {
  text-align: center;
}

#load-box > img {
  margin-top: 60px;
}
</style>


