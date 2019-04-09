<template>
  <div>
    <ul v-if="readingList">
      <li v-for="r in readingList" :key="r.id">
        <!-- fixme 这里papaers以后要改掉 -->
        <router-link :to="'/app/home/papers/'+r.id" target="_blank">{{r.name}}</router-link>
      </li>
    </ul>
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
  }
};
</script>

<style scoped>
</style>


