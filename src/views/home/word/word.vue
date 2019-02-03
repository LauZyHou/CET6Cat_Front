<template>
  <div id="word">
    <h2>背单词页面</h2>
    <card></card>
  </div>
</template>

<script>
  import card from './card'

  export default {
    name: "word",
    components: {
      "card": card
    }
  }
</script>

<style>
  #word{
    width: 100%;
    background-color: lavender;
    height: 100%;
  }
</style>
