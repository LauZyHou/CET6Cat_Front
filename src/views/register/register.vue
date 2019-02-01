<template>
  <section class="clearfix">
    <div class="fr form-box">
      <div class="tab">
        <h3>手机注册</h3>
      </div>
      <div class="tab-form">
        <form id="mobile_register_form" autocomplete="off">
          <input type="hidden" name="csrfmiddlewaretoken" value="">

          <div class="form-group">
            <label>手 机 号</label>
            <input id="jsRegMobile" name="account" v-model="mobile" type="text" placeholder="请输入手机号">
          </div>
          <p v-show="error.mobile">{{error.mobile}}</p>

          <div class="clearfix">
            <div class="form-group verify-code">
              <label>短信验证码</label>
              <input id="jsPhoneRegCaptcha" v-model="code" type="text" placeholder="输入手机验证码">
            </div>
            <el-button id="codeBtn" type="primary" :loading="codeLoad">{{codeText}}</el-button>
          </div>
          <p v-show="error.code">{{error.code}}</p>

          <div class="form-group">
            <label>密 码</label>
            <input id="jsPhoneRegPwd" name="password_m" type="password" v-model="password"
                   placeholder="请输入6-20位非中文字符密码">
          </div>
          <p v-show="error.password">{{error.password}}</p>

          <el-button id="logBtn" type="success">注册并登录</el-button>
        </form>
      </div>
      <p id="endP">
        已有账号？
        <router-link :to="'/app/login'">[立即登录]</router-link>
      </p>
    </div>
  </section>
</template>

<script>
  export default {
    name: "register",
    data() {
      return {
        mobile: "",
        code: "",
        codeLoad: false,
        codeText: "发送验证码",
        password: "",
        error: {
          mobile: "",
          code: ""
        }
      }
    }
  }
</script>

<style scoped>
  section {
    height: 500px;
    background-color: #CCFF99;
  }

  section > .fr {
    margin-top: 10px;
    margin-right: 200px;
  }

  .tab {
    height: 30px;
    border-bottom: 1px solid #dedede;
    margin-top: 20px;
    margin-bottom: 40px;
    font-size: medium;
  }

  #codeBtn {
    float: right !important;
    width: 103px;
    font-size: 12px;
  }

  .form-box {
    position: relative;
    width: 290px;
    height: 472px;
    padding: 0 40px;
    background: #fff;
    color: #666;
  }

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

  .verify-code {
    float: left;
    width: 180px !important;
  }

  .verify-code > input {
    width: 87px !important;
  }

  #logBtn {
    width: 100%;
  }

  #endP{
    width: 100%;
    margin-top: 20px;
    text-align: center;
  }
</style>
