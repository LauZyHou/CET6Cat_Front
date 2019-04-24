<template>
  <div id="t-word" v-if="TwordList">
    <!-- 1 单词名(选择该组正确的单词的name) -->
    <h2>{{TwordList[nowIndex].check[TwordList[nowIndex].correct].name}}</h2>
    <!-- 2 进度条 -->
    <el-progress
      :text-inside="true"
      :stroke-width="14"
      :percentage="(nowIndex+1)*10"
      :status="nowIndex==9?'success':null"
    ></el-progress>
    <br>
    <!-- 3 四个选项 -->
    <el-table
      ref="singleTable"
      :data="TwordList[nowIndex].check"
      style="width: 100%"
      highlight-current-row
      align="center"
      height="309"
    >
      <el-table-column type="index" width="100"></el-table-column>
      <!-- 如果已经交卷了,就可以看答案(name列) -->
      <template v-if="isUpload">
        <el-table-column prop="name" label="单词" width="400" align="center"></el-table-column>
        <el-table-column label="释义" width="450" align="center">
          <template slot-scope="scope">
            <!-- 将正确的标记为绿色,其它为红色 -->
            <el-tag
              :type="scope.$index===TwordList[nowIndex].correct?'success':'danger'"
            >{{scope.row.explain}}</el-tag>
          </template>
        </el-table-column>
      </template>
      <!-- 否则,在测验状态,只能去选择释义 -->
      <template v-else>
        <el-table-column prop="explain" label="请选择释义" width="750" align="center"></el-table-column>
        <!-- [bug解决]ElementUI的表格通过循环产生,Vue在DOM重新渲染时有性能优化(相同DOM被复用),这里通过key标识当前行唯一不许复用 -->
        <el-table-column label="选择" width="100" align="center" :key="666">
          <template slot-scope="scope">
            <el-button type="danger" plain @click="onSelect(scope.$index)">选择</el-button>
          </template>
        </el-table-column>
      </template>
    </el-table>
    <br>
    <!-- 4 上一词/下一词按钮 -->
    <el-row>
      <!-- 左列 -->
      <el-col :span="12">
        <!-- 按钮:上一词 -->
        <el-button
          type="primary"
          icon="el-icon-arrow-left"
          @click="onPre"
          :disabled="nowIndex<=0"
        >上一词</el-button>
      </el-col>
      <!-- 右列 -->
      <el-col :span="12">
        <!-- 套一个小红点 -->
        <el-badge :is-dot="nowIndex>=9 && !isUpload">
          <!-- 按钮:下一词/交卷 -->
          <el-button
            :type="nowIndex>=9?'success':'primary'"
            @click="onNext"
            :disabled="nowIndex>=9 && isUpload"
          >
            {{ nowIndex>=9?(isUpload?'已交卷':'交&nbsp;&nbsp;&nbsp;卷'):'下一词' }}
            <!-- 没到最后一页时,显示下一页的右箭头 -->
            <i v-if="nowIndex<9" class="el-icon-arrow-right el-icon--right"></i>
            <!-- 已经在最后一页时,显示交卷的上传箭头 -->
            <i v-else class="el-icon-upload2 el-icon--right"></i>
          </el-button>
        </el-badge>
      </el-col>
    </el-row>
  </div>
  <!-- 页面加载时展示 -->
  <div v-else id="load-box">
    <img src="/static/loading.gif" alt="加载中">
  </div>
</template>

<script>
import { listTword, addFaultTWord } from "../../api/api";

export default {
  name: "Tword",
  data() {
    return {
      //请求后台得到的10个单词*4个解释,带正确项下标的列表
      TwordList: null,
      /*
      [ {
          correct: 2,
          check: [
            {
              name: "nnn",
              explain: "解释1"
            },
            {
              name: "nnn",
              explain: "解释1"
            },
            {
              name: "nnn",
              explain: "正确选项"
            },
            {
              name: "nnn",
              explain: "解释1"
            }
          ]
        },
        {
          correct: 3,
          check: [
            {
              name: "nnn",
              explain: "解释1"
            },
            {
              name: "nnn",
              explain: "解释1"
            },
            {
              name: "nnn",
              explain: "解释2"
            },
            {
              name: "nnn",
              explain: "正确选项"
            }
          ]
        }
      ]*/
      nowIndex: 0, //一共10个单词,当前所在单词的索引(0~9)
      isUpload: false, //是否已交卷
      //用户对每一题的选项,null表示没选
      userCheck: [null, null, null, null, null, null, null, null, null, null]
    };
  },
  methods: {
    /** 配套v-on留存,以下两个methods暂不使用
     * @current-change="handleCurrentChange"
     * @row-click="onRowClick"
     */
    //当改变选中的行时,记录改变至的那一行
    //[not-use]不使用这个做回调了!因为当触发去上一词/下一词时也会触发这个方法!显然那时不应该改变记录
    handleCurrentChange(val) {
      //   this.userCheck[this.nowIndex] = val;
    },
    //当点击某行时,记录点击(选择)的那一行
    //[not-use]不使用这个了!因为没法获取到行的索引,row.id只能获得那一行的id属性(如果有)
    onRowClick(row, event, column) {},
    //在测验模式下点击右侧的选择按钮
    onSelect(rowIndex) {
      this.userCheck[this.nowIndex] = rowIndex;
    },
    //去上一词
    onPre() {
      if (this.nowIndex <= 0) {
        window.alert("已经是第一词!");
      } else {
        this.nowIndex -= 1;
        //表格中选中用户之前选的那一行
        let rowIdx = this.userCheck[this.nowIndex];
        if (rowIdx != null)
          this.$refs.singleTable.setCurrentRow(
            this.TwordList[this.nowIndex].check[rowIdx]
          );
      }
    },
    //去下一词/上传答卷
    onNext() {
      //上传答卷
      if (this.nowIndex >= 9) {
        //存10个数字(单词id)的数组,即最多错10个单词
        let retArray = new Array(10);
        let j = 0;
        //检查用户的选项
        for (let i = 0; i < 10; i++) {
          let item = this.TwordList[i];
          if (item.correct !== this.userCheck[i]) {
            //发现单词选错了,将其加入数组中
            retArray[j++] = item.check[item.correct].id;
          }
        }
        //上传答卷
        addFaultTWord({ faultWords: retArray })
          .then(res => {
            this.isUpload = true;
            this.$message({
              message: "答卷上传成功!CET6Cat已经记录您本次测验的错误单词。",
              type: "success"
            });
          })
          .catch(error => {
            this.$message({
              message: "答卷上传失败!请检查网络连接。",
              type: "error"
            });
          });
      }
      //去下一词
      else {
        this.nowIndex += 1;
        //表格中选中用户之前选的那一行
        let rowIdx = this.userCheck[this.nowIndex];
        if (rowIdx != null)
          this.$refs.singleTable.setCurrentRow(
            this.TwordList[this.nowIndex].check[rowIdx]
          );
      }
    }
  },
  created() {
    //页面加载时调用后端API组卷
    listTword()
      .then(res => {
        this.TwordList = res.data;
      })
      .catch(error => {
        window.alert("组卷失败!");
      });
  }
};
</script>

<style scoped>
#t-word {
  background-color: aliceblue;
  width: 1000px;
  height: 450px;
  margin: 0 auto;
  text-align: center;
  box-shadow: 0 10px 15px 0 rgba(0, 0, 0, 0.18);
  transition-duration: 0.5s;
}

h2 {
  font-size: 25px;
}

/* 页面加载时展示 */
/*-----------------------------------------------------------------*/
#load-box {
  margin-top: 60px;
  height: 300px;
  text-align: center;
}

#load-box > img {
  margin-top: 60px;
}
</style>


