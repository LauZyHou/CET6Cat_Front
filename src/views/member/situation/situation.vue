<template>
  <div>
    <div class="chart-box">
      <h2>我经常错的单词</h2>
      <word-cloud :kind="1"></word-cloud>
    </div>
    <div class="chart-box">
      <h2>我的近六周活跃情况</h2>
      <study-num></study-num>
    </div>
  </div>
</template>

<script>
import WordCloud from "../../../components/echarts/WordCloud";
import StudyNum from "../../../components/echarts/StudyNum";

export default {
  name: "situation",
  data() {
    return {};
  },
  components: {
    "word-cloud": WordCloud,
    "study-num": StudyNum
  }
};
</script>

<style scoped>
.chart-box {
  min-height: 307px;
  /* background-color: antiquewhite; */
}

.chart-box > h2 {
  text-align: center;
  background-color: aliceblue;
}
</style>

