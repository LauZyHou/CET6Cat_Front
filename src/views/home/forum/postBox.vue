<template>
  <el-row>
    <!-- 1 回帖数目 -->
    <el-col :span="3">{{replyNum}}</el-col>
    <!-- 2 帖子标题链接+摘要 -->
    <el-col :span="14">
      <router-link :to="path" target="_blank" style="font-size: 30px;">{{post.name}}</router-link>
    </el-col>
    <!-- 3 发帖人+最后回帖人 -->
    <el-col :span="3">
      <p>{{post.uper.name}}</p>
      <br>
      <p v-if="lastReply">{{lastReply.uper.name}}</p>
      <p v-else>没有回帖</p>
    </el-col>
    <!-- 4 最后盖楼时间 -->
    <el-col :span="4" style="font-size: 20px;">
      <template v-if="lastReply">{{lastReply.add_time | formatDate}}</template>
      <template v-else>{{post.add_time | formatDate}}</template>
    </el-col>
  </el-row>
</template>

<script>
import { formatDate } from "../../../static/js/date.js";

export default {
  name: "postBox",
  props: {
    post: {
      type: Object,
      required: true
    }
  },
  data() {
    return {};
  },
  computed: {
    path() {
      return "/app/home/posts/" + this.post.id;
    },
    replyNum() {
      return this.post.replies.length;
    },
    lastReply() {
      //找时间最晚的那条
      //服务器返回的是按自增id排序的,所以一定是最后一条
      let allReplies = this.post.replies;
      if (allReplies.length === 0) {
        return null; //没有回帖
      }
      /*
      let lastReplyIndex = 0;
      for (let i = 1; i < allReplies.length; i++) {
        if (allReplies[i].time > allReplies[lastReplyIndex].time) {
          lastReplyIndex = i;
        }
      }
      // console.log(allReplies[0],allReplies[1],lastReplyIndex);
      return allReplies[lastReplyIndex];
      */
      return allReplies[allReplies.length - 1];
    }
  },
  filters: {
    formatDate(time) {
      var date = new Date(time); //Mon Jan 19 1970 01:28:27 GMT+0800 (中国标准时间)
      return formatDate(date, "yyyy-MM-dd hh:mm");
    }
  }
};
</script>

<style scoped>
.el-row {
  font-size: 15px;
  background-color: rgb(212, 237, 238);
}
</style>


