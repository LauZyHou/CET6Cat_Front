<template>
  <el-row>
    <!-- 1 文章名+摘要 -->
    <el-col :span="22">
      <router-link :to="'/app/home/essays/'+essay.id">{{essay.name}}</router-link>
      <br>
      summary作废
    </el-col>
    <!-- 2 发布时间 -->
    <el-col :span="2">{{essay.add_time | formatDate}}</el-col>
  </el-row>
</template>

<script>
import { formatDate } from "../../../static/js/date.js";

export default {
  name: "essayBox",
  props: {
    essay: {
      type: Object,
      required: true
    }
  },
  filters: {
    formatDate(time) {
      var date = new Date(time); //Mon Jan 19 1970 01:28:27 GMT+0800 (中国标准时间)
      return formatDate(date, "yyyy-MM-dd hh:mm");
    }
  },
  computed: {
    /*
    summary() {
      //FIXME 取前面一部分
      return this.essay.content;
    }
    */
  }
};
</script>

<style scoped>
</style>


