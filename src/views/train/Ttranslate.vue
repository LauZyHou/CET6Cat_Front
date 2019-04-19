<template>
  <div id="t-translate">
    <!-- 1 标题 -->
    <h2>从下方选择一套翻译</h2>
    <!-- 2 翻译资源list -->
    <el-table
      v-if="TtranslateList"
      :data="TtranslateList"
      border
      style="width: 100%"
      @row-click="onRowClick"
      align="center"
    >
      <el-table-column prop="id" label="ID" width="180" align="center"></el-table-column>
      <el-table-column prop="name" label="听力" width="700" align="center"></el-table-column>
    </el-table>
    <!-- 3 页面加载时展示 -->
    <div v-else id="load-box">
      <img src="/static/loading.gif" alt="加载中">
    </div>
  </div>
</template>

<script>
import { listTranslate } from "../../api/api";

export default {
  name: "Ttranslate",
  data() {
    return {
      TtranslateList: null
    };
  },
  methods: {
    //点击翻译list表格中的某行时,新窗口打开相应的翻译资源页
    onRowClick(row, event, column) {
      let routeData = this.$router.resolve({
        path: "/app/train/Ttranslates/" + row.id
      });
      window.open(routeData.href, "_blank");
    }
  },
  created() {
    listTranslate()
      .then(res => {
        this.TtranslateList = res.data;
      })
      .catch(error => {
        if (null != error.response && null != error.response.data)
          window.alert(error.response.data);
        else window.alert("[error]出现非请求错误");
      });
  }
};
</script>


<style scoped>
#t-translate {
  background-color: aliceblue;
  width: 1000px;
  min-height: 150px;
  padding-bottom: 20px;
  margin: 0 auto;
  text-align: center;
  box-shadow: 0 10px 15px 0 rgba(0, 0, 0, 0.18);
  transition-duration: 0.5s;
}

h2 {
  font-size: 25px;
}
</style>
