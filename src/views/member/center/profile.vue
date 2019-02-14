<template>
  <div id="profile">
    <!-- 1 小标题 -->
    <div id="tit">
      <h2>个人资料</h2>
    </div>
    <!-- 2 内容 -->
    <div class="clearfix">
      <!-- 2-1 放头像 -->
      <div class="fl">
        <img src="/static/headimg/1.jpg" alt="头像">
        <el-button type="text" @click="uploadHeadImg">修改头像</el-button>
      </div>
      <!-- 2-2 放文本资料 -->
      <div class="fr">
        <!-- 2-2-1 不变的资料 -->
        <div class="immobile">
          <el-row>
            <el-col :span="20">
              <p>TEL：18812341234</p>
            </el-col>
            <el-col :span="4">
              <router-link :to="'/app/member/users/'+id">个人主页</router-link>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="3">关注 
              <router-link to="">10</router-link>
            </el-col>
            <el-col :span="3">粉丝 
              <router-link to="">3</router-link>
            </el-col>
            <el-col :span="1">|</el-col>
            <el-col :span="3">Cat币 0</el-col>
            <el-col :span="3">
              <router-link to="/app/member/prepaid">充值</router-link>
            </el-col>
          </el-row>
        </div>
        <!-- 2-2-2可变的资料 -->
        <div class="alterable">
          <el-row>
            <el-col :span="20">昵称：刘知昊</el-col>
            <el-col :span="4">
              <a id="update" @click="uploadHeadImg">修改资料</a>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">性别：男</el-col>
            <el-col :span="12">生日：1997-05-02</el-col>
          </el-row>
          <el-row>
            <el-col :span="12">学校：上海大学</el-col>
            <el-col :span="12">入学年份：2015</el-col>
          </el-row>
          <div class="brief">个人简介：
            <article>{{brief}}</article>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "profile",
  data() {
    return {
      id: 1,
      brief:
        "好好好好好好好好好好好好好好好好好好好好好好好好好好好好好好好好好好好好好好好好好好好好好好好好好好好好好好"
    };
  },
  methods: {
    uploadHeadImg() {
      //TODO
      window.alert("上传成功");
    }
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
#tit + div {
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
</style>


