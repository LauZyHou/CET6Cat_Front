<template>
  <div id="favorite">
    <!-- 1 小标题 -->
    <div id="tit">
      <el-row>
        <el-col :span="16">
          <h2>我的收藏</h2>
        </el-col>
        <el-col :span="2">
          <button>视频</button>
        </el-col>
        <el-col :span="2">
          <button>帖子</button>
        </el-col>
        <el-col :span="2">
          <button>阅读</button>
        </el-col>
        <el-col :span="2">
          <button>作文</button>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  name: "favorite"
};
</script>

<style scoped>
#favorite {
  padding: 20px;
}

/* 1 小标题 */
/*-----------------------------------------------------------------*/
#tit {
  height: 40px;
  border-bottom: 1px solid lightgray;
}

/* 2 内容 */
/*-----------------------------------------------------------------*/
#tit + div {
  margin-top: 20px;
  min-height: 300px;
}
</style>


