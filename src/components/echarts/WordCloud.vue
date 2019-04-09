<template>
  <div id="myChart" :style="{width: '1000px', height: '280px'}"></div>
</template>
<script>
import { listWordCloud } from "../../api/api";

export default {
  name: "WordCloud",
  data() {
    return {};
  },
  mounted() {
    //获取词云数据并生成词云
    listWordCloud()
      .then(res => {
        this.drawLine(res.data);
      })
      .catch(errror => {
        window.alert("获取词云失败!");
      });
  },
  methods: {
    drawLine(wordCloudList) {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById("myChart"));
      // 绘制图表
      let option = {
        title: {
          //   text: "左上角标题",
          //   link: "http://localhost:8080/#/app/home/word/"
        },
        tooltip: {
          show: true
        },
        series: [
          {
            name: "六级单词",
            type: "wordCloud",
            size: ["100%", "100%"],
            textRotation: [0, 45, 90, -45],
            textPadding: 0,
            autoSize: {
              enable: true,
              minSize: 14
            },
            textStyle: {
              normal: {
                color: function() {
                  return (
                    "rgb(" +
                    Math.round(Math.random() * 160) +
                    ", " +
                    Math.round(Math.random() * 160) +
                    ", " +
                    Math.round(Math.random() * 160) +
                    ")"
                  );
                }
              }
            },
            data: wordCloudList
            /*
            [
                {
                    name: "xxx",
                    value: 250,
                },
            ]
            */
          }
        ]
      };

      // 为echarts对象加载数据
      myChart.setOption(option);
    }
  }
};
</script>
<style scoped>
#myChart {
  margin: 0 auto;
  /* background-color: azure; */
}
</style>

