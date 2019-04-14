<template>
  <div id="s-global">
    <h2>用户</h2>
    <el-table :data="userList" border style="width: 100%" align="center">
      <el-table-column prop="id" label="ID" width="180" align="center"></el-table-column>
      <el-table-column prop="name" label="用户" width="700" align="center"></el-table-column>
    </el-table>
    <h2>文章</h2>
    <el-table :data="readingList" border style="width: 100%" align="center">
      <el-table-column prop="id" label="ID" width="180" align="center"></el-table-column>
      <el-table-column prop="name" label="文章" width="700" align="center"></el-table-column>
    </el-table>
    <h2>视频</h2>
    <el-table :data="videoList" border style="width: 100%" align="center">
      <el-table-column prop="id" label="ID" width="180" align="center"></el-table-column>
      <el-table-column prop="name" label="视频" width="700" align="center"></el-table-column>
    </el-table>
    <h2>帖子</h2>
    <el-table :data="postList" border style="width: 100%" align="center">
      <el-table-column prop="id" label="ID" width="180" align="center"></el-table-column>
      <el-table-column prop="name" label="帖子" width="700" align="center"></el-table-column>
    </el-table>
    <h2>作文</h2>
    <el-table :data="essayList" border style="width: 100%" align="center">
      <el-table-column prop="id" label="ID" width="180" align="center"></el-table-column>
      <el-table-column prop="name" label="作文" width="700" align="center"></el-table-column>
    </el-table>
  </div>
</template>

<script>
import { searchGlobal } from "../../api/api";

export default {
  name: "Sglobal",
  data() {
    return {
      userList: null,
      readingList: null,
      videoList: null,
      postList: null,
      essayList: null
    };
  },
  created() {
    //根据路由中的query(由head组件中查询按钮点击时传来)来向后台查询
    searchGlobal(this.$route.query.s)
      .then(res => {
        this.userList = res.data["users"];
        this.readingList = res.data["readings"];
        this.videoList = res.data["videos"];
        this.postList = res.data["posts"];
        this.essayList = res.data["essays"];
      })
      .catch(error => {
        window.alert("[error]搜索错误!");
      });
  }
};
</script>
<style scoped>
#s-global {
  width: 70%;
  margin: 0 auto;
  text-align: center;
}
</style>

