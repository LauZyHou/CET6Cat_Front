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
        <img :src="detail.head_img?detail.head_img:'/static/headimg/default.jpg'" alt="头像">
        <el-button type="text" @click="headimgDialogVisible = true">修改头像</el-button>
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
              <router-link
                :to="'/app/member/watch_from/'+detail.id"
                target="_blank"
              >{{detail.follow_num}}</router-link>
            </el-col>
            <el-col :span="3">
              粉丝
              <router-link
                :to="'/app/member/watch_to/'+detail.id"
                target="_blank"
              >{{detail.follower_num}}</router-link>
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
              <a id="update" @click="profileDialogVisible = true">修改资料</a>
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
    <!-- (额外)1 修改头像对话框 -->
    <el-dialog title="修改头像" :visible.sync="headimgDialogVisible" width="50%" center>
      <span id="headup">
        <el-upload
          class="upload-demo"
          drag
          action="http://localhost:8000/userheadimg/"
          :multiple="false"
          :headers="tokenHeader"
        >
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">
            将文件拖到此处，或
            <em>点击上传</em>
          </div>
          <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
      </span>
    </el-dialog>
    <!-- (额外)2 修改资料对话框,使用行内表单 -->
    <el-dialog title="修改个人资料" :visible.sync="profileDialogVisible" width="50%" center>
      <el-form :model="detail" label-width="80px" :inline="true" label-position="right">
        <el-form-item label="昵称" style="width:50%;">
          <el-input v-model="detail.name" prefix-icon="el-icon-edit" style="width:107%;"></el-input>
        </el-form-item>

        <el-form-item label="性别">
          <el-radio-group v-model="detail.gender">
            <el-radio :label="true">男</el-radio>
            <el-radio :label="false">女</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="生日" style="width:50%;">
          <el-date-picker
            type="date"
            placeholder="选择日期"
            v-model="detail.birthday"
            style="width: 100%;"
            value-format="yyyy-MM-dd"
          ></el-date-picker>
        </el-form-item>

        <el-form-item label="大学">
          <el-input v-model="detail.college"></el-input>
        </el-form-item>

        <el-form-item label="简介" style="width:100%;">
          <el-input
            type="textarea"
            :rows="4"
            resize="none"
            placeholder="请输入个人简介"
            v-model="detail.brief"
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="profileDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="uploadProfile">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getUserProfile, patchUserProfile } from "../../../api/api";
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
        vip: 0,
        follow_num: null,
        follower_num: null
      },
      //[修改资料]对话框
      profileDialogVisible: false,
      //[修改头像]对话框
      headimgDialogVisible: false
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
    },
    //上传个人资料
    uploadProfile() {
      //如上传图片后,服务器上图片改了,而这里的head_img字段可能还没改
      //防止影响其它字段,所以把这些字段取出来,用部分更新
      let form = {
        name: this.detail.name,
        gender: this.detail.gender,
        birthday: this.detail.birthday,
        college: this.detail.college,
        brief: this.detail.brief
      };
      patchUserProfile(form)
        .then(res => {
          window.alert("更新成功!");
          this.profileDialogVisible = false;
        })
        .catch(error => {
          let str = "";
          for (let k in error.response.data)
            str += k + ":" + error.response.data[k] + "\n";
          window.alert(str);
        });
    }
  },
  created() {
    this.getDetail();
  },
  computed: {
    //上传文件因为没使用Axios,这里要手动加入Token
    tokenHeader() {
      return { Authorization: "Bearer " + cookie.getCookie("token") };
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
  height: 140px;
  background-color: rgb(224, 231, 250);
}

/* 3 页面加载时展示 */
/*-----------------------------------------------------------------*/
#load-box {
  margin-top: 20px;
  height: 300px;
  text-align: center;
}

#load-box > img {
  margin-top: 60px;
}

/* (额外)1~2 */
/*-----------------------------------------------------------------*/

/* 上传头像 */
#headup {
  width: 100%;
  text-align: center;
}

/* 个人简介 */
.el-form-item:last-child div {
  width: 512px;
}
</style>


