<template>
  <div>
    <ul v-if="essayList">
      <li v-for="e in essayList" :key="e.id">
        <router-link :to="'/app/home/essays/'+e.id" target="_blank">{{e.name}}</router-link>
      </li>
    </ul>
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
  }
};
</script>

<style scoped>
</style>


