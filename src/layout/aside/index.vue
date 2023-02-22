<!-- 模块说明 -->
<template>
  <div>
    <div class="top">
      <router-link to="/">
        <img
          src="https://img1.baidu.com/it/u=2447987319,2029283241&fm=253&app=138&size=w931&n=0&f=JPEG&fmt=auto?sec=1677085200&t=61967907691dd825ef63f40098ad3c92"
          alt=""
        />
        <span>疫情用户中心</span>
      </router-link>
    </div>
    <el-menu
      active-text-color="#ffd04b"
      background-color="#545c64"
      class="el-menu-vertical-demo"
      text-color="#fff"
      unique-opened
      :default-active="route.path"
      router
    >
      <el-sub-menu :index="item.path" v-for="item in list" :key="item.path">
        <template #title>
          <el-icon>
            <component :is="item.meta.icon"></component>
          </el-icon>
          <span>{{ item.meta.til }}</span>
        </template>

        <el-menu-item
          :index="getFullpath(item.path, ite.path)"
          v-for="ite in item.children"
          :key="ite.path"
        >
          {{ ite.meta.til }}
        </el-menu-item>
      </el-sub-menu>
    </el-menu>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted,shallowRef } from "vue";
import { routes } from "../../router";
import { useRoute } from "vue-router";
const route = useRoute();
const list = shallowRef<any>(routes.filter((item) => item.meta.isShow));
const getFullpath = (path1: any, path2: any) =>
  path1 == "/" ? path1 + path2 : path1 + "/" + path2;

// //info
// /banners/banners
</script>
<style lang="scss" scoped>
.top {
  padding: 20px;

  a {
    display: flex;
    align-items: center;
    color: #fff;
    font-size: 14px;
  }
  img {
    width: 40px;
    height: 40px;
    margin-right: 10px;
  }
}
</style>
