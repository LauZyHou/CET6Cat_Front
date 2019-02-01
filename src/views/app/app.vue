<template>
  <div>
    <router-view name="head"></router-view>
    <router-view name="content"></router-view>
    <router-view name="foot"></router-view>
  </div>
</template>

<script>
  export default {
    name: "app",
  }
</script>

<style scoped>

</style>
