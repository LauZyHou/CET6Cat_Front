<template>
  <section>
    <div class="clearfix">
      <!-- 1 头像+短文本信息 -->
      <div class="fl">
        <!-- 1-1 头像 -->
        <img src="/static/headimg/1.jpg" alt="头像">
        <!-- 1-2 短文本 -->
        <h2>LauZyHou</h2>
        <br>
        <i class="el-icon-location">上海大学</i>
        <br>
        <br>
        <el-button type="info" v-if="watched" @click="unwatch">已关注</el-button>
        <el-button type="primary" v-else @click="watch">关注</el-button>
      </div>
      <!-- 2 进度+自我简介 -->
      <div class="fr">
        <!-- 2-1 进度 -->
        <h3>背单词进度</h3>
        <el-progress :percentage="80" color="#8e71c7"></el-progress>
        <br>
        <!-- 2-2 活跃 -->
        <h3>活跃</h3>
        <div id="follow">
          关注：
          <router-link to>{{followNum}}</router-link>&nbsp;&nbsp;
          粉丝：
          <router-link to>{{followerNum}}</router-link>
          &nbsp;&nbsp;
          连续打卡：{{signNum}}&nbsp;&nbsp;
          发帖：{{postNum}}
        </div>
        <br>
        <!-- 2-3 简介 -->
        <h3>个人简介</h3>
        <div class="brief">
          <article>好好好</article>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "user",
  data() {
    return {
      watched: false,
      followNum: 10,
      followerNum: 3,
      signNum: 15,
      postNum: 0
    };
  },
  methods: {
    watch() {
      //todo
      // window.alert("添加关注");
      this.watched = true;
    },
    unwatch() {
      //todo
      // window.alert("取消关注");
      this.watched = false;
    }
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
  background-color: rgb(209, 234, 243);
  text-align: center;
  padding-top: 20px;
  height: 380px;
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
</style>


