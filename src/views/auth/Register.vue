<template>
  <div class="max-w-md w-full mx-auto p-6 bg-white rounded-lg shadow-md">
    <h2 class="text-2xl font-bold text-center mb-6">注册</h2>
    
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
      
      <el-form-item label="邮箱" prop="email">
        <el-input 
          v-model="form.email"
          :prefix-icon="Message"
          placeholder="请输入邮箱"
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
      
      <el-form-item label="确认密码" prop="confirmPassword">
        <el-input 
          v-model="form.confirmPassword"
          type="password"
          :prefix-icon="Lock"
          placeholder="请再次输入密码"
          show-password
        />
      </el-form-item>
      
      <div class="flex flex-col gap-4">
        <el-button type="primary" @click="handleSubmit" class="w-full">
          注册
        </el-button>
        
        <div class="text-center text-gray-600">
          已有账号？
          <router-link to="/auth/login" class="text-blue-600 hover:text-blue-800">
            立即登录
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
import { User, Lock, Message } from '@element-plus/icons-vue';
import type { FormInstance, FormRules } from 'element-plus';

const router = useRouter();
const formRef = ref<FormInstance>();

const form = reactive({
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
});

const validatePass = (rule: any, value: string, callback: any) => {
  if (value === '') {
    callback(new Error('请输入密码'));
  } else if (value.length < 6) {
    callback(new Error('密码长度不能少于6个字符'));
  } else {
    if (form.confirmPassword !== '') {
      if (formRef.value) {
        formRef.value.validateField('confirmPassword');
      }
    }
    callback();
  }
};

const validatePass2 = (rule: any, value: string, callback: any) => {
  if (value === '') {
    callback(new Error('请再次输入密码'));
  } else if (value !== form.password) {
    callback(new Error('两次输入密码不一致'));
  } else {
    callback();
  }
};

const rules: FormRules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 3, message: '用户名长度不能少于3个字符', trigger: 'blur' },
  ],
  email: [
    { required: true, message: '请输入邮箱', trigger: 'blur' },
    { type: 'email', message: '请输入正确的邮箱格式', trigger: 'blur' },
  ],
  password: [
    { validator: validatePass, trigger: 'blur' },
  ],
  confirmPassword: [
    { validator: validatePass2, trigger: 'blur' },
  ],
};

const handleSubmit = async () => {
  if (!formRef.value) return;
  
  await formRef.value.validate(async (valid) => {
    if (valid) {
      try {
        // 这里添加注册逻辑
        ElMessage.success('注册成功');
        router.push('/auth/login');
      } catch (error) {
        ElMessage.error('注册失败，请稍后重试');
      }
    }
  });
};
</script>