<template>
  <div id="favorite">
    <!-- 1 小标题 -->
    <div id="tit">
      <el-row>
        <el-col :span="20">
          <h2>我的收藏{{titmore}}</h2>
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
    <div id="fav-list" v-if="favList">
      <el-row v-for="fav in favList" :key="fav.id">
        <el-col :span="17">
          <router-link :to="'/app/home/'+now_s+'s/'+fav.base.id" target="_blank">{{fav.base.name}}</router-link>
        </el-col>
        <!-- 2-2 收藏日期 -->
        <el-col :span="5" class="fav-date">{{fav.add_time | formatDate}}</el-col>
        <!-- 2-3 取消收藏 -->
        <el-col :span="2" class="cancel">
          <a @click="onDelFav(fav.base.id)">移除</a>
        </el-col>
      </el-row>
    </div>
    <!-- 2.5 页面加载时展示 -->
    <div v-else id="load-box">
      <img src="/static/loading.gif" alt="加载中">
    </div>
    <!-- 3 分页 -->
    <div class="pagination">
      <el-pagination
        ref="pagination"
        background
        layout="prev, pager, next"
        :total="count"
        :current-page="page"
        :page-size="6"
        @current-change="pageChange"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import {
  listFavVideo,
  listFavPost,
  listFavReading,
  listFavEssay,
  delFavVideo,
  delFavPost,
  delFavReading,
  delFavEssay
} from "../../../api/api";
import cookie from "../../../static/js/cookie";
import { formatDate } from "../../../static/js/date";

export default {
  name: "favorite",
  data() {
    return {
      now_s: "video",
      titmore: ">视频",
      favList: null,
      count: 0, //总条目数
      nextPage: "", //上一页
      prePage: "", //下一页
      page: 1 //初始页为1
    };
  },
  methods: {
    //对获得的分页数据存储在data中
    stoInData(res_dt) {
      this.favList = res_dt["results"];
      this.count = res_dt["count"];
      this.nextPage = res_dt["next"];
      this.prePage = res_dt["previous"];
    },
    //点击某个收藏类型时
    only(s) {
      this.favList = null;
      //记录当前切换到了哪个标签,用于后续下一页上一页
      this.now_s = s;
      //根据切换到的标签请求不同收藏的第一页(默认就是第一页)
      if (s === "video") {
        this.titmore = ">视频";
        listFavVideo().then(res => {
          this.stoInData(res["data"]);
        });
      } else if (s === "post") {
        this.titmore = ">帖子";
        listFavPost().then(res => {
          this.stoInData(res["data"]);
        });
      } else if (s === "reading") {
        this.titmore = ">阅读";
        listFavReading().then(res => {
          this.stoInData(res["data"]);
        });
      } else if (s === "essay") {
        this.titmore = ">作文";
        listFavEssay().then(res => {
          this.stoInData(res["data"]);
        });
      } else {
        window.alert("无效的收藏名称,在only方法中将其添加");
      }
    },
    //改变页码时请求那一页的list
    pageChange(val) {
      this.favList = null;
      this.$axios.get("/api/fav" + this.now_s + "/?page=" + val).then(res => {
        this.stoInData(res["data"]);
      });
    },
    //取消收藏.根据当前所在的类别标签不同,调用的接口不同
    onDelFav(id) {
      let delFav = null;
      switch (this.now_s) {
        case "video":
          delFav = delFavVideo;
          break;
        case "post":
          delFav = delFavPost;
          break;
        case "reading":
          delFav = delFavReading;
          break;
        case "essay":
          delFav = delFavEssay;
          break;
        default:
          return;
      }
      delFav({ id: id })
        .then(res => {
          window.alert("取消收藏成功!");
          this.pageChange(this.page); //重新获取这一页
        })
        .catch(error => {
          window.alert("[error]取消收藏失败!");
        });
    }
  },
  created() {
    //默认展示[收藏视频]
    listFavVideo().then(res => {
      this.stoInData(res["data"]);
    });
  },
  filters: {
    //用于add_time字段的过滤器
    formatDate(time) {
      var date = new Date(time); //Mon Jan 19 1970 01:28:27 GMT+0800 (中国标准时间)
      return formatDate(date, "yyyy-MM-dd hh:mm");
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

/* 2.5 页面加载时展示 */
/*-----------------------------------------------------------------*/
#load-box {
  text-align: center;
}

#load-box > img {
  margin-top: 60px;
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


