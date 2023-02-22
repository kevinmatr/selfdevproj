<template>
  <div class="wrapper">
    <el-button type="primary" @click="addform = true"> 完善信息 </el-button>
    <el-dialog v-model="addform" title="新增用户">
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
          <el-button @click="addform = false">取消</el-button>
          <el-button type="primary" @click="addu"> 提交 </el-button>
        </span>
      </template>
    </el-dialog>

    <el-descriptions class="margin-top" title="用户信息" :column="3" border>
      <template #extra="scope">
        <el-button type="primary" @click="handleEdit">修改信息</el-button>
      </template>
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            <el-icon>
              <user />
            </el-icon>
            用户名
          </div>
        </template>
        {{ userlist.name }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            <el-icon>
              <iphone />
            </el-icon>
            电话
          </div>
        </template>
        {{ userlist.tel }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            <el-icon>
              <ForkSpoon />
            </el-icon>
            性别
          </div>
        </template>
        {{ userlist.sex }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            <el-icon>
              <Sort />
            </el-icon>
            年龄
          </div>
        </template>
        {{ userlist.age }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            <el-icon>
              <Postcard />
            </el-icon>
            用户ID
          </div>
        </template>
        <el-tag size="small">{{ userlist.userid }}</el-tag>
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            <el-icon>
              <MagicStick />
            </el-icon>
            疫苗接种情况
          </div>
        </template>
        {{ userlist.vaccination }}
      </el-descriptions-item>
    </el-descriptions>
  </div>

  <el-dialog v-model="editform" title="编辑信息">
    <el-form v-model="currentuser">
      <el-form-item label="用户ID" :label-width="140">
        <el-input v-model="currentuser.userid" autocomplete="off" />
      </el-form-item>
      <el-form-item label="姓名" :label-width="140">
        <el-input v-model="currentuser.name" autocomplete="off" />
      </el-form-item>
      <el-form-item label="性别" :label-width="140">
        <el-input v-model="currentuser.sex" autocomplete="off" />
      </el-form-item>
      <el-form-item label="年龄" :label-width="140">
        <el-input v-model="currentuser.age" autocomplete="off" />
      </el-form-item>
      <el-form-item label="电话" :label-width="140">
        <el-input v-model="currentuser.tel" autocomplete="off" />
      </el-form-item>
      <el-form-item label="疫苗情况" :label-width="140">
        <el-input v-model="currentuser.vaccination" autocomplete="off" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="editform = false">取消</el-button>
        <el-button type="primary" @click="submitedit(currentuser.id)">
          提交
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { getuserlist, adduser, edituser, getuser } from "../../api/user";
import { ElMessage, ElMessageBox } from "element-plus";
import { useUserStore } from "../../store/user";
const { userid, username } = useUserStore();

// 检查
const checkid = () => {};

// 获取用户-------------------------
// 用户表
const userlist = ref([]);

// 获取用户信息
const getu = async () => {
  let res = await getuser(userid).catch(() => {
    addform.value = true;
    console.log("gggg");
    // addu();
  });
  userlist.value = res.data;
};

const open = () => {
  ElMessageBox.confirm("信息未完善，请立即完善个人信息", "Warning", {
    confirmButtonText: "立即完善",
    cancelButtonText: "稍后完善",
    type: "warning",
  })
    .then(() => {
      handleEdit();
    })
    .catch(() => {
      ElMessage({
        type: "info",
        message: "信息未完善",
      });
    });
};
// -------------------------

// 新增用户-------------------------
// 新增用户信息
const newuserlist = ref<any>({
  userid: userid,
  name: "",
  age: "",
  sex: "",
  tel: "",
  vaccination: "",
});

// 新增表打开
const addform = ref(false);

// 新增用户
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
    setTimeout(() => {
      getu();
    }, 1000);
  } else {
    ElMessage({
      showClose: true,
      message: "添加用户失败",
      type: "error",
    });
  }
};
// -------------------------

// 编辑用户信息-------------------------
const editform = ref(false);

interface CUser {
  id: number;
  userid: string;
  name: string;
  sex: string;
  age: string;
  tel: string;
  vaccination: string;
}
// 当前用户信息
const currentuser = ref<any>({
  userid: "",
  name: "",
  age: "",
  sex: "",
  tel: "",
  vaccination: "",
});
// 编辑框
const handleEdit = () => {
  currentuser.value = userlist.value;
  // console.log(currentuser.value, "val");
  editform.value = true;
  console.log();
};
// 提交编辑
const submitedit = async () => {
  let res = await edituser(currentuser.value.id, currentuser.value);
  console.log(res);
  if (res.status === 200) {
    ElMessage({
      showClose: true,
      message: "信息修改成功",
      type: "success",
    });
    newuserlist.value = {};
    editform.value = false;
    getu();
  } else {
    ElMessage({
      showClose: true,
      message: "添加用户失败",
      type: "error",
    });
  }
};
// -------------------------

onMounted(() => {
  getu();
});
</script>
<style scoped>
.wrapper {
  padding: 1px;
}
</style>
