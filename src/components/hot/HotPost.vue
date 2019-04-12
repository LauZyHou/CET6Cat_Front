<template>
  <div>
    <!-- <ul v-if="postList">
      <li v-for="p in postList" :key="p.id">
        <router-link :to="'/app/home/posts/'+p.id" target="_blank">{{p.name}}</router-link>
      </li>
    </ul>-->
    <el-table :data="postList" stripe @row-click="onRowClick">
      <el-table-column prop="name" label="帖子名称" width="746"></el-table-column>
      <el-table-column prop="category" label="帖子类别" width="50"></el-table-column>
      <el-table-column prop="uper" label="发帖人" width="50"></el-table-column>
      <el-table-column prop="add_time" label="发帖时间" width="180"></el-table-column>
      <el-table-column prop="hot_value" label="热度" width="50"></el-table-column>
    </el-table>
  </div>
</template>

<script>
import { listHotPost } from "../../api/api";

export default {
  name: "HotPost",
  data() {
    return {
      postList: null
    };
  },
  created() {
    listHotPost()
      .then(res => {
        this.postList = res.data;
      })
      .catch(error => {
        window.alert("获取热门帖子失败!");
      });
  },
  methods: {
    //点击某行时,在新窗口打开相应帖子的链接
    onRowClick(row, column, event) {
      let routeData = this.$router.resolve({
        path: "/app/home/posts/" + row.id
      });
      window.open(routeData.href, "_blank");
    }
  }
};
</script>

<style scoped>
</style>


