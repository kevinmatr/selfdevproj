<!-- 模块说明 -->
<template>
  <div class="box">
    <Aside class="aside"></Aside>
    <Main class="main"></Main>
  </div>
</template>

<script setup lang="ts">
import Aside from "./aside/index.vue";
import Main from "./main/index.vue";
</script>
<style lang="scss" scoped>
.box {
  display: flex;
  > div {
    height: 100vh;
    border: 1px solid red;
  }
  .aside {
    min-width: 220px;
    min-height: 100vh;
    background: rgb(92, 111, 107);
  }
  .main {
    flex: 1;
  }
}
</style>
