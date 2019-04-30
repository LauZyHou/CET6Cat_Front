<template>
  <header>
    <!-- 1 顶部随动的注册,登录提示 -->
    <!-- 1-1 已登录 -->
    <div v-if="userInfo.name" class="top-bar">
      <span>你好，{{userInfo.name}}</span>
      <span class="space">|</span>
      <router-link rel="nofollow" to="/app/member/center/profile" target="_blank">个人中心</router-link>
      <span class="space">|</span>
      <router-link rel="nofollow" to="/app/member/situation" target="_blank">学习情况</router-link>
      <span class="space">|</span>
      <a @click="onExit">退出</a>
      <!-- <span class="space">|</span> -->
      <!-- <router-link rel="nofollow" to="">其它功能</router-link> -->
    </div>
    <!-- 1-2 未登录 -->
    <div v-else class="top-bar">
      <span>你好，访客</span>
      <span class="space">|</span>
      <router-link rel="nofollow" to="/app/register">注册</router-link>
      <span class="space">|</span>
      <router-link rel="nofollow" to="/app/login">登录</router-link>
    </div>
    <!-- 2 图标和搜索栏 -->
    <div class="top-show">
      <div class="logo">
        <!--<h2>CET6Cat六级辅导</h2>-->
        <img src="../../assets/vue.png" alt="Vue.js">
      </div>
      <div class="top-search">
        <el-input placeholder="请输入内容" v-model="searchContent">
          <el-button slot="append" icon="el-icon-search" @click="onSearch"></el-button>
        </el-input>
      </div>
    </div>
    <!-- 3 导航条 -->
    <div class="top-nav">
      <el-menu
        default-active="1"
        class="el-menu-demo"
        mode="horizontal"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
        :router="true"
        @select="selectMenu"
      >
        <el-menu-item index="/app/home/index">首页</el-menu-item>
        <!-- 这里因为只想用selectMenu处理,不用router,但又不能不定义index,所以这里的index都加了#符 -->
        <el-submenu index="#train">
          <template slot="title">专项训练</template>
          <el-menu-item index="#word">单词测验</el-menu-item>
          <el-menu-item index="#listen">听力测验</el-menu-item>
          <el-menu-item index="#translate">翻译测验</el-menu-item>
          <!--
          <el-submenu index="2-4">
            <template slot="title">选项4</template>
            <el-menu-item index="2-4-1">选项1</el-menu-item>
            <el-menu-item index="2-4-2">选项2</el-menu-item>
            <el-menu-item index="2-4-3">选项3</el-menu-item>
          </el-submenu>
          -->
        </el-submenu>
        <!--
        <el-menu-item index="/app/home/online" disabled>在线模拟</el-menu-item>
        -->
        <el-menu-item index="/app/home/course">在线视频</el-menu-item>
        <el-menu-item index="/app/home/forum">交流论坛</el-menu-item>
        <el-menu-item index="/app/home/word">六级词汇</el-menu-item>
        <el-menu-item index="/app/home/reading">阅读分析</el-menu-item>
        <el-menu-item index="/app/home/essay">高分作文</el-menu-item>
      </el-menu>
    </div>
  </header>
</template>

<script>
import { mapGetters } from "vuex";
import cookie from "../../static/js/cookie";

export default {
  name: "mainHead",
  data() {
    return {
      searchContent: null,
      isLogin: true
    };
  },
  methods: {
    //选中导航条中的某项时触发此方法
    //回调参数:(index属性值,保存从根到此节点的路径上的所有index的数组)
    selectMenu(index, indexPath) {
      if (indexPath[0] === "#train") {
        this.$confirm("进入[" + indexPath[1] + "测验]?")
          .then(_ => {
            //选择了确认,到测验页中去组卷,这里只要新窗口打开相应的测验页
            let routeData = this.$router.resolve({
              //去掉开头防使用index做router的#符
              path: "/app/train/T" + indexPath[1].replace("#", "")
            });
            window.open(routeData.href, "_blank");
          })
          .catch(_ => {
            //选择了取消,什么都不做
          });
      }
    },
    //点击[退出]
    onExit() {
      //清除cookie
      cookie.delCookie("token");
      cookie.delCookie("name");
      //用action提交mutation,更新store数据
      this.$store.dispatch("setInfo");
      //跳转到登录
      this.$router.push({ name: "login" });
    },
    //点击[搜索]
    onSearch() {
      if (this.searchContent != null) {
        //到组件中去查,这里只要打开新窗口把URL参数跟过去
        let routeData = this.$router.resolve({
          path: "/app/search/Sglobal",
          query: { s: this.searchContent }
        });
        window.open(routeData.href, "_blank");
      }
    }
  },
  computed: {
    ...mapGetters([
      //在这个传入的数组里写store中getters里的方法
      "userInfo"
    ])
  }
};
</script>

<style scoped>
/* 1 顶部随动的注册,登录提示 */
/*-----------------------------------------------------------------*/

.top-bar {
  font-size: 15px;
  text-align: center;
  width: 100%;
  margin: 0 auto;
  line-height: 36px;
  height: 36px;
  background: #fff;
  z-index: 1000;
  /*随动*/
  position: fixed;
  top: 0;
  left: 0;
  /*透明*/
  filter: alpha(Opacity=80);
  -moz-opacity: 0.5;
  opacity: 0.5;
}

.top-bar:hover {
  /*取消透明*/
  filter: alpha(Opacity=100);
  -moz-opacity: 100;
  opacity: 100;
}

/*竖线*/
.space {
  padding: 0 8px;
  color: #959595;
}

a {
  cursor: pointer;
}

/* 2 图标和搜索栏 */
/*-----------------------------------------------------------------*/

.top-show {
  z-index: 4;
  margin-top: 17px;
  width: 96%;
  background: #fff;
  height: 80px;
  display: flex;
  /*垂直居中*/
  align-items: center;
}

header,
.top-show {
  position: relative;
}

.top-search {
  flex: 7;
}

.el-select .el-input {
  width: 130px;
}

.logo {
  flex: 1;
  height: 40px;
  width: 40px;
}

.logo {
  margin-left: 20px;
  /*background: url("../assets/vue.png") no-repeat 5px 5px;*/
}

/*图片总是尽量占满*/
img {
  width: auto;
  height: auto;
  max-width: 100%;
  max-height: 100%;
}

.input-with-select .el-input-group__prepend {
  background-color: #fff;
}

/*-----------------------------------------------------------------*/
</style>
