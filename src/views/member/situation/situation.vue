<template>
  <div>
    <div class="chart-box">
      <word-cloud></word-cloud>
    </div>
    <div class="chart-box">
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
.chart-box{
  min-height: 400px;
}
</style>

