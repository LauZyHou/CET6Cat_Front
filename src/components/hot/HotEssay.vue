<template>
  <div>
    <!-- <ul v-if="essayList">
      <li v-for="e in essayList" :key="e.id">
        <router-link :to="'/app/home/essays/'+e.id" target="_blank">{{e.name}}</router-link>
      </li>
    </ul>-->
    <el-table :data="essayList" stripe @row-click="onRowClick">
      <el-table-column prop="name" label="作文名称" width="846"></el-table-column>
      <el-table-column prop="add_time" label="上传时间" width="180"></el-table-column>
      <el-table-column prop="hot_value" label="热度" width="50"></el-table-column>
    </el-table>
  </div>
</template>

<script>
import { listHotEssay } from "../../api/api";

export default {
  name: "HotEssay",
  data() {
    return {
      essayList: null
    };
  },
  created() {
    listHotEssay()
      .then(res => {
        this.essayList = res.data;
      })
      .catch(error => {
        window.alert("获取热门作文失败!");
      });
  },
  methods: {
    //点击某行时,在新窗口打开相应帖子的链接
    onRowClick(row, column, event) {
      let routeData = this.$router.resolve({
        path: "/app/home/essays/" + row.id
      });
      window.open(routeData.href, "_blank");
    }
  }
};
</script>

<style scoped>
</style>


