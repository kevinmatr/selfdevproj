<template>
  <el-breadcrumb :separator-icon="ArrowRight">
     <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
     <el-breadcrumb-item v-for="item in route.matched" :key="item.path">{{ item.meta.til }}</el-breadcrumb-item>
   </el-breadcrumb>
 </template>
 
 <script setup lang="ts">
 import { useRoute } from 'vue-router';
 import {ArrowRight} from '@element-plus/icons-vue'
 const route=useRoute()
 </script>
 
 <style scoped lang='scss'>
 .el-breadcrumb{
    padding: 20px;
    border-bottom: 1px solid black;
    background-color:cornflowerblue;
    
 }
 </style>