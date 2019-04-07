<template>
  <section>
    <!-- 1 标题 -->
    <div class="tit">
      <h2>背单词</h2>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/app/home/index' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>六级词汇</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!-- 2 主体容器 -->
    <div class="container" v-if="wordsList">
      <!-- <card></card> -->
      <!-- 2-1 背单词卡片(走马灯实现) -->
      <el-carousel
        :autoplay="auto"
        :interval="tranMs"
        type="card"
        height="200px"
        indicator-position="none"
        arrow="always"
      >
        <el-carousel-item v-for="w in wordsList" :key="w.id">
          <!-- <h3>{{ item }}</h3> -->
          <h2>{{ w.name }}</h2>
          <h3>{{ w.explain }}</h3>
        </el-carousel-item>
      </el-carousel>
      <!-- 2-2 操作 -->
      <br>
      <table>
        <tr>
          <td>
            <el-checkbox v-model="auto" label="自动切换" border></el-checkbox>
          </td>
          <td>
            切换间隔
            <input type="number" v-model="tranSec" :disabled="!auto">
            秒
          </td>
          <td>
            <el-button type="success" icon="el-icon-success" @click="onPunch">打卡</el-button>
          </td>
        </tr>
        <tr>
          <td>
            <el-button type="primary" icon="el-icon-arrow-up" @click="onPre">上一组</el-button>
          </td>
          <td>
            跳转至第
            <input type="number" v-model="groupNum">
            组
          </td>
          <td>
            <el-button type="primary" icon="el-icon-arrow-down" @click="onNext">下一组</el-button>
          </td>
        </tr>
      </table>
    </div>
    <!-- 3 页面加载时展示 -->
    <div v-else id="load-box" class="container">
      <img src="/static/loading.gif" alt="加载中">
    </div>
  </section>
</template>

<script>
import card from "./card";
import { getWords, getGroupNum, putPunch } from "../../../api/api";

export default {
  name: "word",
  data() {
    return {
      auto: true, //自动切换
      tranSec: 4, //切换间隔/秒
      groupNum: null, //当前背诵到的组号
      wordsList: null
    };
  },
  components: {
    card: card
  },
  computed: {
    //切换间隔:从秒计算毫秒
    tranMs() {
      return this.tranSec * 1000;
    }
  },
  methods: {
    //获取当前组号对应单词
    getWords() {
      getWords({ page: this.groupNum })
        .then(res => {
          this.wordsList = res.data.results;
        })
        .catch(error => {
          window.alert("获取单词失败");
        });
    },
    //去上一组
    onPre() {
      if (this.groupNum < 2) {
        window.alert("已经是第一组!");
      } else {
        this.wordsList = null;
        this.groupNum--;
        this.getWords();
      }
    },
    //去下一组
    onNext() {
      if (this.groupNum >= 103) {
        window.alert("已经是最后一组!");
      } else {
        this.wordsList = null;
        this.groupNum++;
        this.getWords();
      }
    },
    //打卡
    onPunch() {
      putPunch({ words_num: this.groupNum })
        .then(res => {
          window.alert(
            "打卡成功!\n姓名:" +
              res.data["name"] +
              "\n连续打卡:" +
              res.data["conti_punch"] +
              "\n最后打卡日期:" +
              res.data["last_punch"] +
              "\n背诵进度:" +
              res.data["words_num"] +
              "组"
          );
        })
        .catch(error => {
          window.alert("打卡失败!");
        });
    }
  },
  //只在该组件加载时调用一次,先获取组号再用组号获取这组20个单词
  created() {
    getGroupNum() //先调后端API获取组号
      .then(res => {
        this.groupNum = res.data["words_num"];
        this.getWords(); //当获取并写入成功了以后再去调用这个获取单词的method
      })
      .catch(error => {
        window.alert("todo获取组号失败");
      });
    // console.log("测试该钩子只执行了一次");
  }
};
</script>

<style scoped>
section {
  /* background-color: #ccff99; */
  padding-top: 20px;
  height: 100%;
}

/* 1 标题 */
/*-----------------------------------------------------------------*/

.tit {
  background-color: white;
  width: 80%;
  height: 50px;
  margin: 0 auto 20px;
  text-align: center;
}

/* 2 主体容器 & 加载容器 */
/*-----------------------------------------------------------------*/

.container {
  background-color: white;
  width: 80%;
  margin: 0 auto;
  min-height: 300px;
  margin-bottom: 40px;
}

/* 2-1 背单词卡片 */
/*-----------------------------------------------*/
.el-carousel__item {
  text-align: center;
}

.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}

/* 2-2 操作 */
/*-----------------------------------------------*/
table {
  font-size: 14px;
  width: 100%;
  text-align: center;
  vertical-align: center;
}

table input {
  width: 40px;
}

/* 3 加载容器 */
/*-----------------------------------------------------------------*/
#load-box {
  text-align: center;
}

#load-box > img {
  margin-top: 60px;
}
</style>
