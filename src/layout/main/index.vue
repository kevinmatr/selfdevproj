<!-- 模块说明 -->
<template>
  <div>
    <Top></Top>
    <Breadcrumb></Breadcrumb>
    <section>
      <router-view></router-view>
    </section>
  </div>
</template>

<script setup lang="ts"> 
import Top from "./Top.vue";
import Breadcrumb from "./Breadcrumb.vue";
</script>
<style lang="scss" scoped></style>
