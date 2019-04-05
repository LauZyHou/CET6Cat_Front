<template>
  <section>
    <div class="clearfix">
      <!-- 1 左侧竖直导航栏 -->
      <div class="fl">
        <el-menu
          default-active="/app/member/center/profile"
          class="el-menu-vertical-demo"
          :router="true"
        >
          <el-menu-item index="/app/member/center/profile">
            <i class="el-icon-menu"></i>
            <span slot="title">个人资料</span>
          </el-menu-item>
          <el-menu-item index="/app/member/center/favorite">
            <i class="el-icon-star-on"></i>
            <span slot="title">我的收藏</span>
          </el-menu-item>
          <el-menu-item index="/app/member/center/vip" disabled>
            <i class="el-icon-service"></i>
            <span slot="title">VIP服务</span>
          </el-menu-item>
          <el-menu-item index="/app/member/center/setting">
            <i class="el-icon-setting"></i>
            <span slot="title">设置</span>
          </el-menu-item>
        </el-menu>
      </div>
      <!-- 2 右侧切到不同的视图 -->
      <div class="fr">
        <router-view></router-view>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "center",
  methods: {}
};
</script>


<style scoped>
section {
  min-height: 472px;
  background-color: #ccff99;
  padding-top: 20px;
  padding-bottom: 20px;
}

section > div {
  width: 80%;
  margin: 0 auto;
}

/* 1 左侧竖直导航栏 */
/*-----------------------------------------------------------------*/
.clearfix > .fl {
  width: 20%;
  box-shadow: 0 10px 15px 0 rgba(0, 0, 0, 0.18);
}
/* 2 右侧切到不同的视图 */
/*-----------------------------------------------------------------*/
.clearfix > .fr {
  min-height: 450px;
  width: 80%;
  background-color: white;
  box-shadow: 0 10px 15px 0 rgba(0, 0, 0, 0.18);
}
</style>




