<template>
  <section class="clearfix">
    <div class="fr form-box">
      <div class="tab">
        <h3>手机注册</h3>
      </div>
      <div class="tab-form">
        <form id="mobile_register_form" autocomplete="off">
          <input type="hidden" name="csrfmiddlewaretoken" value>

          <div class="form-group">
            <label>手 机 号</label>
            <input
              id="jsRegMobile"
              name="account"
              v-model="mobile"
              type="text"
              placeholder="请输入手机号"
            >
          </div>
          <p v-show="error.mobile">{{error.mobile}}</p>

          <div class="clearfix">
            <div class="form-group verify-code">
              <label>短信验证码</label>
              <input id="jsPhoneRegCaptcha" v-model="code" type="text" placeholder="输入手机验证码">
            </div>
            <el-button
              id="codeBtn"
              type="primary"
              :loading="codeLoad"
              @click="onVerifyCode"
            >{{notice}}</el-button>
          </div>
          <p v-show="error.code">{{error.code}}</p>

          <div class="form-group">
            <label>密 码</label>
            <input
              id="jsPhoneRegPwd"
              name="password_m"
              type="password"
              v-model="password"
              placeholder="请输入6-20位非中文字符密码"
            >
          </div>
          <p v-show="error.password">{{error.password}}</p>

          <el-button id="logBtn" type="success" @click="onRegister">注册并登录</el-button>
        </form>
      </div>
      <p id="endP">已有账号？
        <router-link to="/app/login">[立即登录]</router-link>
      </p>
    </div>
  </section>
</template>

<script>
import { register, verifyCode } from "../../api/api";
import cookie from "../../static/js/cookie";

export default {
  name: "register",
  data() {
    return {
      username: "",
      password: "",
      mobile: "",
      code: "",
      codeLoad: false,
      notice: "发送验证码",
      error: {
        username: "",
        password: "",
        mobile: "",
        code: ""
      }
    };
  },
  methods: {
    //清除页面上所有的error信息,在每次发送或尝试注册前都要执行
    clearError() {
      this.error.username = "";
      this.error.password = "";
      this.error.mobile = "";
      this.error.code = "";
    },
    //按下"注册并登录"按钮
    onRegister() {
      this.clearError();
      var that = this;
      //调用后端注册接口
      register({
        password: that.password,
        username: that.mobile,
        mobile: that.mobile,
        code: that.code
      })
        .then(response => {
          //设置cookie
          cookie.setCookie("name", response.data.username, 7);
          cookie.setCookie("token", response.data.token, 7);
          //存储在store
          that.$store.dispatch("setUserInfo");
          //跳转到首页
          that.$router.push({ name: "index" });
        })
        .catch(function(error) {
          if (error.response && error.response.data) {
            that.error.mobile = error.response.data.username
              ? error.response.data.username[0]
              : "";
            that.error.password = error.response.data.password
              ? error.response.data.password[0]
              : "";
            that.error.username = error.response.data.mobile
              ? error.response.data.mobile[0]
              : "";
            that.error.code = error.response.data.code
              ? error.response.data.code[0]
              : "";
          } else {
            console.log("[error]出现了非请求错误,检查setCookie");
          }
        });
    },
    //按下"发送验证码"按钮
    onVerifyCode() {
      this.clearError();
      var that = this;
      //进行60秒倒计时
      var countdown = 60;
      settime();

      function settime() {
        if (countdown === 0) {
          countdown = 60;
          that.notice = "发送验证码";
          that.codeLoad = false;
          return;
        } else {
          that.notice = "重发(" + countdown + ")";
          that.codeLoad = true;
          countdown--;
        }
        //setTimeout()方法用于在指定的毫秒数后调用函数或计算表达式
        //这里即是在1000ms即1s后调用settime()函数
        //setTimeout()只调用目标函数一次.如果要多次调用,使用setInterval()或者让目标函数自身再次调用setTimeout()
        //这里是使用后面的方式,所以这个setTimeout()直接写在了这个settime()函数内部
        setTimeout(function() {
          settime();
        }, 1000);
      }

      //调用后端接口发送验证码.因为setTimeout是异步的,所以这里不用等待60s后才执行
      verifyCode({
        mobile: that.mobile
      })
        .then(response => {})
        .catch(function(error) {
          if (error.response.status === 400)
            //必填项/不能为空/用户已注册过
            that.error.mobile = error.response.data.mobile[0];
        });
    }
  }
};
</script>

<style scoped>
section {
  height: 513px;
  /* background-color: #ccff99; */
  background-image: url("/api/media/img/register.jpg");
  background-repeat: no-repeat;
  background-size: 100% auto;
  background-position: bottom;
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

.verify-code {
  float: left;
  width: 180px !important;
}

.verify-code > input {
  width: 87px !important;
}

#codeBtn {
  float: right !important;
  width: 103px;
  font-size: 12px;
}

/*-----------------------------------------------------------------*/

#logBtn {
  width: 100%;
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
