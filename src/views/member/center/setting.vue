<template>
  <div id="setting">
    <!-- 1 小标题 -->
    <div id="tit">
      <h2>设置</h2>
    </div>
    <!-- 2 设置详情 -->
    <div id="set-detail">
      <!-- 2-1 -->
      <span>单词切换间隔（秒）：</span>
      <el-input-number v-model="switchSec" @change="handleChange" :min="1" :max="10" label="描述文字"></el-input-number>
      <!-- 2-2 -->
      <br>
      <br>
      <span>邮箱通知：</span>
      <el-switch v-model="msgPush" active-color="#13ce66" inactive-color="#aaa"></el-switch>
      &nbsp;&nbsp;&nbsp;&nbsp;<a @click="bindEmail">绑定邮箱</a>
    </div>
  </div>
</template>

<script>
export default {
  name: "setting",
  data() {
    return {
      switchSec: 4,
      msgPush: true
    };
  },
  methods: {
    bindEmail() {
      //TODO
      window.alert("绑定邮箱");
    }
  }
};
</script>

<style scoped>
#setting {
  padding: 20px;
}

/* 1 小标题 */
/*-----------------------------------------------------------------*/
#tit {
  height: 40px;
  border-bottom: 1px solid lightgray;
}

/* 2 设置详情 */
#set-detail {
  min-height: 200px;
  /* background-color: cornsilk; */
  padding: 10px 20px 0;
}

#set-detail > span {
  font-size: 17px;
}

#set-detail > a {
  color: #409eff;
  cursor: pointer;
}

#set-detail > a:hover {
  color: blue;
}
</style>


