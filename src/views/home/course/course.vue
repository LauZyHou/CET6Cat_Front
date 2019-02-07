<template>
  <section>
    <!-- 1 标题 -->
    <div class="tit">
      <h2>在线视频</h2>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/app/home/index' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>在线视频</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!-- 2 课程的容器 -->
    <div class="container">
      <ul>
        <li v-for="c in courses">
          <router-link :to="'/app/home/videos/'+c.id">{{c.id}}</router-link>
        </li>
      </ul>
    </div>
    <!-- 3 分页 -->
    <div class="pagination">
      <el-pagination background layout="prev, pager, next" :total="1000"></el-pagination>
    </div>
  </section>
</template>

<script>
export default {
  name: "course",
  data() {
    return {
      courses: [
        { id: 1, name: "c" },
        { id: 2, name: "c" },
        { id: 3, name: "c" },
        { id: 4, name: "c" },
        { id: 5, name: "c" },
        { id: 6, name: "c" },
        { id: 7, name: "c" }
      ]
    };
  }
};
</script>

<style scoped>
section {
  background-color: #ccff99;
  padding-top: 20px;
}

/* 1 标题 */
/*-----------------------------------------------------------------*/

.tit {
  background-color: white;
  width: 80%;
  height: 50px;
  margin: 0 auto 20px;
  text-align: center;
}

/* 2 课程的容器 */
/*-----------------------------------------------------------------*/
.container {
  background-color: white;
  width: 80%;
  margin: 0 auto;
  padding-top: 10px;
  padding-bottom: 10px;
  /*border-box定义的盒子,不会随着padding和boder的加入而增大盒子的占用空间*/
  box-sizing: border-box;
}

ul {
  /*弹性布局*/
  display: flex;
  /*弹性元素在必要时换行*/
  flex-wrap: wrap;
  /*清除列表标记项的类型*/
  list-style-type: none;
  padding: 0;
}

li {
  /*当父元素的宽度大于所有子元素的宽度的和时,索取剩余空间*/
  flex-grow: 1;
  /*弹性元素的原始宽度*/
  flex-basis: 140px;
  text-align: center;
  /* padding: 30px; */
  min-width: 200px;
  height: 150px;
  border: 1px solid #222;
  margin: 10px;
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
