<template>
  <div>
    <!-- fixme 这里papaers以后要改掉 -->
    <!-- <ul v-if="readingList">
      <li v-for="r in readingList" :key="r.id">
        <router-link :to="'/app/home/papers/'+r.id" target="_blank">{{r.name}}</router-link>
      </li>
    </ul>-->
    <el-table :data="readingList" stripe @row-click="onRowClick">
      <el-table-column prop="name" label="文章名称" width="846"></el-table-column>
      <el-table-column prop="add_time" label="上传时间" width="180"></el-table-column>
      <el-table-column prop="hot_value" label="热度" width="50"></el-table-column>
    </el-table>
  </div>
</template>

<script>
import { listHotReading } from "../../api/api";

export default {
  name: "HotReading",
  data() {
    return {
      readingList: null
    };
  },
  created() {
    listHotReading()
      .then(res => {
        this.readingList = res.data;
      })
      .catch(error => {
        window.alert("获取热门文章失败!");
      });
  },
  methods: {
    //点击某行时,在新窗口打开相应帖子的链接
    //fixme papers这个路由名字要改掉
    onRowClick(row, event, column) {
      let routeData = this.$router.resolve({
        path: "/app/home/readings/" + row.id
      });
      window.open(routeData.href, "_blank");
    }
  }
};
</script>

<style scoped>
</style>


