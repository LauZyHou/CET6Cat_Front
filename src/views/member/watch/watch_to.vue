<template>
  <section>
    <div id="w-to">
      <el-table :data="fansList" border style="width: 100%" @row-click="onRowClick" align="center">
        <el-table-column prop="id" label="ID" width="180" align="center"></el-table-column>
        <el-table-column prop="name" label="昵称" width="700" align="center"></el-table-column>
      </el-table>
    </div>
  </section>
</template>

<script>
import { listMyFans } from "../../../api/api";

export default {
  name: "watch_to",
  data() {
    return {
      fansList: null
    };
  },
  created() {
    let id = this.$route.params.id;
    listMyFans(id)
      .then(res => {
        this.fansList = res.data;
      })
      .catch(error => {
        //fixme
        window.alert("出错");
      });
  },
  methods: {
    //点击某行时,打开相应的用户主页
    onRowClick(row, event, column) {
      let routeData = this.$router.resolve({
        path: "/app/member/users/" + row.id
      });
      window.open(routeData.href, "_blank");
    }
  },
  beforeRouteUpdate(to, from, next) {
    //在用户主页路由之间转移
    this.fansList = null;
    listMyFans(to.params.id)
      .then(res => {
        this.fansList = res.data;
      })
      .catch(error => {
        //fixme
        window.alert("出错");
      });
    next();
  }
};
</script>

<style scoped>
#w-to {
  width: 80%;
  margin: 0 auto;
  min-height: 463px;
  background-color: aliceblue;
  padding-top: 50px;
}
</style>