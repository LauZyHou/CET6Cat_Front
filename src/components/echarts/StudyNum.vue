<template>
  <div class="container">
    <div id="StudyNum" :style="{width: '1000px', height: '320px'}"></div>
  </div>
</template>
<script>
export default {
  name: "StudyNum",
  data() {
    return {};
  },
  mounted() {
    this.drawLine();
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
            ["看视频", 41.1, 30.4, 65.1, 53.3, 83.8, 98.7],
            ["逛论坛", 86.5, 92.1, 85.7, 83.1, 73.4, 55.1],
            ["读文章", 24.1, 67.2, 79.5, 86.4, 65.2, 82.5],
            ["看作文", 55.2, 67.1, 69.2, 72.4, 53.9, 39.1]
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