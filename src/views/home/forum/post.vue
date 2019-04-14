<template>
  <section>
    <!-- 1 标题 -->
    <div class="tit">
      <h2>发帖</h2>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/app/home/index' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/app/home/forum/1' }">交流论坛</el-breadcrumb-item>
        <el-breadcrumb-item>发帖</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!-- 2 写发帖内容的容器 -->
    <div class="container">
      <el-form :model="form">
        <!-- 2-f1 分类和帖子标题 -->
        <el-row :gutter="10" class="padding-lr">
          <el-col :span="6">
            <el-select v-model="form.category" placeholder="分类">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-col>
          <el-col :span="18">
            <el-input placeholder="帖子标题" v-model="form.name" clearable></el-input>
          </el-col>
        </el-row>
        <br>
        <!-- 2-f2 帖子内容  -->
        <div class="padding-lr">
          <el-input
            type="textarea"
            :autosize="{ minRows: 10, maxRows: 24}"
            placeholder="请输入内容"
            v-model="form.content"
          ></el-input>
        </div>
        <br>
        <!-- 2-f3 操作 -->
        <el-row class="padding-lr">
          <el-col :span="2" :offset="16">
            <el-button type="primary" @click="onSubmit">发帖</el-button>
          </el-col>
          <el-col :span="6">
            <el-button type="info" @click="onClear">清空</el-button>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <!-- 3 -->
  </section>
</template>

<script>
import { addPost } from "../../../api/api";

export default {
  name: "post",
  data() {
    return {
      form: {
        name: null,
        content: null,
        category: null
      },
      options: [
        {
          value: 1,
          label: "求助"
        },
        {
          value: 2,
          label: "分享"
        },
        {
          value: 3,
          label: "综合"
        },
        {
          value: 4,
          label: "闲聊"
        }
      ],
      value: ""
    };
  },
  methods: {
    //点击[发帖]按钮
    onSubmit() {
      var that = this;
      if (null === this.form.name || 0 === this.form.name.length)
        window.alert("缺少标题");
      else if (null === this.form.category || 0 === this.form.category.length)
        window.alert("缺少类别");
      else if (null === this.form.content || 0 === this.form.content.length)
        window.alert("缺少内容");
      else {
        addPost(this.form)
          .then(res => {
            window.alert("发帖成功!");
            //跳转到帖子页
            that.$router.push({ path: "/app/home/posts/" + res.data["id"] });
          })
          .catch(error => {
            window.alert("发帖失败!");
          });
      }
    },
    onClear() {
      this.form.name = this.form.category = this.form.content = null;
    }
  }
};
</script>

<style scoped>
section {
  /* background-color: #ccff99; */
  /* height: 1600px; */
  padding-top: 20px;
  padding-bottom: 20px;
}
/*-----------------------------------------------------------------*/

.tit {
  background-color: white;
  width: 80%;
  height: 50px;
  margin: 0 auto 20px;
  text-align: center;
  border-radius: 5px;
}

/*-----------------------------------------------------------------*/

.container {
  background-color: white;
  width: 80%;
  margin: 0 auto;
  /* height: 800px; */
  padding: 10px 0 10px;
  border-radius: 5px;
}

.padding-lr {
  padding: 0 10px 0;
}
</style>


