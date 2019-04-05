<template>
  <section class="clearfix">
    <div class="fr form-box">
      <div class="tab">
        <h3>账号登录</h3>
      </div>
      <div class="tab-form">
        <form id="jsLoginForm" autocomplete="off">
          <input type="hidden" name="csrfmiddlewaretoken" value>

          <div class="form-group">
            <label>用 户 名</label>
            <input
              name="account_l"
              id="account_l"
              type="text"
              v-model="username"
              @focus="clearError"
              placeholder="手机号/账号"
            >
          </div>
          <p v-show="error.username">{{error.username}}</p>

          <div class="form-group">
            <label>密 码</label>
            <input
              name="password_l"
              id="password_l"
              type="password"
              v-model="password"
              @focus="clearError"
              placeholder="请输入您的密码"
            >
          </div>
          <p v-show="error.password">{{error.password}}</p>

          <el-button id="logBtn" type="success" @click="onLogin">立即登录></el-button>
          <p v-show="errorText">{{errorText}}</p>
        </form>
      </div>
      <ul>
        <li>使用第三方账号登录</li>
        <li class="other-login">
          <a id="qq" href></a>
          <a id="weibo" href></a>
          <a id="weixin" href></a>
        </li>
      </ul>
      <p id="endP">没有账号？
        <router-link to="/app/register">[立即注册]</router-link>
      </p>
    </div>
  </section>
</template>

<script>
import cookie from "../../static/js/cookie";
import { login } from "../../api/api";

export default {
  name: "login",
  data() {
    return {
      username: "",
      password: "",
      error: {
        username: "", //用户名字段格式问题
        password: "" //密码字段格式问题
      },
      errorText: "" //其它的错误都放在这里
    };
  },
  methods: {
    //清除页面上所有的error信息,不妨在光标定位到输入框中时执行(见@focus)
    clearError() {
      this.error.username = "";
      this.error.password = "";
      this.errorText = "";
    },
    //按下"立即登录"按钮
    onLogin() {
      var that = this;
      login({
        username: that.username,
        password: that.password
      })
        .then(response => {
          //设置cookie
          cookie.setCookie("name", that.username, 7);
          cookie.setCookie("token", response.data.token, 7);
          //存储在store
          that.$store.dispatch("setUserInfo");
          //跳转到首页
          that.$router.push({ name: "index" });
        })
        .catch(function(error) {
          //这里根据后端接口返回的错误结构来判定是哪种错误
          if (error.response && error.response.data) {
            if ("non_field_errors" in error.response.data) {
              that.errorText = error.response.data.non_field_errors[0];
            }
            if ("username" in error.response.data) {
              that.error.username = error.response.data.username[0];
            }
            if ("password" in error.response.data) {
              that.error.password = error.response.data.password[0];
            }
          } else {
            console.log("[error]出现了非请求错误,检查setCookie");
          }
        });
    }
  }
};
</script>

<style scoped>
section {
  height: 513px;
  /* background-color: #ccff99; */
  background-image: url("/api/media/img/login.jpg");
  background-repeat: no-repeat;
  background-size: 100% auto;
  background-position: center;
}

/*-----------------------------------------------------------------*/

section > .fr {
  margin-top: 10px;
  margin-right: 200px;
}

.form-box {
  position: relative;
  width: 290px;
  height: 472px;
  padding: 0 40px;
  background: #fff;
  color: #666;
}

/*-----------------------------------------------------------------*/

.tab {
  height: 30px;
  border-bottom: 1px solid #dedede;
  margin-top: 20px;
  margin-bottom: 40px;
  font-size: medium;
}

/*-----------------------------------------------------------------*/

.form-group {
  /*提示+输入框 外面的盒子*/
  border: 1px solid #dedede;
  border-radius: 3px;
  width: 288px;
  height: 38px;
  overflow: hidden;
  margin-bottom: 20px;
}

.form-group > label {
  float: left;
  border-right: 1px solid #dedede;
  width: 72px;
  text-align: center;
  margin-top: 9px;
}

.form-group > input {
  float: left;
  padding: 9px 10px;
  line-height: 20px;
  width: 195px;
  border: 0;
}

/*-----------------------------------------------------------------*/

#logBtn {
  width: 100%;
}

/*-----------------------------------------------------------------*/

ul > li {
  /*padding-bottom: 8px;*/
  margin-top: 10px;
  text-align: center;
}

.other-login > a {
  background: url("../../assets/icon/other-login-bg.png");
  display: inline-block;
  /*其中每个图标30x30*/
  width: 30px;
  height: 30px;
  /*图标间隔*/
  margin-right: 10px;
}

#qq {
  background-position: -40px 0;
}

#weibo {
  background-position: 0 0;
}

#weixin {
  background-position: -200px 0;
}

/*-----------------------------------------------------------------*/

#endP {
  width: 100%;
  margin-top: 20px;
  text-align: center;
}

#endP > a {
  color: #fa8341;
}
</style>
