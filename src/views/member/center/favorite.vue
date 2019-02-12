<template>
  <div id="favorite">
    <!-- 1 小标题 -->
    <div id="tit">
      <el-row>
        <el-col :span="19">
          <h2>我的收藏{{titmore}}</h2>
        </el-col>
        <el-col :span="1">
          <a @click="only('all')">全部</a>
        </el-col>
        <el-col :span="1">
          <a @click="only('video')">视频</a>
        </el-col>
        <el-col :span="1">
          <a @click="only('post')">帖子</a>
        </el-col>
        <el-col :span="1">
          <a @click="only('reading')">阅读</a>
        </el-col>
        <el-col :span="1">
          <a @click="only('essay')">作文</a>
        </el-col>
      </el-row>
    </div>
    <!-- 2 收藏list -->
    <div id="fav-list">
      <el-row v-for="i in 10" :key="i">
        <el-col :span="20">
          <router-link to>2019英语六级词汇完全总结</router-link>
        </el-col>
        <!-- 2-2 收藏日期 -->
        <el-col :span="3" class="fav-date">2019-01-13</el-col>
        <!-- 2-3 取消收藏 -->
        <el-col :span="1" class="cancel">
          <a>取消</a>
        </el-col>
      </el-row>
    </div>
    <!-- 3 分页 -->
    <div class="pagination">
      <el-pagination layout="prev, pager, next" :total="50"></el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: "favorite",
  data() {
    return {
      titmore: ""
    };
  },
  methods: {
    only(s) {
      //TODO 实现过滤
      if (s === "all") {
        this.titmore = "";
      } else if (s === "video") {
        this.titmore = ">视频";
      } else if (s === "post") {
        this.titmore = ">帖子";
      } else if (s === "reading") {
        this.titmore = ">阅读";
      } else if (s === "essay") {
        this.titmore = ">作文";
      } else {
        this.titmore = s;
      }
    }
  }
};
</script>

<style scoped>
#favorite {
  padding: 20px 20px 0 20px;
}

/* 1 小标题 */
/*-----------------------------------------------------------------*/
#tit {
  height: 40px;
  border-bottom: 1px solid lightgray;
}

#tit + div {
  margin-top: 20px;
  min-height: 300px;
}

#tit a {
  color: #409eff;
  cursor: pointer;
}

#tit a:hover {
  background-color: blanchedalmond;
}

/* 2 收藏list */
/*-----------------------------------------------------------------*/
#fav-list {
  min-height: 200px;
  /* background-color: cornsilk; */
  font-size: 17px;
}

#fav-list > .el-row {
  height: 35px;
  margin-top: 10px;
  border-bottom: 1px solid lightgray;
}

/* 2-2 收藏日期 */
/*------------------------------------------------------*/
.fav-date {
  color: gray;
}

/* 2-3 取消收藏(设置警示色) */
/*------------------------------------------------------*/
.cancel a {
  color: dimgrey;
  cursor: pointer;
}

.cancel a:hover {
  color: firebrick;
}

/* 3 分页 */
/*-----------------------------------------------------------------*/

.pagination {
  background-color: white;
  width: 80%;
  height: 40px;
  margin: 10px auto 0;
  text-align: center;
}
</style>


