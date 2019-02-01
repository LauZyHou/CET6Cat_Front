<template>
  <footer><p>{{copyright}}</p></footer>
</template>

<script>
  export default {
    name: "foot",
    data() {
      return {
        copyright: "Copyright©2018-2019 Zhihao Liu at SHU"
      }
    }
  }
</script>

<style scoped>
  footer {
    background: rgb(84, 92, 100);
    height: 45px;
    padding-top: 25px;
  }

  p {
    color: white;
    text-align: center;
  }
</style>
