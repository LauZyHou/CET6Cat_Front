<template>
  <el-row>
    <!-- 1 回帖数目 -->
    <el-col :span="3">{{replyNum}}</el-col>
    <!-- 2 帖子标题链接+摘要 -->
    <el-col :span="16">
      <router-link :to="path">{{post.title}}</router-link>
      <br>
      {{summary}}...
    </el-col>
    <!-- 3 发帖人+最后回帖人 -->
    <el-col :span="3">
      <p>{{post.poster.name}}</p>
      <br>
      <p v-if="lastReply">{{lastReply.replyer.name}}</p>
      <p v-else>没有回帖</p>
    </el-col>
    <!-- 4 最后盖楼时间 -->
    <el-col :span="2">
        <template v-if="lastReply">
            {{lastReply.time | formatDate}}
        </template>
        <template v-else>
            {{post.time | formatDate}}
        </template>
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
    return {
    };
  },
  computed: {
    path() {
      return "/app/home/posts/" + this.post.id;
    },
    replyNum() {
      return this.post.replies.length;
    },
    summary() {
      //FIXME 取前面一部分
      return this.post.content;
    },
    lastReply() {
      //找时间最晚的那条
      let allReplies = this.post.replies;
      if (allReplies.length === 0) {
        return null; //没有回帖
      }
      let lastReplyIndex = 0;
      for (let i = 1; i < allReplies.length; i++) {
        if (allReplies[i].time > allReplies[lastReplyIndex].time) {
          lastReplyIndex = i;
        }
      }
      // console.log(allReplies[0],allReplies[1],lastReplyIndex);
      return allReplies[lastReplyIndex];
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
</style>


