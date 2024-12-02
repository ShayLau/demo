<template>
  <div class="max-w-md w-full mx-auto p-6 bg-white rounded-lg shadow-md">
    <h2 class="text-2xl font-bold text-center mb-6">登录</h2>
    
    <el-form
      ref="formRef"
      :model="form"
      :rules="rules"
      label-position="top"
    >
      <el-form-item label="用户名" prop="username">
        <el-input 
          v-model="form.username"
          :prefix-icon="User"
          placeholder="请输入用户名"
        />
      </el-form-item>
      
      <el-form-item label="密码" prop="password">
        <el-input 
          v-model="form.password"
          type="password"
          :prefix-icon="Lock"
          placeholder="请输入密码"
          show-password
        />
      </el-form-item>
      
      <el-form-item>
        <el-checkbox v-model="form.remember">记住我</el-checkbox>
      </el-form-item>
      
      <div class="flex flex-col gap-4">
        <el-button type="primary" @click="handleSubmit" class="w-full">
          登录
        </el-button>
        
        <div class="text-center text-gray-600">
          还没有账号？
          <router-link to="/auth/register" class="text-blue-600 hover:text-blue-800">
            立即注册
          </router-link>
        </div>
      </div>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';
import { User, Lock } from '@element-plus/icons-vue';
import { useAuthStore } from '../../stores/auth';
import type { FormInstance, FormRules } from 'element-plus';

const router = useRouter();
const authStore = useAuthStore();
const formRef = ref<FormInstance>();

const form = reactive({
  username: '',
  password: '',
  remember: false,
});

const rules: FormRules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, message: '密码长度不能少于6个字符', trigger: 'blur' },
  ],
};

const handleSubmit = async () => {
  if (!formRef.value) return;
  
  await formRef.value.validate(async (valid) => {
    if (valid) {
      try {
        await authStore.login(form.username, form.password);
        ElMessage.success('登录成功');
        router.push('/');
      } catch (error) {
        ElMessage.error('登录失败，请检查用户名和密码');
      }
    }
  });
};
</script>