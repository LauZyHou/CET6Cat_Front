<template>
  <div id="WordCloud" :style="{width: '1000px', height: '280px'}"></div>
</template>
<script>
import { listWordCloud, getFaultWord } from "../../api/api";

export default {
  name: "WordCloud",
  data() {
    return {};
  },
  props: {
    //父组件使用时传递此值:1->当前用户的测验常错词,0/其它->随机
    kind: {
      type: Number,
      required: true
    }
  },
  mounted() {
    //根据父组件传递来的类型,获取单词数据并生成词云
    switch (this.kind) {
      case 1:
        getFaultWord()
          .then(res => {
            this.drawLine(res.data);
          })
          .catch(error => {
            window.alert("获取错误单词失败!");
          });
        break;
      case 0:
      default:
        listWordCloud()
          .then(res => {
            this.drawLine(res.data);
          })
          .catch(errror => {
            window.alert("获取词云失败!");
          });
    }
  },
  methods: {
    drawLine(wordCloudList) {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById("WordCloud"));
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
#WordCloud {
  margin: 0 auto;
  /* background-color: azure; */
}
</style>

