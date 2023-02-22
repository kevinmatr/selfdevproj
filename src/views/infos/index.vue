<template>
  <div class="wrapper">
    <el-button text type="primary" @click="addform = true">
      添加新用户
    </el-button>
    <el-dialog v-model="addform" title="Shipping address">
      <el-form v-model="newuserlist">
        <el-form-item label="用户ID" :label-width="140">
          <el-input v-model="newuserlist.userid" autocomplete="off" />
        </el-form-item>
        <el-form-item label="姓名" :label-width="140">
          <el-input v-model="newuserlist.name" autocomplete="off" />
        </el-form-item>
        <el-form-item label="性别" :label-width="140">
          <el-input v-model="newuserlist.sex" autocomplete="off" />
        </el-form-item>
        <el-form-item label="年龄" :label-width="140">
          <el-input v-model="newuserlist.age" autocomplete="off" />
        </el-form-item>
        <el-form-item label="电话" :label-width="140">
          <el-input v-model="newuserlist.tel" autocomplete="off" />
        </el-form-item>
        <el-form-item label="疫苗情况" :label-width="140">
          <el-input v-model="newuserlist.vaccination" autocomplete="off" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="addform = false">Cancel</el-button>
          <el-button type="primary" @click="addu"> Confirm </el-button>
        </span>
      </template>
    </el-dialog>

    <el-table :data="userlist" style="width: 100%">
      <el-table-column align="center" label="编号" width="140">
        <template #default="scope">
          <span>{{ scope.row.userid }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="姓名" width="180">
        <template #default="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="性别" width="180">
        <template #default="scope">
          <span>{{ scope.row.sex }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="年龄" width="180">
        <template #default="scope">
          <span>{{ scope.row.age }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="电话" width="180">
        <template #default="scope">
          <span>{{ scope.row.tel }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="疫苗接种情况" width="180">
        <template #default="scope">
          <span>{{ scope.row.vaccination }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作">
        <template #default="scope">
          <el-button size="small">编辑</el-button>
          <el-button size="small" type="danger">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { getuserlist, adduser } from "../../api/user";
import { ElMessage } from "element-plus";

const userlist = ref([]);

const getuser = async () => {
  let res = await getuserlist();
  console.log(res, "data");
  userlist.value = res.data;
};

const newuserlist = ref<any>({
  userid: "",
  name: "",
  age: "",
  sex: "",
  tel: "",
  vaccination: "",
});

const addform = ref(false);

const addu = async () => {
  let res = await adduser(newuserlist.value);
  console.log(res, "nw");
  if (res.status === 201) {
    ElMessage({
      showClose: true,
      message: "用户已添加",
      type: "success",
    });
    newuserlist.value = {};
    addform.value = false;
    getuser();
  } else {
    ElMessage({
      showClose: true,
      message: "添加用户失败",
      type: "error",
    });
  }
};

onMounted(() => {
  getuser();
});
</script>
<style scoped>
.wrapper {
  padding: 1px;
}
</style>
