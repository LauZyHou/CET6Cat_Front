<template>
  <section>
    <div>
      <!-- 1 提示 -->
      <div id="tit">
        <span>请选择充值额度</span>
      </div>
      <!-- 2 充值选项 -->
      <ul>
        <li
          v-for="(a,index) in amounts"
          :key="a.rmb"
          @click="select(index)"
          :class="{'is-active':selected===index}"
        >
          <h1>{{a.catb}}</h1>
          <h2>￥{{a.rmb}}</h2>
        </li>
      </ul>
      <!-- 3 下一步 -->
      <div id="next">
        <!-- {{amounts[selected].catb}}Cat币，充值给{{userprofile.name}} -->
        <el-button type="success" :disabled="selected<0 || selected>5">下一步</el-button>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "prepaid",
  data() {
    return {
      amounts: [
        { rmb: 1, catb: 10 },
        { rmb: 5, catb: 50 },
        { rmb: 10, catb: 105 },
        { rmb: 30, catb: 320 },
        { rmb: 50, catb: 550 },
        { rmb: 100, catb: 1111 }
      ],
      selected: -1,
      userprofile: {
        name: "LauZyHou"
      }
    };
  },
  methods: {
    select(i) {
      this.selected = i;
    }
  }
};
</script>

<style scoped>
section {
  min-height: 492px;
  background-color: #ccff99;
  padding-top: 20px;
  /* padding-bottom: 20px; */
}

section > div {
  width: 80%;
  height: 480px;
  background-color: white;
  margin: 0 auto;
  text-align: center;
}

/* 1 提示 */
/*-----------------------------------------------------------------*/
#tit > span {
  font-size: 20px;
}

/* 2 充值选项 */
/*-----------------------------------------------------------------*/
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
  height: 120px;
  text-align: center;
  padding: 30px;
  border: 1px solid #222;
  margin: 10px;
}

/* 选中 */
.is-active {
    background-color: rgb(192, 228, 192);
}

/* 字体 */
h1 {
  font-size: 60px;
}
h2 {
  font-size: 20px;
  color: orange;
}
</style>


