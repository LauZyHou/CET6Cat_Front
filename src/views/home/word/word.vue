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
    <div class="container">
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
        <el-carousel-item v-for="item in 20" :key="item">
          <!-- <h3>{{ item }}</h3> -->
          <h2>imprinter</h2>
          <h3>n.印刷机,压印机</h3>
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
            <el-button type="success" icon="el-icon-success">打卡</el-button>
          </td>
        </tr>
        <tr>
          <td>
            <el-button type="primary" icon="el-icon-arrow-up">上一组</el-button>
          </td>
          <td>
            跳转至第
            <input type="number" v-model="wordGroup">
            组
          </td>
          <td>
            <el-button type="primary" icon="el-icon-arrow-down">下一组</el-button>
          </td>
        </tr>
      </table>
    </div>
  </section>
</template>

<script>
import card from "./card";

export default {
  name: "word",
  data() {
    return {
      auto: true, //自动切换
      tranSec: 4, //切换间隔:秒
      wordGroup: 1
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
  }
};
</script>

<style scoped>
section {
  background-color: #ccff99;
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

/* 2 主体容器 */
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
</style>
