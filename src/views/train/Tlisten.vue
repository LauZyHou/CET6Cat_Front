<template>
  <div id="t-listen">
    <!-- 1 标题 -->
    <h2>从下方选择一套听力</h2>
    <!-- 2 听力资源list -->
    <el-table
      v-if="TlistenList"
      :data="TlistenList"
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
import { listAudio } from "../../api/api";

export default {
  name: "Tlisten",
  data() {
    return {
      TlistenList: null
      /*[
        {
          id: 1,
          name: "听力1"
        },
        {
          id: 2,
          name: "听力2"
        }
      ]*/
    };
  },
  methods: {
    //点击听力list表格中的某行时,新窗口打开相应的听力资源页
    onRowClick(row, event, column) {
      let routeData = this.$router.resolve({
        path: "/app/train/Tlistens/" + row.id
      });
      window.open(routeData.href, "_blank");
    }
  },
  created() {
    listAudio()
      .then(res => {
        this.TlistenList = res.data;
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
#t-listen {
  background-color: aliceblue;
  width: 1000px;
  min-height: 150px;
  padding-bottom: 20px;
  margin: 0 auto;
  text-align: center;
  box-shadow: 0 10px 15px 0 rgba(0, 0, 0, 0.18);
  transition-duration: 0.5s;
}

/* 1 标题 */
/*-----------------------------------------------------------------*/
#t-listen > h2 {
  font-size: 25px;
}

/* 3 页面加载时展示 */
/*-----------------------------------------------------------------*/
#load-box {
  text-align: center;
}

#load-box > img {
  margin-top: 10px;
}
</style>
