<template>
  <div id="t-listens">
    <!-- 1 标题 -->
    <h2>{{detail.name}}</h2>
    <!-- 2 内容 -->
    <div id="content">
      <pre>{{detail.first}}</pre>
    </div>
    <!-- 3 左侧的听力控制 -->
    <div id="control">
      <audio src="/static/audios/1.mp3" controls="controls">您的浏览器不支持</audio>
    </div>
    <!-- 4 两侧随动的答题卡 -->
    <!-- 4-1 左侧 -->
    <div class="answer-sheet lft">
      <h3>答题卡(1~15)</h3>
      <div v-for="i in 15" :key="i">
        {{ 10>i ? '0'+i : i }}
        <el-radio-group v-model="userCheck[i-1]" size="mini">
          <el-radio-button :label="0">A</el-radio-button>
          <el-radio-button :label="1">B</el-radio-button>
          <el-radio-button :label="2">C</el-radio-button>
          <el-radio-button :label="3">D</el-radio-button>
        </el-radio-group>
      </div>
    </div>
    <!-- 4-2 右侧 -->
    <div class="answer-sheet rgt">
      <h3>答题卡(16~25)</h3>
      <div v-for="i in 15" :key="i+15">
        {{ i+15>25 ? '--' : i+15 }}
        <!-- fixme 这里i>10是i+15>25的意思,具体要根据后台传来的题面上题目数目设置 -->
        <el-radio-group v-model="userCheck[i-1+15]" size="mini" :disabled="i>10">
          <el-radio-button :label="0">A</el-radio-button>
          <el-radio-button :label="1">B</el-radio-button>
          <el-radio-button :label="2">C</el-radio-button>
          <el-radio-button :label="3">D</el-radio-button>
        </el-radio-group>
      </div>
    </div>
  </div>
</template>

<script>
/* 听力测验:详情页 */

export default {
  name: "Tlistens",
  data() {
    return {
      detail: {
        name: "2019年第一套",
        first: "啊啊啊啊"
      },
      //用户对每一题的选项,null表示没选,最长长度为30(一套题大概25个选项)
      userCheck: [3, 1, 2]
    };
  }
};
</script>

<style scoped>
#t-listens {
  background-color: aliceblue;
  width: 970px;
  min-height: 750px;
  padding-bottom: 20px;
  margin: 0 auto;
  text-align: center;
  box-shadow: 0 10px 15px 0 rgba(0, 0, 0, 0.18);
  transition-duration: 0.5s;
}

/* 1 标题 */
/*-----------------------------------------------------------------*/
#t-listens > h2 {
  font-size: 25px;
}

/* 2 内容 */
/*-----------------------------------------------------------------*/

/* 3 左侧的听力控制 */
/*-----------------------------------------------------------------*/
#control {
  position: absolute;
  top: 70px;
  left: 200px;
  border: 1px solid brown;
  border-radius: 20px;
}

/* 4 两侧随动的答题卡 */
/*-----------------------------------------------------------------*/
.answer-sheet {
  position: fixed;
  background-color: aliceblue;
  top: 100px;
  box-shadow: 0 10px 15px 0 rgba(0, 0, 0, 0.18);
  transition-duration: 0.5s;
}

.lft {
  left: 10px;
}

.rgt {
  right: 10px;
}
</style>


