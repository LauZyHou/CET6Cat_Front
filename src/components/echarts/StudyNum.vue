<template>
  <div id="StudyNum" :style="{width: '1000px', height: '320px'}"></div>
</template>
<script>
import { getStudyNum } from "../../api/api";
export default {
  name: "StudyNum",
  data() {
    return {
      videos: ["看视频", 0, 0, 0, 0, 0, 0],
      forums: ["逛论坛", 0, 0, 0, 0, 0, 0],
      readings: ["读文章", 0, 0, 0, 0, 0, 0],
      essays: ["看作文", 0, 0, 0, 0, 0, 0]
    };
  },
  created() {
    getStudyNum()
      .then(res => {
        //当前周在循环队列的下一周是时间意义上的第一周
        let nextIdx = (res.data["week"] + 1) % 6;
        for (let i = 0; i < 6; i++) {
          this.videos[i + 1] = res.data["video"][(i + nextIdx) % 6];
          this.forums[i + 1] = res.data["forum"][(i + nextIdx) % 6];
          this.readings[i + 1] = res.data["reading"][(i + nextIdx) % 6];
          this.essays[i + 1] = res.data["essay"][(i + nextIdx) % 6];
        }
        this.drawLine();
      })
      .catch(error => {
        window.alert("[error]组件StudyNum的created钩子出错");
      });
  },
  methods: {
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById("StudyNum"));
      // 绘制图表
      let option = {
        legend: {},
        tooltip: {
          trigger: "axis",
          showContent: false
        },
        dataset: {
          source: [
            ["product", "上5周", "上4周", "上3周", "上2周", "上1周", "本周"],
            this.videos,
            this.forums,
            this.readings,
            this.essays
          ]
        },
        xAxis: { type: "category" },
        yAxis: { gridIndex: 0 },
        grid: { top: "55%" },
        series: [
          { type: "line", smooth: false, seriesLayoutBy: "row" },
          { type: "line", smooth: false, seriesLayoutBy: "row" },
          { type: "line", smooth: false, seriesLayoutBy: "row" },
          { type: "line", smooth: false, seriesLayoutBy: "row" },
          {
            type: "pie",
            id: "pie",
            radius: "30%",
            center: ["50%", "25%"],
            label: {
              formatter: "{b}: {@本周} ({d}%)"
            },
            encode: {
              itemName: "product",
              value: "本周",
              tooltip: "本周"
            }
          }
        ]
      };

      //绑定一个函数,当焦点发生变化时饼图改变
      myChart.on("updateAxisPointer", function(event) {
        var xAxisInfo = event.axesInfo[0];
        if (xAxisInfo) {
          var dimension = xAxisInfo.value + 1;
          myChart.setOption({
            series: {
              id: "pie",
              label: {
                formatter: "{b}: {@[" + dimension + "]} ({d}%)"
              },
              encode: {
                value: dimension,
                tooltip: dimension
              }
            }
          });
        }
      });

      // 为echarts对象加载数据
      myChart.setOption(option);
    }
  }
};
</script>
<style>
#StudyNum {
  margin: 0 auto;
}
</style>