<template>
  <div class="login">
    <el-form
      ref="ruleFormRef"
      :model="ruleForm"
      status-icon
      :rules="rules"
      label-width="90"
      class="demo-ruleForm"
    >
      <el-form-item label="用户名" prop="adminname">
        <el-input v-model="ruleForm.username" autocomplete="off" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          v-model="ruleForm.password"
          type="password"
          autocomplete="off"
        />
      </el-form-item>
      <el-form-item label="重复密码" prop="passwordl">
        <el-input
          v-model="ruleForm.passwordl"
          type="password"
          autocomplete="off"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm(ruleFormRef)"
          >注册</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
// el-form
// el-form-item 每一项
import { reactive, ref } from "vue";
import type { FormInstance } from "element-plus";
import { useUserStore } from "../../store/user";
import { useRouter } from "vue-router";
import axios from "axios";
const store = useUserStore();
const router = useRouter();
const ruleFormRef = ref<any>({});
const passflag = ref();

// 密码等验证函数
const validatePass = (rule: any, value: any, callback: any) => {
  let reg = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]+$/;
  //   if (value.length != 6) {
  //     // 报错
  //     return callback(new Error("密码必须是6位"));
  //   }
  if (!reg.test(value)) {
    return callback(new Error("必须同时包含字母和数字"));
  }
  passflag.value = value;
  return callback(); //callback() 正确里面没有参数  必须要有正确的
};
const validatePassl = (rule: any, value: any, callback: any) => {
  //   if (value.length != 6) {
  //     // 报错
  //     return callback(new Error("密码必须是6位"));
  //   }
  if (value !== passflag.value) {
    return callback(new Error("两次密码必须一致"));
  }
  return callback(); //callback() 正确里面没有参数  必须要有正确的
};

const validateAdmin = (rule: any, value: any, callback: any) => {
  if (value == "") {
    return callback(new Error("用户名不为空"));
  }
  return callback();
};

// 双向数据绑定属性
const ruleForm = ref({
  username: "",
  password: "",
  passwordl: "",
});

//验证规则
const rules = reactive({
  password: [{ validator: validatePass, trigger: "blur" }],
  adminname: [{ validator: validateAdmin, trigger: "blur" }],
  passwordl: [{ validator: validatePassl, trigger: "blur" }],
});

// 提交 方法
const submitForm = (formEl: FormInstance | undefined) => {
  ruleFormRef.value.validate((value: any) => {
    console.log(value, "验证结果");
    if (value) {
      axios({
        url: "http://192.168.20.25:3000/user",
        method: "get",
        params: {
          username: ruleForm.value.username,
          password: ruleForm.value.password,
        },
      }).then((res) => {
        if (res.data.length) {
          alert("用户名已被注册");
        } else {
          axios({
            url: "http://192.168.20.25:3000/user",
            method: "post",
            data: {
              username: ruleForm.value.username,
              password: ruleForm.value.password,
            },
          }).then((res) => {
            console.log(res);
            if (res.data) {
              alert("注册成功,登陆后请立刻到个人中心完善自己资料");
              router.push("/login");
            } else {
              alert("注册失败");
            }
          });
        }
      });
    } else {
      console.log("表单验证失败");
    }
  });
};
</script>

<style scoped lang="scss">
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  background: #e7e7e7;
  height: 100vh;
  .el-form {
    background: #fff;
    padding: 20px;
    width: 300px;
    border-radius: 10px;
    height: 200px;
  }
}
</style>
