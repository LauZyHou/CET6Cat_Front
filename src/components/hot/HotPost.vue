<template>
  <div>
    <ul v-if="postList">
      <li v-for="p in postList" :key="p.id">
        <router-link :to="'/app/home/posts/'+p.id" target="_blank">{{p.name}}</router-link>
      </li>
    </ul>
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
  }
};
</script>

<style scoped>
</style>


