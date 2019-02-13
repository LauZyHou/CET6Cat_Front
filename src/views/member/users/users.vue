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
        <el-button type="primary">关注</el-button>
      </div>
      <!-- 2 进度+自我简介 -->
      <div class="fr">
        <!-- 2-1 进度 -->
        <h3>背单词进度</h3>
        <el-progress :percentage="80" color="#8e71c7"></el-progress>
        <br>
        <!-- 2-2 简介 -->
        <h3>个人简介</h3>
        <div class="brief">
          <pre>  好好好</pre>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "user",
  data() {
    return {};
  }
};
</script>

<style scoped>
section {
  height: 473px;
  background-color: #ccff99;
  padding-top: 40px;
}

section > div {
  width: 80%;
  height: 400px;
  background-color: white;
  margin: 0 auto;
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
  width: 60%;
  background-color: white;
  padding-top: 20px;
  height: 380px;
}

/* 2-2 简介 */
/*------------------------------------------------------*/
section > div > .fr > .brief {
  width: 96%;
  height: 280px;
  background-color: rgb(247, 250, 224);
}
</style>


