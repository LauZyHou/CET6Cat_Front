<template>
  <div id="t-translates">
    <!-- 1 标题 -->
    <h2>{{detail.name}}{{examMode ? '(题面)' : '(答案)'}}</h2>
    <!-- 2 内容 -->
    <div id="content">
      <pre>{{examMode ? examContent : answerContent}}</pre>
    </div>
    <!-- 3 输入框 -->
    <el-input type="textarea" :rows="4" placeholder="请输入翻译内容" v-model="userInput" resize="none"></el-input>
    <!-- 4 切换/保存答卷 -->
    <el-row>
      <!-- 左列 -->
      <el-col :span="12">
        <!-- 按钮:切换 -->
        <el-button type="primary" icon="el-icon-refresh" @click="onSwitch">切换视角</el-button>
      </el-col>
      <!-- 右列 -->
      <el-col :span="12">
        <!-- 按钮:保存答卷 -->
        <el-button type="success" @click="onUpload">
          保存答卷
          <i class="el-icon-upload2 el-icon--right"></i>
        </el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import {
  retrieveTranslate,
  getURI,
  postUserTranslate,
  getUserTranslate
} from "../../api/api";

export default {
  name: "Ttranslates",
  data() {
    return {
      detail: {
        id: "0",
        name: "加载中...",
        exam: null,
        answer: null
      },
      //[题面]字符串
      examContent: null,
      //[答案]字符串
      answerContent: null,
      //为true时展示题面,为false时展示答案
      examMode: true,
      //用户输入的翻译内容
      userInput: null
    };
  },
  created() {
    //从路由获取所要的翻译资源的id
    let id = this.$route.params.id;
    //请求翻译资源
    retrieveTranslate(id)
      .then(res => {
        //得到后将其写入detail
        for (let key in res.data) {
          this.$set(this.detail, key, res.data[key]);
        }
        return this.detail;
      })
      .then(res => {
        //根据得到的结果,再去请求两个文本文件(题面和答案)
        getURI(res.exam).then(res => {
          this.examContent = res.data;
        });
        getURI(res.answer).then(res => {
          this.answerContent = res.data;
        });
      })
      .catch(error => {
        //发生错误时展示出来
        if (null != error.response && null != error.response.data)
          window.alert(error.response.data);
        else window.alert("[error]出现非请求错误");
      });
    //请求用户存储的自己的翻译
    getUserTranslate(id)
      .then(res => {
        this.userInput = res.data["content"];
      })
      .catch(error => {
        console.log(error.response.data);
        window.alert("[error]出现错误!见cosnole");
      });
  },
  methods: {
    //切换视角
    onSwitch() {
      this.examMode = !this.examMode;
    },
    //保存答卷
    onUpload() {
      postUserTranslate({ tid: this.detail.id, content: this.userInput })
        .then(res => {
          this.$message({
            message: "已经保存到服务器!",
            type: "success"
          });
        })
        .catch(error => {
          this.$message.error(error.response.data["detail"]);
        });
    }
  }
};
</script>

<style scoped>
#t-translates {
  background-color: aliceblue;
  width: 1000px;
  height: 450px;
  margin: 0 auto;
  text-align: center;
  box-shadow: 0 10px 15px 0 rgba(0, 0, 0, 0.18);
  transition-duration: 0.5s;
}

/* 1 标题 */
/*-----------------------------------------------------------------*/
#t-translates > h2 {
  font-size: 25px;
}

/* 2 内容 */
/*-----------------------------------------------------------------*/
#content {
  text-align: left;
  background-color: rgb(205, 255, 216);
  border-left: 10px;
  min-height: 200px;
  margin-bottom: 20px;
}

/* 4 切换/保存答卷 */
.el-row {
  margin-top: 25px;
}
</style>


