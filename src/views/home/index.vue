<!-- 模块说明 -->
<template>
  <div class="box">
    <div class="top" v-if="flag">
      <p>欢迎{{ store.username }}</p>
      <el-button @click="logout">退出</el-button>
    </div>
    <div class="login" v-else>
      <router-link to="/login">去登录</router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useUserStore } from "../../store/user";
import { useRouter } from "vue-router";
const router = useRouter();
const store = useUserStore();
const flag = ref<boolean>(false);
const logout = () => {
  if (confirm("是否退出")) {
    store.$patch({
      userid: "",
      username: "",
    });
    router.push("/login");
  }
};
const serFlag = () => {
  if (store.userid) {
    flag.value = true;
  } else {
    flag.value = false;
  }
};
onMounted(() => {
  console.log(store.userid);

  serFlag();
});
</script>
<style lang="scss" scoped>
.box {
  .top {
    margin: 100px auto;
    width: 100%;
    font-size: 30px;
    font-weight: bolder;
    text-align: center;
  }
  .login {
    margin: 100px auto;
    width: 100%;
    font-size: 30px;
    font-weight: bolder;
    text-align: center;
  }
}
</style>
