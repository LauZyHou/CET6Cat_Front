<template>
  <div v-if="detail.answer" id="t-listens">
    <!-- 1 标题 -->
    <h2>{{detail.name}}{{examMode ? '(题面)' : '(答案)'}}</h2>
    <!-- 2 内容 -->
    <div id="content">
      <pre>{{examMode ? examContent : answerContent}}</pre>
    </div>
    <!-- 3 左侧的听力控制 -->
    <div id="control">
      <audio :src="detail.content" controls="controls">您的浏览器不支持</audio>
    </div>
    <!-- 4 两侧随动的答题卡 -->
    <!-- 4-1 左侧 -->
    <div class="answer-sheet lft">
      <h3>答题卡(1~15)</h3>
      <div v-for="i in 15" :key="i">
        {{ 10>i ? '0'+i : i }}
        <el-radio-group v-model="userCheck[i-1]" size="mini">
          <el-radio-button :label="0">A</el-radio-button>
          <el-radio-button :label="1">B</el-radio-button>
          <el-radio-button :label="2">C</el-radio-button>
          <el-radio-button :label="3">D</el-radio-button>
        </el-radio-group>
      </div>
    </div>
    <!-- 4-2 右侧 -->
    <div class="answer-sheet rgt">
      <h3>答题卡(16~{{detail.count}})</h3>
      <div v-for="i in 15" :key="i+15">
        {{ i+15>detail.count ? '--' : i+15 }}
        <el-radio-group v-model="userCheck[i-1+15]" size="mini" :disabled="i+15>detail.count">
          <el-radio-button :label="0">A</el-radio-button>
          <el-radio-button :label="1">B</el-radio-button>
          <el-radio-button :label="2">C</el-radio-button>
          <el-radio-button :label="3">D</el-radio-button>
        </el-radio-group>
      </div>
    </div>
    <!-- 5 随动按钮:切换题面/答案 -->
    <div id="switch-box">
      <el-button type="danger" plain icon="el-icon-refresh" @click="onSwitch">切换</el-button>
    </div>
  </div>
  <!-- 页面加载时展示 -->
  <div v-else>
    <div id="load-box">
      <img src="/static/loading.gif" alt="加载中">
    </div>
  </div>
</template>



<script>
/* 听力测验:详情页 */

import { retrieveAudio, getURI } from "../../api/api";

export default {
  name: "Tlistens",
  data() {
    return {
      detail: {
        id: "0",
        name: "加载中...",
        contnet: null,
        exam: null,
        answer: null,
        count: 25
      },
      //[题面]字符串
      examContent: null,
      //[答案]字符串
      answerContent: null,
      //用户对每一题的选项,null表示没选,最长长度为30(一套题大概25个选项)
      userCheck: [],
      //为true时展示题面,为false时展示答案
      examMode: true,
      //是否已上传答卷
      isUpload: false
    };
  },
  created() {
    //从路由获取所要的听力资源的id
    let id = this.$route.params.id;
    //请求听力资源
    retrieveAudio(id)
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
  },
  methods: {
    //切换[题面]/[答案]
    onSwitch() {
      this.examMode = !this.examMode;
    }
  }
};
</script>

<style scoped>
#t-listens {
  background-color: aliceblue;
  width: 970px;
  min-height: 600px;
  padding-bottom: 20px;
  margin: 0 auto;
  text-align: center;
  box-shadow: 0 10px 15px 0 rgba(0, 0, 0, 0.18);
  transition-duration: 0.5s;
}

/* 1 标题 */
/*-----------------------------------------------------------------*/
#t-listens > h2 {
  font-size: 25px;
}

/* 2 内容 */
/*-----------------------------------------------------------------*/
#content {
  text-align: left;
  background-color: rgb(205, 255, 216);
  border-left: 10px;
}

/* 3 左侧的听力控制 */
/*-----------------------------------------------------------------*/
#control {
  position: absolute;
  top: 70px;
  left: 200px;
  border: 1px solid brown;
  border-radius: 20px;
}

/* 4 两侧随动的答题卡 */
/*-----------------------------------------------------------------*/
.answer-sheet {
  position: fixed;
  background-color: aliceblue;
  top: 110px;
  box-shadow: 0 10px 15px 0 rgba(0, 0, 0, 0.18);
  transition-duration: 0.5s;
}

.lft {
  left: 10px;
}

.rgt {
  right: 10px;
}

/* 5 随动按钮:切换题面/答案 */
/*-----------------------------------------------------------------*/
#switch-box {
  position: fixed;
  top: 63px;
  right: 50px;
}

/* 页面加载时展示 */
/*-----------------------------------------------------------------*/
#load-box {
  text-align: center;
}

#load-box > img {
  margin-top: 80px;
}
</style>


